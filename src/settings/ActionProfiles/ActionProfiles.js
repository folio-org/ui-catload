import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  get,
  omit,
} from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { makeQueryFunction } from '@folio/stripes/smart-components';

import {
  withCheckboxList,
  checkboxListShape,
} from '../../utils';
import { ENTITY_KEYS } from '../../utils/constants';
import { ListView } from '../../components';
import { CheckboxHeader } from '../../components/ListTemplate/HeaderTemplates';
import { ViewActionProfile } from './ViewActionProfile';
import { ActionProfilesForm } from './ActionProfilesForm';

// big numbers to get rid of infinite scroll
const INITIAL_RESULT_COUNT = 5000;
const RESULT_COUNT_INCREMENT = 5000;
const queryTemplate = `(
  name="%{query.query}*" OR
  action="%{query.query}*" OR
  folioRecord="%{query.query}*" OR
  mapping="%{query.query}*" OR
  tags.tagList="%{query.query}*"
)`;

export const actionProfilesShape = {
  INITIAL_RESULT_COUNT,
  RESULT_COUNT_INCREMENT,
  manifest: {
    initializedFilterConfig: { initialValue: false },
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      perRequest: RESULT_COUNT_INCREMENT,
      records: ENTITY_KEYS.ACTION_PROFILES,
      recordsRequired: '%{resultCount}',
      path: 'data-import-profiles/actionProfiles',
      clientGeneratePk: false,
      throwErrors: true,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            queryTemplate,
            {
              name: 'name',
              action: 'action folioRecord',
              mapping: 'mapping',
              tags: 'tags.tagList',
              updated: 'metadata.updatedDate',
              updatedBy: 'userInfo.firstName userInfo.lastName userInfo.userName',
            },
            [],
          ),
        },
        staticFallback: { params: {} },
      },
    },
  },
  visibleColumns: [
    'name',
    'action',
    'mapping',
    'tags',
    'updated',
    'updatedBy',
  ],
  columnWidths: {
    isChecked: '35px',
    name: '300px',
    action: '200px',
    tags: '150px',
    updated: '100px',
    updatedBy: '250px',
  },

  renderHeaders: props => {
    let headers = {
      name: <FormattedMessage id="ui-data-import.name" />,
      action: <FormattedMessage id="ui-data-import.action" />,
      mapping: <FormattedMessage id="ui-data-import.mapping" />,
      tags: <FormattedMessage id="ui-data-import.tags" />,
      updated: <FormattedMessage id="ui-data-import.updated" />,
      updatedBy: <FormattedMessage id="ui-data-import.updatedBy" />,
    };

    if (props && props.unlink) {
      headers = {
        unlink: <FormattedMessage id="ui-data-import.unlink" />,
        ...headers,
      };
    }

    if (props && props.checkboxList) {
      const {
        checkboxList: {
          isAllSelected,
          handleSelectAllCheckbox,
        },
      } = props;

      headers = {
        ...headers,
        selected: (
          <CheckboxHeader
            checked={isAllSelected}
            onChange={handleSelectAllCheckbox}
          />
        ),
      };
    }

    return headers;
  },
};

const mapStateToProps = state => {
  const {
    hasLoaded = false,
    records: [record = {}] = [],
  } = get(state, 'folio_data_import_action_profile', {});
  const selectedRecord = {
    hasLoaded,
    record: omit(record, 'metadata', 'userInfo'),
  };

  return { selectedRecord };
};

@withCheckboxList
@stripesConnect
@connect(mapStateToProps)
export class ActionProfiles extends Component {
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    actionProfiles: {
      type: 'okapi',
      perRequest: RESULT_COUNT_INCREMENT,
      records: 'actionProfiles',
      recordsRequired: '%{resultCount}',
      path: 'data-import-profiles/actionProfiles',
      clientGeneratePk: false,
      throwErrors: false,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            queryTemplate,
            {
              name: 'name',
              action: 'action folioRecord',
              mapping: 'mapping',
              tags: 'tags.tagList',
              updated: 'metadata.updatedDate',
              updatedBy: 'userInfo.firstName userInfo.lastName userInfo.userName',
            },
            [],
          ),
        },
        staticFallback: { params: {} },
      },
    },
  });

  static propTypes = {
    resources: PropTypes.object.isRequired,
    mutator: PropTypes.shape({
      actionProfiles: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    location: PropTypes.oneOfType([
      PropTypes.shape({
        search: PropTypes.string.isRequired,
        pathname: PropTypes.string.isRequired,
      }).isRequired,
      PropTypes.string.isRequired,
    ]),
    match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    label: PropTypes.node.isRequired,
    selectedRecord: PropTypes.object.isRequired,
    checkboxList: checkboxListShape.isRequired,
    setList: PropTypes.func.isRequired,
    showSingleResult: PropTypes.bool,
    objectName: PropTypes.string,
    ENTITY_KEY: PropTypes.string,
    RecordView: PropTypes.func,
    RecordForm: PropTypes.func,
    INITIAL_RESULT_COUNT: PropTypes.number,
    RESULT_COUNT_INCREMENT: PropTypes.number,
    actionMenuItems: PropTypes.arrayOf(PropTypes.string),
    visibleColumns: PropTypes.arrayOf(PropTypes.string),
    columnWidths: PropTypes.object,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    showSingleResult: true,
    objectName: 'action-profiles',
    ENTITY_KEY: ENTITY_KEYS.ACTION_PROFILES,
    INITIAL_RESULT_COUNT,
    RESULT_COUNT_INCREMENT,
    actionMenuItems: [
      'addNew',
      'exportSelected',
      'selectAll',
      'deselectAll',
    ],
    visibleColumns: ['selected', ...actionProfilesShape.visibleColumns],
    columnWidths: { selected: '40px' },
    initialValues: {
      name: '',
      description: '',
    },
    RecordView: ViewActionProfile,
    RecordForm: ActionProfilesForm,
  };

  renderHeaders = () => actionProfilesShape.renderHeaders(this.props);

  render() {
    const resultedProps = {
      ...this.props,
      renderHeaders: this.renderHeaders,
    };

    return <ListView {...resultedProps} />;
  }
}
