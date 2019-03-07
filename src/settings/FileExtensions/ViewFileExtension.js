import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { FormattedMessage } from 'react-intl';
import { omit } from 'lodash';

import {
  Pane,
  Headline,
  Row,
  Col,
  KeyValue,
  Icon,
  Button,
  PaneMenu,
  Layer,
} from '@folio/stripes/components';
import {
  TitleManager,
  stripesShape,
} from '@folio/stripes/core';
import { ViewMetaData } from '@folio/stripes/smart-components';

import { Preloader } from '../../components/Preloader';
import { EndOfItem } from '../../components/EndOfItem';
import { FileExtensionForm } from '../../components/FileExtensionForm';

import css from './FileExtensions.css';

export class ViewFileExtension extends Component {
  static manifest = Object.freeze({
    fileExtension: {
      type: 'okapi',
      path: 'data-import/fileExtensions/:{id}',
      throwErrors: false,
    },
  });

  static propTypes = {
    stripes: stripesShape.isRequired,
    resources: PropTypes.shape({
      fileExtension: PropTypes.shape({
        hasLoaded: PropTypes.bool.isRequired,
        records: PropTypes.arrayOf(
          PropTypes.shape({
            extension: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            importBlocked: PropTypes.bool.isRequired,
            dataTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
            metadata: PropTypes.shape({
              createdByUserId: PropTypes.string.isRequired,
              updatedByUserId: PropTypes.string.isRequired,
            }).isRequired,
          }),
        ),
      }),
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    editLink: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onEditSuccess: PropTypes.func.isRequired,
    onOpenEdit: PropTypes.func.isRequired,
    onCloseEdit: PropTypes.func.isRequired,
    editContainer: PropTypes.instanceOf(Element),
  };

  constructor(props) {
    super(props);

    const { stripes } = this.props;

    this.connectedViewMetaData = stripes.connect(ViewMetaData);
  }

  get fileExtensionData() {
    const {
      resources,
      match: { params },
    } = this.props;

    const fileExtension = resources.fileExtension || {};
    const records = fileExtension.records || [];

    return {
      hasLoaded: fileExtension.hasLoaded,
      record: records.find(record => record.id === params.id),
    };
  }

  renderSpinner() {
    const { onClose } = this.props;

    return (
      <Pane
        id="pane-file-extension-details"
        defaultWidth="fill"
        fluidContentWidth
        paneTitle=""
        dismissible
        onClose={onClose}
      >
        <Preloader />
      </Pane>
    );
  }

  renderDetailMenu(record) {
    const {
      onOpenEdit,
      editLink,
    } = this.props;

    return (
      <PaneMenu>
        <Button
          data-test-edit-file-extension-menu-button
          href={editLink}
          style={{ visibility: !record ? 'hidden' : 'visible' }}
          buttonStyle="primary paneHeaderNewButton"
          marginBottom0
          onClick={onOpenEdit}
        >
          <FormattedMessage id="ui-data-import.edit" />
        </Button>
      </PaneMenu>
    );
  }

  renderActionMenu = menu => {
    return (
      <Button
        data-test-edit-file-extension-button
        buttonStyle="dropdownItem"
        onClick={() => this.handleOpenEdit(menu)}
      >
        <Icon icon="edit">
          <FormattedMessage id="ui-data-import.edit" />
        </Icon>
      </Button>
    );
  };

  handleOpenEdit = menu => {
    const { onOpenEdit } = this.props;

    onOpenEdit();
    menu.onToggle();
  };

  renderFileExtension(record) {
    const { onClose } = this.props;

    return (
      <Pane
        id="pane-file-extension-details"
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={record.extension}
        paneSub={<FormattedMessage id="ui-data-import.settings.fileExtension.title" />}
        actionMenu={this.renderActionMenu}
        lastMenu={this.renderDetailMenu(record)}
        dismissible
        onClose={onClose}
      >
        <TitleManager record={record.extension} />
        <Headline
          data-test-headline
          size="xx-large"
          tag="h2"
        >
          {record.extension}
        </Headline>

        <Row>
          <Col xs={12}>
            <this.connectedViewMetaData
              key={`${record.metadata.createdByUserId}${record.metadata.updatedByUserId}`}
              metadata={record.metadata}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <KeyValue label={<FormattedMessage id="ui-data-import.description" />}>
              <div data-test-description>{record.description || '-'}</div>
            </KeyValue>
          </Col>
        </Row>

        <Row>
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-data-import.settings.fileExtension.title" />}>
              <div data-test-extension>{record.extension}</div>
            </KeyValue>
          </Col>
          {record.importBlocked && (
            <Col xs={4}>
              <label htmlFor="import-blocked">
                <input
                  id="import-blocked"
                  className={css.checkbox}
                  data-test-import-blocked
                  type="checkbox"
                  checked
                  disabled
                />
                &nbsp;<FormattedMessage id="ui-data-import.settings.fileExtension.blockImport" />
              </label>
            </Col>
          )}
          {!record.importBlocked && (
            <Col xs={4}>
              <KeyValue label={<FormattedMessage id="ui-data-import.settings.fileExtension.dataTypes" />}>
                <div data-test-data-types>{record.dataTypes.join(', ')}</div>
              </KeyValue>
            </Col>
          )}
        </Row>
        <EndOfItem
          className={css.endOfRecord}
          title={<FormattedMessage id="ui-data-import.endOfRecord" />}
        />
      </Pane>
    );
  }

  renderLayer(record) {
    const {
      editContainer,
      onCloseEdit,
      onEdit,
      onEditSuccess,
    } = this.props;

    const isEditLayer = this.isLayerOpen('edit');

    if (isEditLayer) {
      return (
        <Layer
          isOpen={isEditLayer}
          container={editContainer}
        >
          <FileExtensionForm
            id="edit-file-extension-form"
            initialValues={this.getFormData(record)}
            onSubmit={onEdit}
            onSubmitSuccess={onEditSuccess}
            onCancel={onCloseEdit}
          />
        </Layer>
      );
    }

    return null;
  }

  getFormData(record) {
    return omit(record, 'userInfo', 'metadata');
  }

  isLayerOpen = value => {
    const { location: { search } } = this.props;

    const query = queryString.parse(search || '');

    return query.layer === value;
  };

  render() {
    const {
      hasLoaded,
      record,
    } = this.fileExtensionData;

    if (!record || !hasLoaded) {
      return this.renderSpinner();
    }

    return this.renderLayer(record) || this.renderFileExtension(record);
  }
}
