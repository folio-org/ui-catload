const MARC_BIBLIOGRAPHIC = {
  name: 'marcBib',
  recordType: 'MARC_BIBLIOGRAPHIC',
  mappingFields: [{
    name: 'discoverySuppress',
    enabled: true,
    path: 'marcBib.discoverySuppress',
    value: null,
    booleanFieldAction: 'IGNORE',
    subfields: [],
  }, {
    name: 'hrid',
    enabled: true,
    path: 'marcBib.hrid',
    value: '',
    subfields: [],
  }],
};

export default MARC_BIBLIOGRAPHIC;
