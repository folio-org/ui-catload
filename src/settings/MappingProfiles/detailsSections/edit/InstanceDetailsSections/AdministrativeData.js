import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Accordion,
  Row,
  Col,
  RepeatableField,
  TextField,
} from '@folio/stripes/components';

import {
  BooleanActionField,
  DatePickerDecorator,
  AcceptedValuesField,
  RepeatableActionsField,
} from '../../../../../components';

import { validateMARCWithDate } from '../../../../../utils';
import {
  onAdd,
  onRemove,
  getFieldName,
  getSubfieldName,
  getBoolFieldName,
} from '../utils';
import { TRANSLATION_ID_PREFIX } from '../constants';

export const AdministrativeData = ({
  statisticalCodes,
  initialFields,
  setReferenceTables,
  okapi,
}) => {
  return (
    <Accordion
      id="administrative-data"
      label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.administrativeData.section`} />}
    >
      <Row left="xs">
        <Col
          data-test-suppress-from-discovery
          xs={4}
        >
          <BooleanActionField
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.administrativeData.field.discoverySuppress`} />}
            name={getBoolFieldName(0)}
          />
        </Col>
        <Col
          data-test-staff-suppress
          xs={4}
        >
          <BooleanActionField
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.administrativeData.field.staffSuppress`} />}
            name={getBoolFieldName(1)}
          />
        </Col>
        <Col
          data-test-previously-held
          xs={4}
        >
          <BooleanActionField
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.administrativeData.field.previouslyHeld`} />}
            name={getBoolFieldName(2)}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-instance-hrid
          xs={6}
        >
          <Field
            component={TextField}
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.administrationData.field.hrid`} />}
            name={getFieldName(3)}
            disabled
          />
        </Col>
        <Col
          data-test-metadata-source
          xs={6}
        >
          <Field
            component={TextField}
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.administrationData.field.source`} />}
            name={getFieldName(4)}
            disabled
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-cataloged-date
          xs={6}
        >
          <Field
            component={DatePickerDecorator}
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.administrationData.field.catalogedDate`} />}
            name={getFieldName(5)}
            wrappedComponent={TextField}
            wrapperLabel={`${TRANSLATION_ID_PREFIX}.wrapper.acceptedValues`}
            validate={[validateMARCWithDate]}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-status-term
          xs={12}
        >
          <AcceptedValuesField
            component={TextField}
            name={getFieldName(6)}
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.administrationData.field.statusId`} />}
            optionValue="name"
            optionLabel="name"
            wrapperLabel={`${TRANSLATION_ID_PREFIX}.wrapper.acceptedValues`}
            wrapperSourceLink="/instance-statuses?limit=1000&query=cql.allRecords=1 sortby name"
            wrapperSourcePath="instanceStatuses"
            okapi={okapi}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-mode-of-issuance
          xs={12}
        >
          <Field
            component={TextField}
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.administrationData.field.modeOfIssuanceId`} />}
            name={getFieldName(7)}
            disabled
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-statistical-codes
          xs={12}
        >
          <RepeatableActionsField
            wrapperFieldName={getFieldName(8)}
            legend={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.administrativeData.field.statisticalCodes.legend`} />}
          >
            <RepeatableField
              fields={statisticalCodes}
              addLabel={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.administrativeData.field.statisticalCodes.addLabel`} />}
              onAdd={() => onAdd(statisticalCodes, 'statisticalCodeIds', 8, initialFields, setReferenceTables, 'order')}
              onRemove={index => onRemove(index, statisticalCodes, 8, setReferenceTables, 'order')}
              renderField={(field, index) => (
                <Row left="xs">
                  <Col
                    data-test-statistical-code
                    xs={12}
                  >
                    <AcceptedValuesField
                      okapi={okapi}
                      component={TextField}
                      name={getSubfieldName(8, 0, index)}
                      label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.administrativeData.field.statisticalCode`} />}
                      optionLabel="name"
                      optionValue="name"
                      wrapperLabel={`${TRANSLATION_ID_PREFIX}.wrapper.acceptedValues`}
                      wrapperSourceLink="/statistical-codes?limit=2000&query=cql.allRecords=1 sortby name"
                      wrapperSourcePath="statisticalCodes"
                    />
                  </Col>
                </Row>
              )}
            />
          </RepeatableActionsField>
        </Col>
      </Row>
    </Accordion>
  );
};
