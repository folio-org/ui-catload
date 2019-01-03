import React from 'react';
import PropTypes from 'prop-types';

import { List } from '@folio/stripes/components';

import jobPropTypes from '../Job/jobPropTypes';
import Preloader from '../../../Preloader';
import EndOfList from '../../../EndOfList';
import Job from '../Job';

import css from './JobsList.css';

const JobsList = props => {
  const {
    jobs,
    hasLoaded,
    noJobsMessage,
  } = props;
  const itemFormatter = job => (
    <Job
      key={job.hrId}
      job={job}
    />
  );
  const EmptyMessage = (
    <span
      data-test-empty-message
      className={css.emptyMessage}
    >
      {noJobsMessage}
    </span>
  );
  const LoadedJobsList = (
    <div data-test-jobs-list>
      <List
        items={jobs}
        itemFormatter={itemFormatter}
        isEmptyMessage={EmptyMessage}
        listClass={css.list}
        marginBottom0
      />
    </div>
  );

  return (
    <div className={css.listContainer}>
      {hasLoaded ? LoadedJobsList : <Preloader />}
      <EndOfList />
    </div>
  );
};

JobsList.propTypes = {
  jobs: PropTypes.arrayOf(jobPropTypes).isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  noJobsMessage: PropTypes.node,
};

JobsList.defaultProps = {
  noJobsMessage: '',
};

export default JobsList;
