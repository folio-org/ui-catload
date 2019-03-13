import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  forEach,
  isEmpty,
  reduce,
  map,
  omit,
  some,
} from 'lodash';

import {
  withStripes,
  stripesShape,
} from '@folio/stripes/core';
import {
  Layout,
  Callout,
  ConfirmationModal,
} from '@folio/stripes/components';

import { EndOfItem } from '../EndOfItem';
import { Preloader } from '../Preloader';
import { UploadingJobsContext } from '../UploadingJobsContextProvider';
import { FileItem } from './components';
import {
  createUrl,
  createOkapiHeaders,
  xhrAddHeaders,
} from '../../utils';
import {
  DEFAULT_TIMEOUT_BEFORE_FILE_DELETION,
  FILE_STATUSES,
} from '../../utils/constants';
import * as API from './utils/upload';

@withRouter
@withStripes
export class UploadingJobsDisplay extends Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    history: PropTypes.shape({
      block: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        files: PropTypes.array,
      }),
    }).isRequired,
    timeoutBeforeFileDeletion: PropTypes.number, // milliseconds
  };

  static defaultProps = { timeoutBeforeFileDeletion: DEFAULT_TIMEOUT_BEFORE_FILE_DELETION };

  static contextType = UploadingJobsContext;

  static knownErrorsIDs = ['upload.fileSize.invalid'];

  static getUploadFilesErrorMessageID(msg) {
    const defaultErrorId = 'upload.invalid';

    return UploadingJobsDisplay.knownErrorsIDs.includes(msg) ? msg : defaultErrorId;
  }

  constructor(props, context) {
    super(props, context);

    const { stripes: { okapi } } = this.props;

    const { url: host } = okapi;

    this.uploadDefinitionUrl = createUrl(`${host}/data-import/uploadDefinitions`);
    this.deleteFileTimeouts = {};
    this.fileRemovalMap = {
      [FILE_STATUSES.UPLOADED]: this.handleDeleteSuccessfullyUploadedFile,
      [FILE_STATUSES.ERROR]: this.deleteFileAPI,
      [FILE_STATUSES.ERROR_DEFINITION]: this.deleteFileFromState,
    };

    this.state = {
      hasLoaded: false,
      renderLeaveModal: false,
    };
  }

  async componentDidMount() {
    this.mounted = true;

    this.mapFilesToState();
    this.uploadJobs();
    this.setPageLeaveHandler();
  }

  componentWillUnmount() {
    this.mounted = false;

    this.cancelFileRemovals();
    this.resetPageLeaveHandler();
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  mapFilesToState() {
    const {
      history,
      location: { state = {} },
    } = this.props;

    const { files } = state;

    // in snapshot mode component renders files from upload definition if any
    // otherwise component renders files that are going to be uploaded
    this.isSnapshotMode = isEmpty(files);

    this.setState({ files: this.prepareFiles(files) });

    // clear history state to prevent incorrect determination of snapshot mode
    history.replace({ state: {} });
  }

  // prevent from leaving the page in case if uploading is in progress
  setPageLeaveHandler() {
    const { history } = this.props;

    this.unblockNavigation = history.block(this.handleNavigation);
    window.addEventListener('beforeunload', this.handlePageLeave);
  }

  resetPageLeaveHandler() {
    this.unblockNavigation();
    window.removeEventListener('beforeunload', this.handlePageLeave);
  }

  handlePageLeave = event => {
    const shouldPrompt = this.filesUploading;

    if (shouldPrompt) {
      event.returnValue = true;

      return true;
    }

    return null;
  };

  handleNavigation = nextLocation => {
    const shouldPrompt = this.filesUploading;

    if (shouldPrompt) {
      this.setState({
        renderLeaveModal: true,
        nextLocation,
      });
    }

    return !shouldPrompt;
  };

  get filesUploading() {
    const { files } = this.state;

    return !this.isSnapshotMode && some(files, file => file.status === FILE_STATUSES.UPLOADING);
  }

  cancelFileRemovals() {
    forEach(this.deleteFileTimeouts, clearTimeout);
    this.deleteFileTimeouts = {};
  }

  renderSnapshotData() {
    const { uploadDefinition: { fileDefinitions } } = this.context;

    const files = this.prepareFiles(fileDefinitions);

    this.setState({ files });
  }

  async fetchUploadDefinition() {
    try {
      const { updateUploadDefinition } = this.context;

      await updateUploadDefinition();

      this.setState({ hasLoaded: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async uploadJobs() {
    try {
      await this.fetchUploadDefinition();

      if (this.isSnapshotMode) {
        this.renderSnapshotData();

        return;
      }

      const { files } = this.state;

      // post file upload definition with all files metadata as
      // individual file upload should have upload definition id in the URL
      const [errMsg, response] = await API.createUploadDefinition(
        files,
        this.uploadDefinitionUrl,
        this.createFilesDefinitionHeaders(),
      );

      if (errMsg) {
        this.handleAllFilesUploadFail(errMsg);

        return;
      }

      await this.updateFilesWithFileDefinitionMetadata(response.fileDefinitions);

      this.uploadFiles();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  updateFilesWithFileDefinitionMetadata(fileDefinitions) {
    return this.setStateAsync(state => {
      const updatedFiles = { ...state.files };

      forEach(fileDefinitions, definition => {
        const {
          uiKey,
          id,
          uploadDefinitionId,
        } = definition;

        updatedFiles[uiKey] = {
          ...updatedFiles[uiKey],
          id,
          uploadDefinitionId,
        };
      });

      return { files: updatedFiles };
    });
  }

  cancelCurrentFileUpload() {
    if (this.currentFileUploadXhr) {
      this.currentFileUploadXhr.abort();
    }
  }

  async uploadFiles() {
    const { files } = this.state;

    for (const fileKey of Object.keys(files)) {
      try {
        // cancel current and next file uploads if component is unmounted
        /* istanbul ignore if  */
        if (!this.mounted) {
          this.cancelCurrentFileUpload();
          break;
        }

        // eslint-disable-next-line no-await-in-loop
        const response = await this.uploadFile(fileKey);

        this.handleFileUploadSuccess(response, fileKey);
      } catch (error) {
        this.handleFileUploadFail(fileKey);
      }
    }

    this.currentFileUploadXhr = null;
  }

  uploadFile(fileKey) {
    return new Promise(async (resolve, reject) => {
      try {
        const { files: { [fileKey]: fileMeta } } = this.state;

        const url = this.createFileUrl(fileMeta);

        this.currentFileUploadXhr = new XMLHttpRequest();

        this.currentFileUploadXhr.open('POST', url);

        xhrAddHeaders(this.currentFileUploadXhr, this.createUploadFilesHeaders());

        this.currentFileUploadXhr.upload.onprogress = event => {
          this.onFileUploadProgress(fileKey, event);
        };

        this.currentFileUploadXhr.onreadystatechange = () => {
          const {
            status,
            readyState,
            responseText,
          } = this.currentFileUploadXhr;

          if (readyState !== 4) {
            return;
          }

          try {
            const parsedResponse = JSON.parse(responseText);

            if (status === 200) {
              resolve(parsedResponse);
            } else {
              reject(parsedResponse);
            }
          } catch (error) {
            reject(error);
          }
        };

        this.currentFileUploadXhr.send(fileMeta.file);
      } catch (error) {
        reject(error);
      }
    });
  }

  createFilesDefinitionHeaders() {
    const { stripes: { okapi } } = this.props;

    return {
      ...createOkapiHeaders(okapi),
      'Content-Type': 'application/json',
    };
  }

  createUploadFilesHeaders() {
    const { stripes: { okapi } } = this.props;

    return {
      ...createOkapiHeaders(okapi),
      'Content-Type': 'application/octet-stream',
    };
  }

  prepareFiles(files = []) {
    return files.reduce((res, file) => {
      // `uiKey` is needed in order to match the individual file on UI with
      // the response from the backend since it returns the all files state
      const uiKey = `${file.name}${file.lastModified}`;
      // if file is already uploaded it has already the `uiKey` and if not it should be assigned
      const key = file.uiKey || uiKey;
      const status = file.status || FILE_STATUSES.UPLOADING;

      const preparedFile = {
        id: file.id,
        uploadDefinitionId: file.uploadDefinitionId,
        key,
        name: file.name,
        size: file.size,
        loading: false,
        uploadedDate: file.uploadedDate,
        status,
        uploadedValue: 0,
        file,
      };

      return {
        ...res,
        [key]: preparedFile,
      };
    }, {});
  }

  updateFileState(fileKey, data) {
    this.setState(state => {
      const updatedFile = {
        ...state.files[fileKey],
        ...data,
      };

      return {
        files: {
          ...state.files,
          [fileKey]: updatedFile,
        },
      };
    });
  }

  onFileUploadProgress = (fileKey, { loaded: uploadedValue }) => {
    this.updateFileState(fileKey, { uploadedValue });
  };

  handleFileUploadSuccess = (response, fileKey) => {
    const { uploadedDate } = response.fileDefinitions.find(file => file.uiKey === fileKey);

    this.updateFileState(fileKey, {
      status: FILE_STATUSES.UPLOADED,
      uploadedDate,
    });
  };

  handleFileUploadFail = fileKey => {
    this.updateFileState(fileKey, { status: FILE_STATUSES.ERROR });
  };

  handleUndoDeleteFile = fileKey => {
    clearTimeout(this.deleteFileTimeouts[fileKey]);

    this.updateFileState(fileKey, { status: FILE_STATUSES.UPLOADED });
  };

  handleDeleteFile = (fileKey, fileStatus) => {
    const deleteFile = this.fileRemovalMap[fileStatus];

    if (deleteFile) {
      deleteFile(fileKey, fileStatus);
    }
  };

  deleteFileAPI = async (fileKey, fileStatus) => {
    const { files: { [fileKey]: fileMeta } } = this.state;

    this.updateFileState(fileKey, { loading: true });

    try {
      await API.deleteFile(
        this.createFileUrl(fileMeta),
        this.createDeleteFileHeaders(),
      );

      this.deleteFileFromState(fileKey);
    } catch (error) {
      this.updateFileState(fileKey, {
        status: fileStatus,
        loading: false,
      });

      const errorMessage = (
        <FormattedMessage
          id="ui-data-import.fileDeleteError"
          values={{ name: <strong>{fileMeta.name}</strong> }}
        />
      );

      this.callout.sendCallout({
        type: 'error',
        message: errorMessage,
      });

      console.error(error); // eslint-disable-line no-console
    }
  };

  createFileUrl = file => {
    const { stripes: { okapi } } = this.props;

    const { url: host } = okapi;

    return createUrl(`${host}/data-import/uploadDefinitions/${file.uploadDefinitionId}/files/${file.id}`);
  };

  createDeleteFileHeaders() {
    const { stripes: { okapi } } = this.props;

    return createOkapiHeaders(okapi);
  }

  deleteFileFromState = fileKey => {
    this.setState(state => {
      const updatedFiles = omit(state.files, fileKey);

      return { files: updatedFiles };
    });
  };

  handleDeleteSuccessfullyUploadedFile = (fileKey, fileStatus) => {
    const { timeoutBeforeFileDeletion } = this.props;

    this.deleteFileTimeouts[fileKey] = setTimeout(() => {
      this.deleteFileAPI(fileKey, fileStatus);
    }, timeoutBeforeFileDeletion);

    this.updateFileState(fileKey, { status: FILE_STATUSES.DELETING });
  };

  handleAllFilesUploadFail(errMsg) {
    const errorMsgTranslationID = UploadingJobsDisplay.getUploadFilesErrorMessageID(errMsg);

    this.setState(state => {
      const files = reduce(state.files, (result, file, fileKey) => ({
        ...result,
        [fileKey]: {
          ...file,
          status: FILE_STATUSES.ERROR_DEFINITION,
          errorMsgTranslationID,
        },
      }), {});

      return { files };
    });
  }

  renderFiles() {
    const { files } = this.state;

    if (isEmpty(files)) {
      return (
        <Layout
          data-test-empty-msg
          className="textCentered"
        >
          <FormattedMessage id="ui-data-import.noUploadedFiles" />
        </Layout>
      );
    }

    return map(files, (file, fileKey) => {
      const {
        status,
        name,
        size,
        uploadedValue,
        uploadedDate,
        loading,
        errorMsgTranslationID,
      } = file;

      return (
        <FileItem
          isSnapshotMode={this.isSnapshotMode}
          key={fileKey}
          uiKey={fileKey}
          status={status}
          name={name}
          size={size}
          loading={loading}
          uploadedValue={uploadedValue}
          errorMsgTranslationID={errorMsgTranslationID}
          uploadedDate={uploadedDate}
          onDelete={this.handleDeleteFile}
          onUndoDelete={this.handleUndoDeleteFile}
        />
      );
    });
  }

  continue = () => {
    const { history } = this.props;
    const { nextLocation } = this.state;

    this.unblockNavigation();
    history.push(nextLocation.pathname);
  };

  closeModal = () => {
    this.setState({ renderLeaveModal: false });
  };

  createCalloutRef = ref => { this.callout = ref; };

  render() {
    const {
      hasLoaded,
      renderLeaveModal,
    } = this.state;

    if (!hasLoaded) {
      return <Preloader />;
    }

    const leavePageMessage = (
      <FormattedMessage
        id="ui-data-import.modal.leavePage.message"
        values={{
          highlightedText: (
            <strong>
              <FormattedMessage id="ui-data-import.modal.leavePage.messageHighlightedText" />
            </strong>
          ),
        }}
      />
    );

    return (
      <div data-test-uploading-jobs-display>
        {this.renderFiles()}
        <EndOfItem />
        <Callout ref={this.createCalloutRef} />
        <ConfirmationModal
          id="leave-page-modal"
          open={renderLeaveModal}
          heading={<FormattedMessage id="ui-data-import.modal.leavePage.header" />}
          message={leavePageMessage}
          confirmLabel={<FormattedMessage id="ui-data-import.modal.leavePage.actionButton" />}
          cancelLabel={<FormattedMessage id="ui-data-import.modal.leavePage.cancel" />}
          onConfirm={this.closeModal}
          onCancel={this.continue}
        />
      </div>
    );
  }
}
