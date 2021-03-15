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

export const ItemData = ({ mappingDetails }) => {
  const materialType = getFieldValue(mappingDetails, 'materialType.id', 'value');
  const copyNumber = getFieldValue(mappingDetails, 'copyNumber', 'value');
  const callNumberType = getFieldValue(mappingDetails, 'itemLevelCallNumberTypeId', 'value');
  const callNumberPrefix = getFieldValue(mappingDetails, 'itemLevelCallNumberPrefix', 'value');
  const callNumber = getFieldValue(mappingDetails, 'itemLevelCallNumber', 'value');
  const callNumberSuffix = getFieldValue(mappingDetails, 'itemLevelCallNumberSuffix', 'value');
  const numberOfPieces = getFieldValue(mappingDetails, 'numberOfPieces', 'value');
  const descriptionOfPieces = getFieldValue(mappingDetails, 'descriptionOfPieces', 'value');

  return (
    <Accordion
      id="view-item-data"
      label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemData.section`} />}
    >
      <Row left="xs">
        <Col
          data-test-material-type
          xs={6}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemData.field.materialType`} />}
            value={materialType}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-copy-number
          xs={6}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.field.copyNumber`} />}
            value={copyNumber}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-call-number-type
          xs={6}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.field.callNumberType`} />}
            value={callNumberType}
          />
        </Col>
        <Col
          data-test-call-number-prefix
          xs={2}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.field.callNumberPrefix`} />}
            value={callNumberPrefix}
          />
        </Col>
        <Col
          data-test-call-number
          xs={2}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.field.callNumber`} />}
            value={callNumber}
          />
        </Col>
        <Col
          data-test-call-number-suffix
          xs={2}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.field.callNumberSuffix`} />}
            value={callNumberSuffix}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-number-of-pieces
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemData.field.numberOfPieces`} />}
            value={numberOfPieces}
          />
        </Col>
        <Col
          data-test-description-of-pieces
          xs={4}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.item.itemData.field.descriptionOfPieces`} />}
            value={descriptionOfPieces}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

ItemData.propTypes = { mappingDetails: PropTypes.arrayOf(mappingProfileFieldShape).isRequired };
