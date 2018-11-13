import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape,
} from 'react-intl';

import FileUpload from './components/FileUpload';

import css from './components/FileUpload/FileUpload.css';

class ImportJobs extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  state = {
    isDropZoneActive: false,
  };

  onDragEnter = () => {
    this.setState({
      isDropZoneActive: true,
    });
  };

  onDragLeave = () => {
    this.setState({
      isDropZoneActive: false,
    });
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    const {
      history,
      match,
    } = this.props;

    this.setState({
      isDropZoneActive: false,
    });

    history.push(`${match.url}/job-profile`, { acceptedFiles });
  };

  getMessageById = (idEnding, moduleName = 'ui-data-import') => {
    const id = `${moduleName}.${idEnding}`;

    return this.props.intl.formatMessage({ id });
  };

  render() {
    const titleMessageIdEnding = this.state.isDropZoneActive ? 'activeUploadTitle' : 'uploadTitle';
    const titleText = this.getMessageById(titleMessageIdEnding);
    const uploadBtnText = this.getMessageById('uploadBtnText');

    return (
      <FileUpload
        title={titleText}
        uploadBtnText={uploadBtnText}
        isDropZoneActive={this.state.isDropZoneActive}
        className={css.upload}
        activeClassName={css.activeUpload}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      />
    );
  }
}

export default withRouter(injectIntl(ImportJobs));
