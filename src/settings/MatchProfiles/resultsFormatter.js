import React, { Fragment } from 'react';
import HighLight from 'react-highlighter';
import {
  get,
  isEmpty,
} from 'lodash';

import { AppIcon } from '@folio/stripes/core';
import {
  Checkbox,
  Icon,
} from '@folio/stripes/components';

import { capitalize } from '../../utils';
import {
  HTML_LANG_DIRECTIONS,
  ENTITY_CONFIGS,
  STRING_CAPITALIZATION_MODES,
  STRING_CAPITALIZATION_EXCLUSIONS,
} from '../../utils/constants';

import {
  DateFormatter,
  UserNameFormatter,
} from '../../components';

import sharedCss from '../../shared.css';
import css from './MatchProfiles.css';

export const resultsFormatter = searchTerm => ({
  selected: record => (
    <button
      type="button"
      className={sharedCss.selectableCellButton}
      data-test-select-item
      onClick={e => e.stopPropagation()}
    >
      <Checkbox name={`selected-${record.id}`} />
    </button>
  ),
  name: record => (
    <AppIcon
      size="small"
      app="data-import"
      iconKey="matchProfiles"
      className={sharedCss.cellAppIcon}
    >
      <HighLight
        search={searchTerm}
        className={sharedCss.container}
      >
        {record.name}
      </HighLight>
    </AppIcon>
  ),
  match: record => {
    const {
      existingRecordType,
      existingStaticValueType,
      field,
      fieldMarc,
      fieldNonMarc,
    } = record;
    const { RECORD_TYPES } = ENTITY_CONFIGS.MATCH_PROFILES;

    const fieldSource = (field || existingRecordType).replace(/_/g, ' ');
    const fieldMatched = (fieldMarc || fieldNonMarc || existingStaticValueType).replace(/_/g, ' ');

    return (
      <AppIcon
        size="small"
        app="data-import"
        iconKey={RECORD_TYPES[existingRecordType].icon}
        className={sharedCss.cellAppIcon}
      >
        {document.dir === HTML_LANG_DIRECTIONS.LEFT_TO_RIGHT &&
          <Fragment>
            <HighLight
              search={searchTerm}
              className={sharedCss.container}
            >
              {RECORD_TYPES[existingRecordType].caption}
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
        }
        {document.dir === HTML_LANG_DIRECTIONS.RIGHT_TO_LEFT &&
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
              {RECORD_TYPES[existingRecordType].caption}
            </HighLight>
          </Fragment>
        }
      </AppIcon>
    );
  },
  tags: record => {
    const tags = get(record, 'tags.tagList', []);

    if (isEmpty(tags)) {
      return '-';
    }

    return (
      <span className={css.tags}>
        <Icon
          size="small"
          icon="tag"
          iconClassName={css.tagsIcon}
        />
        <HighLight
          search={searchTerm}
          className={sharedCss.container}
        >
          {tags.join(', ')}
        </HighLight>
      </span>
    );
  },
  updated: record => {
    const { metadata: { updatedDate } } = record;

    return <DateFormatter value={updatedDate} />;
  },
  updatedBy: record => <UserNameFormatter value={record.userInfo} />,
});
