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

import {
  transformSubfieldsData,
  getContentData,
  getFieldValue,
} from '../../utils';
import { TRANSLATION_ID_PREFIX } from '../../constants';
import { mappingProfileFieldShape } from '../../../../../utils';

import css from '../../../MappingProfiles.css';

export const DescriptiveData = ({ mappingDetails }) => {
  const publications = getFieldValue(mappingDetails, 'publication', 'subfields');
  const editions = getFieldValue(mappingDetails, 'editions', 'subfields');
  const physicalDescriptions = getFieldValue(mappingDetails, 'physicalDescriptions', 'subfields');
  const resourceType = getFieldValue(mappingDetails, 'instanceTypeId', 'value');
  const natureOfContentTerms = getFieldValue(mappingDetails, 'natureOfContentTermIds', 'subfields');
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
    publisher: x => x?.publisher || <ProhibitionIcon />,
    role: x => x?.role || <ProhibitionIcon />,
    place: x => x?.place || <ProhibitionIcon />,
    dateOfPublication: x => x?.dateOfPublication || <ProhibitionIcon />,
  };
  const publicationsData = transformSubfieldsData(publications, publicationsVisibleColumns);

  const editionsVisibleColumns = ['edition'];
  const editionsMapping = {
    edition: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.edition`} />
    ),
  };
  const editionsFormatter = { edition: x => x?.edition || <ProhibitionIcon /> };
  const editionsData = transformSubfieldsData(editions, editionsVisibleColumns);

  const physicalDescriptionsVisibleColumns = ['physicalDescription'];
  const physicalDescriptionsMapping = {
    physicalDescription: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.physicalDescription`} />
    ),
  };
  const physicalDescriptionsFormatter = { physicalDescription: x => x?.physicalDescription || <ProhibitionIcon /> };
  const physicalDescriptionsData = transformSubfieldsData(physicalDescriptions, physicalDescriptionsVisibleColumns);

  const natureOfContentTermsVisibleColumns = ['natureOfContentTermId'];
  const natureOfContentTermsMapping = {
    natureOfContentTermId: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.natureOfContentTermId`} />
    ),
  };
  const natureOfContentTermsFormatter = { natureOfContentTermId: x => x?.natureOfContentTermId || <NoValue /> };
  const natureOfContentTermsData = transformSubfieldsData(natureOfContentTerms, natureOfContentTermsVisibleColumns);

  const formatsVisibleColumns = ['instanceFormatId'];
  const formatsMapping = {
    instanceFormatId: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.instanceFormatId`} />
    ),
  };
  const formatsFormatter = { instanceFormatId: x => x?.instanceFormatId || <ProhibitionIcon /> };
  const formatsData = transformSubfieldsData(formats, formatsVisibleColumns);

  const languagesVisibleColumns = ['languageId'];
  const languagesMapping = {
    languageId: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.languageId`} />
    ),
  };
  const languagesFormatter = { languageId: x => x?.languageId || <ProhibitionIcon /> };
  const languagesData = transformSubfieldsData(languages, languagesVisibleColumns);

  const publicationFrequenciesVisibleColumns = ['publicationFrequency'];
  const publicationFrequenciesMapping = {
    publicationFrequency: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publicationFrequency`} />
    ),
  };
  const publicationFrequenciesFormatter = { publicationFrequency: x => x?.publicationFrequency || <ProhibitionIcon /> };
  const publicationFrequenciesData = transformSubfieldsData(publicationFrequencies, publicationFrequenciesVisibleColumns);

  const publicationRangeVisibleColumns = ['publicationRange'];
  const publicationRangeMapping = {
    publicationRange: (
      <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publicationRange`} />
    ),
  };
  const publicationRangeFormatter = { publicationRange: x => x?.publicationRange || <ProhibitionIcon /> };
  const publicationRangeData = transformSubfieldsData(publicationRange, publicationRangeVisibleColumns);

  return (
    <Accordion
      id="descriptive-data"
      label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.section`} />}
    >
      <Row left="xs">
        <Col
          data-test-publications
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publications.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(publicationsData)}
            visibleColumns={publicationsVisibleColumns}
            columnMapping={publicationsMapping}
            formatter={publicationsFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-editions
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.editions.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(editionsData)}
            visibleColumns={editionsVisibleColumns}
            columnMapping={editionsMapping}
            formatter={editionsFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-physical-descriptions
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.physicalDescriptions.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(physicalDescriptionsData)}
            visibleColumns={physicalDescriptionsVisibleColumns}
            columnMapping={physicalDescriptionsMapping}
            formatter={physicalDescriptionsFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-resource-type
          xs={12}
        >
          <KeyValue
            label={<FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.instanceTypeId`} />}
            value={resourceType || <ProhibitionIcon />}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-nature-of-content-terms
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.natureOfContentTermsIds.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(natureOfContentTermsData)}
            visibleColumns={natureOfContentTermsVisibleColumns}
            columnMapping={natureOfContentTermsMapping}
            formatter={natureOfContentTermsFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-formats
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.instanceFormatIds.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(formatsData)}
            visibleColumns={formatsVisibleColumns}
            columnMapping={formatsMapping}
            formatter={formatsFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-languages
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.languages.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(languagesData)}
            visibleColumns={languagesVisibleColumns}
            columnMapping={languagesMapping}
            formatter={languagesFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-publication-frequencies
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publicationFrequency.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(publicationFrequenciesData)}
            visibleColumns={publicationFrequenciesVisibleColumns}
            columnMapping={publicationFrequenciesMapping}
            formatter={publicationFrequenciesFormatter}
          />
        </Col>
      </Row>
      <Row left="xs">
        <Col
          data-test-publication-ranges
          xs={12}
          className={css.colWithTable}
        >
          <div>
            <strong>
              <FormattedMessage id={`${TRANSLATION_ID_PREFIX}.instance.descriptiveData.field.publicationRange.legend`} />
            </strong>
          </div>
          <MultiColumnList
            contentData={getContentData(publicationRangeData)}
            visibleColumns={publicationRangeVisibleColumns}
            columnMapping={publicationRangeMapping}
            formatter={publicationRangeFormatter}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

DescriptiveData.propTypes = { mappingDetails: PropTypes.arrayOf(mappingProfileFieldShape) };