import React from 'react';

import { renderWithIntl } from '@folio/stripes-data-transfer-components/test/jest/helpers';
import '../../../../../test/jest/__mock__';
import { translationsProperties } from '../../../../../test/jest/helpers';

import { QualifierSection } from './QualifierSection';

const qualifierSection = {
  recordFieldType: 'incoming',
  qualifierData: {
    comparisonPart: 'NUMERICS_ONLY',
    qualifierType: 'BEGINS_WITH',
    qualifierValue: 'test value',
  },
};
const qualifierSectionWithoutQualifierType = {
  recordFieldType: 'incoming',
  qualifierData: {
    comparisonPart: 'NUMERICS_ONLY',
    qualifierType: '',
    qualifierValue: '',
  },
};

const renderQualifierSection = ({
  recordFieldType,
  qualifierData,
}) => {
  const component = (
    <QualifierSection
      recordFieldType={recordFieldType}
      qualifierData={qualifierData}
    />
  );

  return renderWithIntl(component, translationsProperties);
};

describe('QualifierSection view', () => {
  it('should be rendered with additional content', () => {
    const { container } = renderQualifierSection(qualifierSection);
    const element = container.querySelector('.content');

    expect(element).toBeDefined();
  });

  it('should be rendered without additional content', () => {
    const { container } = renderQualifierSection(qualifierSectionWithoutQualifierType);
    const element = container.querySelector('.content');

    expect(element).toBeNull();
  });
});
