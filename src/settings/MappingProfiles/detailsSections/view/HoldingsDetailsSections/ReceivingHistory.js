import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Row,
  Col,
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';

import {
  getContentData,
  getFieldValue,
  transformSubfieldsData,
} from '../../utils';
import { TRANSLATION_ID_PREFIX } from '../../constants';
import { mappingProfileFieldShape } from '../../../../../utils';

import css from '../../../MappingProfiles.css';

export const ReceivingHistory = ({ mappingDetails }) => {
  const receivingHistory = getFieldValue(mappingDetails, 'receivingHistory.entries', 'subfields');

  const receivingHistoryVisibleColumns = ['publicDisplay', 'enumeration', 'chronology'];
  const receivingHistoryMapping = {
    publicDisplay: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.field.publicDisplay`} />
    ),
    enumeration: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.field.enumeration`} />
    ),
    chronology: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.field.chronology`} />
    ),
  };
  const receivingHistoryFormatter = {
    publicDisplay: x => x?.publicDisplay || <NoValue />,
    enumeration: x => x?.enumeration || <NoValue />,
    chronology: x => x?.chronology || <NoValue />,
  };
  const receivingHistoryData = transformSubfieldsData(receivingHistory, receivingHistoryVisibleColumns);

  return (
    <Accordion
      id="holdings-receiving-history"
      label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.receivingHistory.section`} />}
    >
      <Row left="xs">
        <Col
          data-test-receiving-history-note
          id="section-receiving-history"
          xs={12}
          className={css.colWithTable}
        >
          <MultiColumnList
            contentData={getContentData(receivingHistoryData)}
            visibleColumns={receivingHistoryVisibleColumns}
            columnMapping={receivingHistoryMapping}
            formatter={receivingHistoryFormatter}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

ReceivingHistory.propTypes = { mappingDetails: PropTypes.arrayOf(mappingProfileFieldShape) };
