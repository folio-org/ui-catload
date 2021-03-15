import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Row,
  Col,
  MultiColumnList,
  KeyValue,
  NoValue,
} from '@folio/stripes/components';

import { ProhibitionIcon } from '../../../../../components';
import { ViewRepeatableField } from '../ViewRepeatableField';

import {
  transformSubfieldsData,
  getContentData,
  getFieldValue,
} from '../../utils';
import { TRANSLATION_ID_PREFIX } from '../../constants';
import { mappingProfileFieldShape } from '../../../../../utils';

import css from '../../../MappingProfiles.css';

export const DescriptiveData = ({ mappingDetails }) => {
  const noValueElement = <NoValue />;
  const prohibitionIconElement = fieldName => <ProhibitionIcon fieldName={fieldName} />;

  const publications = getFieldValue(mappingDetails, 'publication', 'subfields');
  const editions = getFieldValue(mappingDetails, 'editions', 'subfields');
  const physicalDescriptions = getFieldValue(mappingDetails, 'physicalDescriptions', 'subfields');
  const resourceType = getFieldValue(mappingDetails, 'instanceTypeId', 'value');
  const natureOfContentTerms = getFieldValue(mappingDetails, 'natureOfContentTermIds', 'subfields');
  const natureOfContentTermsRepeatableAction = getFieldValue(mappingDetails,
    'natureOfContentTermIds', 'repeatableFieldAction');
  const formats = getFieldValue(mappingDetails, 'instanceFormatIds', 'subfields');
  const languages = getFieldValue(mappingDetails, 'languages', 'subfields');
  const publicationFrequencies = getFieldValue(mappingDetails, 'publicationFrequency', 'subfields');
  const publicationRange = getFieldValue(mappingDetails, 'publicationRange', 'subfields');

  const publicationsVisibleColumns = ['publisher', 'role', 'place', 'dateOfPublication'];
  const publicationsMapping = {
    publisher: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publisher`} />
    ),
    role: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.role`} />
    ),
    place: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.place`} />
    ),
    dateOfPublication: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.dateOfPublication`} />
    ),
  };
  const publicationsFormatter = {
    publisher: x => x?.publisher || prohibitionIconElement(`publication-publisher-${x.rowIndex}`),
    role: x => x?.role || prohibitionIconElement(`publication-role-${x.rowIndex}`),
    place: x => x?.place || prohibitionIconElement(`publication-place-${x.rowIndex}`),
    dateOfPublication: x => x?.dateOfPublication || prohibitionIconElement(`publication-date-of-publication-${x.rowIndex}`),
  };
  const publicationsFieldsMap = [
    {
      field: 'publisher',
      key: 'value',
    }, {
      field: 'role',
      key: 'value',
    }, {
      field: 'place',
      key: 'value',
    }, {
      field: 'dateOfPublication',
      key: 'value',
    },
  ];
  const publicationsData = transformSubfieldsData(publications, publicationsFieldsMap);

  const editionsVisibleColumns = ['edition'];
  const editionsMapping = {
    edition: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.edition`} />
    ),
  };
  const editionsFormatter = { edition: x => x?.edition || prohibitionIconElement(`edition-${x.rowIndex}`) };
  const editionsFieldsMap = [
    {
      field: 'edition',
      key: 'value',
    },
  ];
  const editionsData = transformSubfieldsData(editions, editionsFieldsMap);

  const physicalDescriptionsVisibleColumns = ['physicalDescription'];
  const physicalDescriptionsMapping = {
    physicalDescription: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.physicalDescription`} />
    ),
  };
  const physicalDescriptionsFormatter = { physicalDescription: x => x?.physicalDescription || prohibitionIconElement(`physical-description-${x.rowIndex}`) };
  const physicalDescriptionsFieldsMap = [
    {
      field: 'physicalDescription',
      key: 'value',
    },
  ];
  const physicalDescriptionsData = transformSubfieldsData(physicalDescriptions, physicalDescriptionsFieldsMap);

  const natureOfContentTermsVisibleColumns = ['natureOfContentTermId'];
  const natureOfContentTermsMapping = {
    natureOfContentTermId: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.natureOfContentTermId`} />
    ),
  };
  const natureOfContentTermsFormatter = { natureOfContentTermId: x => x?.natureOfContentTermId || noValueElement };
  const natureOfContentTermsFieldsMap = [
    {
      field: 'natureOfContentTermId',
      key: 'value',
    },
  ];
  const natureOfContentTermsData = transformSubfieldsData(natureOfContentTerms, natureOfContentTermsFieldsMap);

  const formatsVisibleColumns = ['instanceFormatId'];
  const formatsMapping = {
    instanceFormatId: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.instanceFormatId`} />
    ),
  };
  const formatsFormatter = { instanceFormatId: x => x?.instanceFormatId || prohibitionIconElement(`instance-format-id-${x.rowIndex}`) };
  const formatsFieldsMap = [
    {
      field: 'instanceFormatId',
      key: 'value',
    },
  ];
  const formatsData = transformSubfieldsData(formats, formatsFieldsMap);

  const languagesVisibleColumns = ['languageId'];
  const languagesMapping = {
    languageId: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.languageId`} />
    ),
  };
  const languagesFormatter = { languageId: x => x?.languageId || prohibitionIconElement(`language-id-${x.rowIndex}`) };
  const languagesFieldsMap = [
    {
      field: 'languageId',
      key: 'value',
    },
  ];
  const languagesData = transformSubfieldsData(languages, languagesFieldsMap);

  const publicationFrequenciesVisibleColumns = ['publicationFrequency'];
  const publicationFrequenciesMapping = {
    publicationFrequency: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publicationFrequency`} />
    ),
  };
  const publicationFrequenciesFormatter = { publicationFrequency: x => x?.publicationFrequency || prohibitionIconElement(`publication-frequency-${x.rowIndex}`) };
  const publicationFrequenciesFieldsMap = [
    {
      field: 'publicationFrequency',
      key: 'value',
    },
  ];
  const publicationFrequenciesData = transformSubfieldsData(publicationFrequencies, publicationFrequenciesFieldsMap);

  const publicationRangeVisibleColumns = ['publicationRange'];
  const publicationRangeMapping = {
    publicationRange: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publicationRange`} />
    ),
  };
  const publicationRangeFormatter = { publicationRange: x => x?.publicationRange || prohibitionIconElement(`publication-range-${x.rowIndex}`) };
  const publicationRangeFieldsMap = [
    {
      field: 'publicationRange',
      key: 'value',
    },
  ];
  const publicationRangeData = transformSubfieldsData(publicationRange, publicationRangeFieldsMap);

  return (
    <Accordion
      id="view-descriptive-data"
      label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.section`} />}
    >
      <Row left="xs">
        <Col
          data-test-publications
          xs={12}
          className={css.colWithTable}
        >
          <KeyValue label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publications.legend`} />}>
            <MultiColumnList
              columnIdPrefix="publications"
              contentData={getContentData(publicationsData)}
              visibleColumns={publicationsVisibleColumns}
              columnMapping={publicationsMapping}
              formatter={publicationsFormatter}
            />
          </KeyValue>
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-editions
          xs={12}
          className={css.colWithTable}
        >
          <KeyValue label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.editions.legend`} />}>
            <MultiColumnList
              columnIdPrefix="editions"
              contentData={getContentData(editionsData)}
              visibleColumns={editionsVisibleColumns}
              columnMapping={editionsMapping}
              formatter={editionsFormatter}
            />
          </KeyValue>
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-physical-descriptions
          xs={12}
          className={css.colWithTable}
        >
          <KeyValue label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.physicalDescriptions.legend`} />}>
            <MultiColumnList
              columnIdPrefix="physical-descriptions"
              contentData={getContentData(physicalDescriptionsData)}
              visibleColumns={physicalDescriptionsVisibleColumns}
              columnMapping={physicalDescriptionsMapping}
              formatter={physicalDescriptionsFormatter}
            />
          </KeyValue>
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-resource-type
          xs={12}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.instanceTypeId`} />}
            value={resourceType || prohibitionIconElement('resource-type')}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-nature-of-content-terms
          xs={12}
          className={css.colWithTable}
        >
          <ViewRepeatableField
            columnIdPrefix="nature-of-content-terms"
            repeatableAction={natureOfContentTermsRepeatableAction}
            fieldData={natureOfContentTermsData}
            visibleColumns={natureOfContentTermsVisibleColumns}
            columnMapping={natureOfContentTermsMapping}
            formatter={natureOfContentTermsFormatter}
            labelId={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.natureOfContentTermsIds.legend`}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-formats
          xs={12}
          className={css.colWithTable}
        >
          <KeyValue label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.instanceFormatIds.legend`} />}>
            <MultiColumnList
              columnIdPrefix="formats"
              contentData={getContentData(formatsData)}
              visibleColumns={formatsVisibleColumns}
              columnMapping={formatsMapping}
              formatter={formatsFormatter}
            />
          </KeyValue>
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-languages
          xs={12}
          className={css.colWithTable}
        >
          <KeyValue label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.languages.legend`} />}>
            <MultiColumnList
              columnIdPrefix="languages"
              contentData={getContentData(languagesData)}
              visibleColumns={languagesVisibleColumns}
              columnMapping={languagesMapping}
              formatter={languagesFormatter}
            />
          </KeyValue>
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-publication-frequencies
          xs={12}
          className={css.colWithTable}
        >
          <KeyValue label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publicationFrequency.legend`} />}>
            <MultiColumnList
              columnIdPrefix="publication-frequencies"
              contentData={getContentData(publicationFrequenciesData)}
              visibleColumns={publicationFrequenciesVisibleColumns}
              columnMapping={publicationFrequenciesMapping}
              formatter={publicationFrequenciesFormatter}
            />
          </KeyValue>
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-publication-ranges
          xs={12}
          className={css.colWithTable}
        >
          <KeyValue label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publicationRange.legend`} />}>
            <MultiColumnList
              columnIdPrefix="publication-ranges"
              contentData={getContentData(publicationRangeData)}
              visibleColumns={publicationRangeVisibleColumns}
              columnMapping={publicationRangeMapping}
              formatter={publicationRangeFormatter}
            />
          </KeyValue>
        </Col>
      </Row>
    </Accordion>
  );
};

DescriptiveData.propTypes = { mappingDetails: PropTypes.arrayOf(mappingProfileFieldShape).isRequired };
