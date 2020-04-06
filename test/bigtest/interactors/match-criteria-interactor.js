import {
  interactor,
  collection,
  count,
  attribute,
  clickable,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';
import KeyValueInteractor from '@folio/stripes-components/lib/KeyValue/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import DatepickerInteractor from '@folio/stripes-components/lib/Datepicker/tests/interactor';
import { InputInteractor } from './input-interactor';

import { SectionInteractor } from './section-interactor';
import { CheckboxInteractor } from './checkbox-interactor';

@interactor
class ExistingRecordDropdown {
  optionCount = count('li');
}

@interactor
class MatchCriterion {
  dropdown = new SelectInteractor('#criterion1-criterion-type');
}

@interactor
class ExistingRecordFieldSection {
  dropdownList = new ExistingRecordDropdown('[id*="container-criterion-value-type"]');
  expandedAttribute = attribute('#criterion-value-type', 'aria-expanded');
  clickDropdownButton = clickable('#criterion-value-type');
}

@interactor
class RecordSections {
  children = collection('section', SectionInteractor);
}

@interactor
class StaticValueSection {
  staticValueDropdown = new SelectInteractor();
  staticValueTypeField = new KeyValueInteractor('[data-test-select-static-value]');

  inputText = new InputInteractor('[data-test-static-text-field]');
  inputNumber = new InputInteractor('[data-test-static-number-field]');
  inputExactDate = new DatepickerInteractor('[data-test-static-exact-date-wrapper]');
  inputFromDate = new DatepickerInteractor('[data-test-static-date-range-field] > div:nth-child(2)');
  inputToDate = new DatepickerInteractor('[data-test-static-date-range-field] > div:nth-child(3)');

  fieldText = new KeyValueInteractor('[data-test-static-text-field]');
  fieldNumber = new KeyValueInteractor('[data-test-static-number-field]');
  fieldExactDate = new KeyValueInteractor('[data-test-static-exact-date-field]');
  fieldFromDate = new KeyValueInteractor('[data-test-static-from-date-field]');
  fieldToDate = new KeyValueInteractor('[data-test-static-to-date-field]');
}

export class MatchCriteriaInteractor extends AccordionInteractor {
  matchCriterionSection = new MatchCriterion('[class*="criterion--"] div');

  fieldMain = new KeyValueInteractor('[data-test-field-main]');
  fieldIn1 = new KeyValueInteractor('[data-test-field-in1]');
  fieldIn2 = new KeyValueInteractor('[data-test-field-in2]');
  fieldSubfield = new KeyValueInteractor('[data-test-field-subfield]');
  inputMain = new InputInteractor('[data-test-field-main]');
  inputIn1 = new InputInteractor('[data-test-field-in1]');
  inputIn2 = new InputInteractor('[data-test-field-in2]');
  inputSubfield = new InputInteractor('[data-test-field-subfield');
  fieldQualifierType = new KeyValueInteractor('[data-test-field-qualifier-type');
  fieldQualifierValue = new KeyValueInteractor('[data-test-field-qualifier-value');

  incomingRecord = new SectionInteractor('section[class*=incoming]');
  incomingRecordSections = new RecordSections('section[class*=incoming]');
  incomingRecordQualifierCheckbox = new CheckboxInteractor('section[class*=incoming] [class*="qualifier---"]');
  incomingRecordPartCheckbox = new CheckboxInteractor('section[class*=incoming] [class*="part---"]');

  staticValueSection = new StaticValueSection('section[class*="static-section---"]');

  matchCriterion = new SectionInteractor('section[class*="criterion-section"]');
  matchCriterionField = new KeyValueInteractor('[data-test-match-criterion]');

  existingRecord = new SectionInteractor('section[class*=existing]');
  existingRecordSections = new RecordSections('section[class*=existing]');
  existingRecordFieldSections = new ExistingRecordFieldSection('section[class*=existing] section[class*=field]');
  existingRecordQualifierCheckbox = new CheckboxInteractor('section[class*=existing] [class*="qualifier---"]');
  existingRecordPartCheckbox = new CheckboxInteractor('section[class*=existing] [class*="part---"]');
}
