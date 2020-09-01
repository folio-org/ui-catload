import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Row,
  Col,
  MultiColumnList,
} from '@folio/stripes/components';

import { ProhibitionIcon } from '../../../../../components';

import {
  transformSubfieldsData,
  getContentData,
  getFieldValue,
} from '../../utils';
import { TRANSLATION_ID_PREFIX } from '../../constants';
import { mappingProfileFieldShape } from '../../../../../utils';

import css from '../../../MappingProfiles.css';

export const Identifier = ({ mappingDetails }) => {
  const prohibitionIconElement = fieldName => <ProhibitionIcon fieldName={fieldName} />;

  const identifiers = getFieldValue(mappingDetails, 'identifiers', 'subfields');

  const identifiersVisibleColumns = ['identifierTypeId', 'value'];
  const identifiersMapping = {
    identifierTypeId: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.titleData.identifiers.field.identifierTypeId`} />
    ),
    value: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.titleData.identifiers.field.value`} />
    ),
  };
  const identifiersFormatter = {
    identifierTypeId: x => x?.identifierTypeId || prohibitionIconElement('identifier-type-id'),
    value: x => x?.value || prohibitionIconElement('identifier-value'),
  };
  const identifiersFieldsMap = [
    {
      field: 'identifierTypeId',
      key: 'value',
    }, {
      field: 'value',
      key: 'value',
    },
  ];
  const identifiersData = transformSubfieldsData(identifiers, identifiersFieldsMap);

  return (
    <Accordion
      id="identifiers"
      label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.identifiers.section`} />}
    >
      <Row left="xs">
        <Col
          data-test-identifiers
          xs={12}
          className={css.colWithTable}
        >
          <MultiColumnList
            contentData={getContentData(identifiersData)}
            visibleColumns={identifiersVisibleColumns}
            columnMapping={identifiersMapping}
            formatter={identifiersFormatter}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

Identifier.propTypes = { mappingDetails: PropTypes.arrayOf(mappingProfileFieldShape).isRequired };
