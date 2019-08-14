import React, {
  memo,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import HighLight from 'react-highlighter';
import { get } from 'lodash';
import {
  IntlConsumer,
  AppIcon,
} from '@folio/stripes/core';

import {
  HTML_LANG_DIRECTIONS,
  STRING_CAPITALIZATION_EXCLUSIONS,
  STRING_CAPITALIZATION_MODES,
} from '../../../utils/constants';
import { capitalize } from '../../../utils';

import { FOLIO_RECORD_TYPES } from '../folioRecordTypes';

import sharedCss from '../../../shared.css';

export const MatchColumn = memo(({
  record,
  searchTerm,
}) => {
  const {
    existingRecordType,
    field,
  } = record;

  console.log('Record: ', record);

  const fieldSource = (field || existingRecordType || '').replace(/_/g, ' ');
  const fieldsMatched = get(record, 'matchDetails[0].existingMatchExpression.fields', []).map(item => item.value || '');

  if (document.dir === HTML_LANG_DIRECTIONS.RIGHT_TO_LEFT) {
    fieldsMatched.reverse();
  }

  const fieldMatched = fieldsMatched.join('.').replace(/_/g, ' ');

  return (
    <IntlConsumer>
      {({ formatMessage }) => (
        <AppIcon
          size="small"
          app="data-import"
          iconKey={FOLIO_RECORD_TYPES[existingRecordType].iconKey}
        >
          <Fragment>
            {document.dir === HTML_LANG_DIRECTIONS.LEFT_TO_RIGHT && (
              <Fragment>
                <HighLight
                  search={searchTerm}
                  className={sharedCss.container}
                >
                  {formatMessage({ id: FOLIO_RECORD_TYPES[existingRecordType].captionId })}
                </HighLight>
                &nbsp;&middot;&nbsp;
                <HighLight
                  search={searchTerm}
                  className={sharedCss.container}
                >
                  {capitalize(fieldSource, STRING_CAPITALIZATION_MODES.WORDS, STRING_CAPITALIZATION_EXCLUSIONS)}
                </HighLight>
                &nbsp;&rarr;&nbsp;
                <HighLight
                  search={searchTerm}
                  className={sharedCss.container}
                >
                  {capitalize(fieldMatched, STRING_CAPITALIZATION_MODES.WORDS, STRING_CAPITALIZATION_EXCLUSIONS)}
                </HighLight>
              </Fragment>
            )}
            {document.dir === HTML_LANG_DIRECTIONS.RIGHT_TO_LEFT && (
              <Fragment>
                <HighLight
                  search={searchTerm}
                  className={sharedCss.container}
                >
                  {capitalize(fieldMatched, STRING_CAPITALIZATION_MODES.WORDS, STRING_CAPITALIZATION_EXCLUSIONS)}
                </HighLight>
                &nbsp;&larr;&nbsp;
                <HighLight
                  search={searchTerm}
                  className={sharedCss.container}
                >
                  {capitalize(fieldSource, STRING_CAPITALIZATION_MODES.WORDS, STRING_CAPITALIZATION_EXCLUSIONS)}
                </HighLight>
                &nbsp;&middot;&nbsp;
                <HighLight
                  search={searchTerm}
                  className={sharedCss.container}
                >
                  {formatMessage({ id: FOLIO_RECORD_TYPES[existingRecordType].captionId })}
                </HighLight>
              </Fragment>
            )}
          </Fragment>
        </AppIcon>
      )}
    </IntlConsumer>
  );
});

MatchColumn.propTypes = {
  record: PropTypes.object.isRequired,
  searchTerm: PropTypes.string,
};
