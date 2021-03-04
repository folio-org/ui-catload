import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Row,
  Col,
  KeyValue,
} from '@folio/stripes/components';

import { getFieldValue } from '../../utils';
import { TRANSLATION_ID_PREFIX } from '../../constants';
import { mappingProfileFieldShape } from '../../../../../utils';

export const Condition = ({ mappingDetails }) => {
  const numberOfMissingPieces = getFieldValue(mappingDetails, 'numberOfMissingPieces', 'value');
  const missingPieces = getFieldValue(mappingDetails, 'missingPieces', 'value');
  const missingPiecesDate = getFieldValue(mappingDetails, 'missingPiecesDate', 'value');
  const itemDamagedStatus = getFieldValue(mappingDetails, 'itemDamagedStatusId', 'value');
  const itemDamagedStatusDate = getFieldValue(mappingDetails, 'itemDamagedStatusDate', 'value');

  return (
    <Accordion
      id="item-condition"
      label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemCondition.section`} />}
    >
      <Row left="xs">
        <Col
          data-test-missing-pieces-number
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemCondition.field.numberOfMissingPieces`} />}
            value={numberOfMissingPieces}
          />
        </Col>
        <Col
          data-test-missing-pieces
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemCondition.field.missingPieces`} />}
            value={missingPieces}
          />
        </Col>
        <Col
          data-test-date
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemCondition.field.missingPiecesDate`} />}
            value={missingPiecesDate}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-item-damaged-status
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemCondition.field.itemDamagedStatus`} />}
            value={itemDamagedStatus}
          />
        </Col>
        <Col
          data-test-date2
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemCondition.field.itemDamagedStatusDate`} />}
            value={itemDamagedStatusDate}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

Condition.propTypes = { mappingDetails: PropTypes.arrayOf(mappingProfileFieldShape).isRequired };
