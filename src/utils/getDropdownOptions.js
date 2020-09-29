import { get } from 'lodash';

import { fieldsConfig } from './fieldsConfig';
import { fieldCategoriesConfig } from './fieldCategoriesConfig';

export const matchFields = (resources, recordType) => {
  return fieldsConfig.filter(field => field.recordType
    && field.recordType === recordType
    && get(resources, field.id));
};

export const getCategory = field => fieldCategoriesConfig.find(category => category.id === field.categoryId);

const getDropdownOptionsFromResources = (record, resources, categoryLabel) => {
  const {
    recordsName,
    fieldToDisplay,
    fieldToSend,
  } = record.fromResources;

  const recordsFromResource = resources[recordsName]?.records;

  return recordsFromResource.map(item => ({
    id: record.id,
    value: item[fieldToSend],
    label: `${categoryLabel}: ${item[fieldToDisplay]}`,
  }));
};

export const getDropdownOptions = (records, resources, intl) => {
  const options = [];

  records.forEach(record => {
    const category = getCategory(record);
    const categoryLabel = category ? intl.formatMessage({ id: category.label }) : '';

    if (record.fromResources) {
      const optionsFromResources = getDropdownOptionsFromResources(record, resources, categoryLabel);

      options.push(...optionsFromResources);
    } else {
      const fieldLabel = intl.formatMessage({ id: record.label });

      options.push({
        id: record.id,
        value: record.value,
        label: `${categoryLabel}: ${fieldLabel}`,
      });
    }
  });

  return options;
};
