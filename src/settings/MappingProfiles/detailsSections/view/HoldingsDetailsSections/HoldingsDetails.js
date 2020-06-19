import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Row,
  Col,
  NoValue,
  KeyValue,
  MultiColumnList,
} from '@folio/stripes/components';

import {
  getContentData,
  getFieldValue,
  transformSubfieldsData,
} from '../../utils';
import { TRANSLATION_ID_PREFIX } from '../../constants';
import { mappingProfileFieldShape } from '../../../../../utils';
import css from '../../../MappingProfiles.css';

export const HoldingsDetails = ({ mappingDetails }) => {
  const numberOfItems = getFieldValue(mappingDetails, 'numberOfItems', 'value');
  const statements = getFieldValue(mappingDetails, 'holdingStatements', 'subfields');
  const statementsForSupplement = getFieldValue(mappingDetails, 'holdingStatementsForSupplements', 'subfields');
  const statementsForIndexes = getFieldValue(mappingDetails, 'holdingStatementsForIndexes', 'subfields');
  const illPolicy = getFieldValue(mappingDetails, 'illPolicyId', 'value');
  const digitizationPolicy = getFieldValue(mappingDetails, 'digitizationPolicy', 'value');
  const retentionPolicy = getFieldValue(mappingDetails, 'retentionPolicy', 'value');

  const statementsVisibleColumns = ['statement', 'note'];
  const statementsMapping = {
    statement: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.statements.field.holdingsStatement`} />
    ),
    note: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.statements.field.holdingsStatementNote`} />
    ),
  };
  const statementsFormatter = {
    statement: x => x?.statement || <NoValue />,
    note: x => x?.note || <NoValue />,
  };
  const statementsData = transformSubfieldsData(statements, statementsVisibleColumns);

  const statementsForSupplementVisibleColumns = ['statement', 'note'];
  const statementsForSupplementMapping = {
    statement: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.statements.field.holdingsStatement`} />
    ),
    note: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.statements.field.holdingsStatementNote`} />
    ),
  };
  const statementsForSupplementFormatter = {
    statement: x => x?.statement || <NoValue />,
    note: x => x?.note || <NoValue />,
  };
  const statementsForSupplementData = transformSubfieldsData(statementsForSupplement, statementsForSupplementVisibleColumns);

  const statementsForIndexesVisibleColumns = ['statement', 'note'];
  const statementsForIndexesMapping = {
    statement: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.statements.field.holdingsStatement`} />
    ),
    note: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.statements.field.holdingsStatementNote`} />
    ),
  };
  const statementsForIndexesFormatter = {
    statement: x => x?.statement || <NoValue />,
    note: x => x?.note || <NoValue />,
  };
  const statementsForIndexesData = transformSubfieldsData(statementsForIndexes, statementsForIndexesVisibleColumns);

  return (
    <Accordion
      id="holdings-details"
      label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.details.section`} />}
    >
      <Row left="xs">
        <Col
          data-test-number-of-items
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.details.field.numberOfItems`} />}
            value={numberOfItems || <NoValue />}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-statements
          id="section-holding-statements"
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.statements.field.holdingsStatement.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(statementsData)}
            visibleColumns={statementsVisibleColumns}
            columnMapping={statementsMapping}
            formatter={statementsFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-statements-for-supplement
          id="section-holding-statements-for-supplements"
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.statements.field.holdingsStatementsForSupplements.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(statementsForSupplementData)}
            visibleColumns={statementsForSupplementVisibleColumns}
            columnMapping={statementsForSupplementMapping}
            formatter={statementsForSupplementFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-statements-for-indexes
          id="section-holding-statements-for-indexes"
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.statements.field.holdingsStatementsForIndexes.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(statementsForIndexesData)}
            visibleColumns={statementsForIndexesVisibleColumns}
            columnMapping={statementsForIndexesMapping}
            formatter={statementsForIndexesFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-ill-policy
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.field.illPolicy`} />}
            value={illPolicy || <NoValue />}
          />
        </Col>
        <Col
          data-test-digitization-policy
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.field.digitizationPolicy`} />}
            value={digitizationPolicy || <NoValue />}
          />
        </Col>
        <Col
          data-test-retention-policy
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.holdings.field.retentionPolicy`} />}
            value={retentionPolicy || <NoValue />}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

HoldingsDetails.propTypes = { mappingDetails: PropTypes.arrayOf(mappingProfileFieldShape) };
