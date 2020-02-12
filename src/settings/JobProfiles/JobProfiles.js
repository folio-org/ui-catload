import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
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
import { ListView } from '../../components/ListView';
import { CheckboxHeader } from '../../components/ListTemplate/HeaderTemplates';

import { ViewJobProfile } from './ViewJobProfile';
import { JobProfilesForm } from './JobProfilesForm';

// big numbers to get rid of infinite scroll
const INITIAL_RESULT_COUNT = 5000;
const RESULT_COUNT_INCREMENT = 5000;

export const jobProfilesShape = {
  INITIAL_RESULT_COUNT,
  RESULT_COUNT_INCREMENT,
  manifest: {
    initializedFilterConfig: { initialValue: false },
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      perRequest: RESULT_COUNT_INCREMENT,
      records: ENTITY_KEYS.JOB_PROFILES,
      recordsRequired: '%{resultCount}',
      path: 'data-import-profiles/jobProfiles',
      clientGeneratePk: false,
      throwErrors: true,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(name="%{query.query}*" OR tags.tagList="%{query.query}*")',
            {
              name: 'name',
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
    'description',
    'tags',
    'updated',
    'updatedBy',
  ],
  columnWidths: {
    isChecked: '35px',
    name: '300px',
    tags: '150px',
    updated: '100px',
    updatedBy: '250px',
  },
  renderHeaders: props => {
    let headers = {
      name: <FormattedMessage id="ui-data-import.name" />,
      description: <FormattedMessage id="ui-data-import.description" />,
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

// TODO: this code could possibly be rewritten when https://issues.folio.org/browse/STCON-86 is done
export const createJobProfiles = (chooseJobProfile = false, dataTypeQuery = '') => {
  const findAll = (chooseJobProfile && dataTypeQuery !== '')
    ? `dataType==${dataTypeQuery}`
    : 'cql.allRecords=1';
  const queryTemplate = chooseJobProfile
    ? `dataType==${dataTypeQuery === '' ? '*' : dataTypeQuery} AND (name="%{query.query}*" OR tags.tagList="%{query.query}*" OR description="%{query.query}*")`
    : '(name="%{query.query}*" OR tags.tagList="%{query.query}*")';

  const sortMap = {
    name: 'name',
    tags: 'tags.tagList',
    updated: 'metadata.updatedDate',
    updatedBy: 'userInfo.firstName userInfo.lastName userInfo.userName',
  };
  const visibleColumns = chooseJobProfile
    ? jobProfilesShape.visibleColumns : [
      'selected',
      'name',
      'tags',
      'updated',
      'updatedBy',
    ];
  const columnWidths = { selected: '40px' };

  if (chooseJobProfile) {
    sortMap.description = 'description';
  }

  const mapStateToProps = state => {
    const {
      hasLoaded = false,
      records: [record = {}] = [],
    } = get(state, 'folio_data_import_job_profile', {});
    const selectedRecord = {
      hasLoaded,
      record: omit(record, 'metadata', 'userInfo'),
    };

    return { selectedRecord };
  };

  @withCheckboxList
  @connect(mapStateToProps)
  @stripesConnect
  @withRouter
  class JobProfiles extends Component {
    static manifest = Object.freeze({
      initializedFilterConfig: { initialValue: false },
      query: { initialValue: {} },
      resultCount: { initialValue: INITIAL_RESULT_COUNT },
      jobProfiles: {
        type: 'okapi',
        perRequest: RESULT_COUNT_INCREMENT,
        records: ENTITY_KEYS.JOB_PROFILES,
        recordsRequired: '%{resultCount}',
        path: 'data-import-profiles/jobProfiles',
        clientGeneratePk: false,
        throwErrors: false,
        GET: {
          params: {
            query: makeQueryFunction(
              findAll,
              queryTemplate,
              sortMap,
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
        jobProfiles: PropTypes.shape({
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
      selectedRecord: PropTypes.object,
      checkboxList: checkboxListShape.isRequired,
      setList: PropTypes.func.isRequired,
      showSingleResult: PropTypes.bool,
      objectName: PropTypes.string,
      ENTITY_KEY: PropTypes.string,
      RecordView: PropTypes.func,
      RecordForm: PropTypes.func,
      detailProps: PropTypes.object,
      withNewRecordButton: PropTypes.bool,
      INITIAL_RESULT_COUNT: PropTypes.number,
      RESULT_COUNT_INCREMENT: PropTypes.number,
      actionMenuItems: PropTypes.arrayOf(PropTypes.string),
      visibleColumns: PropTypes.arrayOf(PropTypes.string),
      columnWidths: PropTypes.object,
      initialValues: PropTypes.object,
    };

    static defaultProps = {
      showSingleResult: true,
      objectName: 'job-profiles',
      ENTITY_KEY: ENTITY_KEYS.JOB_PROFILES,
      withNewRecordButton: true,
      INITIAL_RESULT_COUNT,
      RESULT_COUNT_INCREMENT,
      actionMenuItems: [
        'addNew',
        'exportSelected',
        'selectAll',
        'deselectAll',
      ],
      visibleColumns,
      columnWidths,
      initialValues: {
        name: '',
        description: '',
        dataType: '',
      },
      RecordView: ViewJobProfile,
      RecordForm: JobProfilesForm,
    };

    renderHeaders = () => jobProfilesShape.renderHeaders(this.props);

    render() {
      const resultedProps = {
        ...this.props,
        renderHeaders: this.renderHeaders,
      };

      return <ListView {...resultedProps} />;
    }
  }

  return JobProfiles;
};
