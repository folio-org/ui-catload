// eslint-disable-next-line max-classes-per-file
import {
  AccordionInteractor,
  AccordionSetInteractor,
} from '@folio/stripes-components/lib/Accordion/tests/interactor';
import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';
import ExpandAllButtonInteractor from '@folio/stripes-components/lib/Accordion/tests/expand-all-button-interactor';
import KeyValueInteractor from '@folio/stripes-components/lib/KeyValue/tests/interactor';

class AdministrativeDataAccordion extends AccordionInteractor {
  suppressFromDiscovery = new KeyValueInteractor('[data-test-suppress-from-discovery]');
  itemHRID = new KeyValueInteractor('[data-test-item-hrid]');
  barcode = new KeyValueInteractor('[data-test-barcode]');
  accessionNumber = new KeyValueInteractor('[data-test-accession-number]');
  itemIdentifier = new KeyValueInteractor('[data-test-item-identifier]');
  formerIds = new MultiColumnListInteractor('#section-former-ids');
  statisticalCodes = new MultiColumnListInteractor('#section-statistical-code-ids');
}

class ItemDataAccordion extends AccordionInteractor {
  materialType = new KeyValueInteractor('[data-test-material-type]');
  copyNumber = new KeyValueInteractor('[data-test-copy-number]');
  callNumberType = new KeyValueInteractor('[data-test-call-number-type]');
  callNumberPrefix = new KeyValueInteractor('[data-test-call-number-prefix]');
  callNumber = new KeyValueInteractor('[data-test-call-number]');
  callNumberSuffix = new KeyValueInteractor('[data-test-call-number-suffix]');
  numberOfPieces = new KeyValueInteractor('[data-test-number-of-pieces]');
  descriptionOfPieces = new KeyValueInteractor('[data-test-description-of-pieces]');
}

class EnumerationDataAccordion extends AccordionInteractor {
  enumeration = new KeyValueInteractor('[data-test-enumeration]');
  chronology = new KeyValueInteractor('[data-test-chronology]');
  volume = new KeyValueInteractor('[data-test-volume]');
  yearCaption = new MultiColumnListInteractor('#section-year-caption');
}

class ConditionAccordion extends AccordionInteractor {
  missingPiecesNumber = new KeyValueInteractor('[data-test-missing-pieces-number]');
  missingPieces = new KeyValueInteractor('[data-test-missing-pieces]');
  date = new KeyValueInteractor('[data-test-date]');
  itemDamagedStatus = new KeyValueInteractor('[data-test-item-damaged-status]');
  date2 = new KeyValueInteractor('[data-test-date2]');
}

class ItemNotesAccordion extends AccordionInteractor {
  notes = new MultiColumnListInteractor('#section-item-notes');
}

class LoanAndAvailabilityAccordion extends AccordionInteractor {
  permanentLoanType = new KeyValueInteractor('[data-test-permanent-loan-type]');
  temporaryLoanType = new KeyValueInteractor('[data-test-temporary-loan-type]');
  status = new KeyValueInteractor('[data-test-status]');
  circulationNotes = new MultiColumnListInteractor('#section-circulation-notes');
}

class LocationAccordion extends AccordionInteractor {
  permanent = new KeyValueInteractor('[data-test-permanent]');
  temporary = new KeyValueInteractor('[data-test-temporary]');
}

class ElectronicAccessAccordion extends AccordionInteractor {
  electronicAccess = new MultiColumnListInteractor('#section-electronic-access');
}

export class ItemDetailsAccordion extends AccordionSetInteractor {
  expandAllButton = new ExpandAllButtonInteractor('[data-test-expand-all-button]');
  adminDataAccordion = new AdministrativeDataAccordion('#administrative-data');
  itemDataAccordion = new ItemDataAccordion('#item-data');
  enumerationDataAccordion = new EnumerationDataAccordion('#enumeration-data');
  conditionAccordion = new ConditionAccordion('#item-condition');
  itemNotesAccordion = new ItemNotesAccordion('#item-notes');
  loanAndAvailabilityAccordion = new LoanAndAvailabilityAccordion('#item-loans');
  locationAccordion = new LocationAccordion('#item-location');
  electronicAccessAccordion = new ElectronicAccessAccordion('#item-electronic-access');
}
