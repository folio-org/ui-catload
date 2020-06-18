const HOLDINGS = {
  name: 'holdings',
  recordType: 'HOLDINGS',
  mappingFields: [{
    name: 'discoverySuppress',
    enabled: true,
    path: 'holdings.discoverySuppress',
    value: '',
    subfields: [],
    booleanFieldAction: 'IGNORE',
  }, {
    name: 'hrid',
    enabled: false,
    path: 'holdings.discoverySuppress',
    value: '',
    subfields: [],
  }, {
    name: 'formerIds',
    enabled: true,
    path: 'holdings.formerIds',
    value: '',
    subfields: [{
      order: 0,
      path: 'holdings.formerIds[]',
      fields: [{
        name: 'formerId',
        enabled: true,
        path: 'holdings.formerIds[].formerId',
        value: '',
      }],
    }],
  }, {
    name: 'holdingsTypeId',
    enabled: false,
    path: 'holdings.holdingsTypeId',
    value: '',
    subfields: [],
  }, {
    name: 'statisticalCodeIds',
    enabled: true,
    path: 'holdings.statisticalCodeIds',
    value: '',
    subfields: [{
      order: 0,
      path: 'holdings.statisticalCodeIds[]',
      fields: [{
        name: 'statisticalCodeId',
        enabled: true,
        path: 'holdings.statisticalCodeIds[].statisticalCodeId',
        value: '',
      }],
    }],
  }, {
    name: 'permanentLocationId',
    enabled: true,
    path: 'holdings.permanentLocationId',
    value: '',
    subfields: [],
  }, {
    name: 'temporaryLocationId',
    enabled: true,
    path: 'holdings.temporaryLocationId',
    value: '',
    subfields: [],
  }, {
    name: 'shelvingOrder',
    enabled: true,
    path: 'holdings.shelvingOrder',
    value: '',
    subfields: [],
  }, {
    name: 'shelvingTitle',
    enabled: true,
    path: 'holdings.shelvingTitle',
    value: '',
    subfields: [],
  }, {
    name: 'copyNumber',
    enabled: true,
    path: 'holdings.copyNumber',
    value: '',
    subfields: [],
  }, {
    name: 'callNumberTypeId',
    enabled: true,
    path: 'holdings.callNumberTypeId',
    value: '',
    subfields: [],
  }, {
    name: 'callNumberPrefix',
    enabled: true,
    path: 'holdings.callNumberPrefix',
    value: '',
    subfields: [],
  }, {
    name: 'callNumber',
    enabled: true,
    path: 'holdings.callNumber',
    value: '',
    subfields: [],
  }, {
    name: 'callNumberSuffix',
    enabled: true,
    path: 'holdings.callNumberSuffix',
    value: '',
    subfields: [],
  }, {
    name: 'numberOfItems',
    enabled: true,
    path: 'holdings.numberOfItems',
    value: '',
    subfields: [],
  }, {
    name: 'holdingStatements',
    enabled: true,
    path: 'holdings.holdingStatements',
    value: '',
    subfields: [{
      order: 0,
      path: 'holdings.holdingStatements[]',
      fields: [{
        name: 'statement',
        enabled: true,
        path: 'holdings.holdingStatements[].statement',
        value: '',
      }, {
        name: 'note',
        enabled: true,
        path: 'holdings.holdingStatements[].note',
        value: '',
      }],
    }],
  }, {
    name: 'holdingStatementsForSupplements',
    enabled: true,
    path: 'holdings.holdingStatementsForSupplements',
    value: '',
    subfields: [{
      order: 0,
      path: 'holdings.holdingStatementsForSupplements[]',
      fields: [{
        name: 'statement',
        enabled: true,
        path: 'holdings.holdingStatementsForSupplements[].statement',
        value: '',
      }, {
        name: 'note',
        enabled: true,
        path: 'holdings.holdingStatementsForSupplements[].note',
        value: '',
      }],
    }],
  }, {
    name: 'holdingStatementsForIndexes',
    enabled: true,
    path: 'holdings.holdingStatementsForIndexes',
    value: '',
    subfields: [{
      order: 0,
      path: 'holdings.holdingStatementsForIndexes[]',
      fields: [{
        name: 'statement',
        enabled: true,
        path: 'holdings.holdingStatementsForIndexes[].statement',
        value: '',
      }, {
        name: 'note',
        enabled: true,
        path: 'holdings.holdingStatementsForIndexes[].note',
        value: '',
      }],
    }],
  }, {
    name: 'illPolicyId',
    enabled: true,
    path: 'holdings.illPolicyId',
    value: '',
    subfields: [],
  }, {
    name: 'digitalizationPolicy',
    enabled: true,
    path: 'holdings.digitalizationPolicy',
    value: '',
    subfields: [],
  }, {
    name: 'retentionPolicy',
    enabled: true,
    path: 'holdings.retentionPolicy',
    value: '',
    subfields: [],
  }, {
    name: 'notes',
    enabled: true,
    path: 'holdings.notes',
    value: '',
    subfields: [{
      order: 0,
      path: 'holdings.notes[]',
      fields: [{
        name: 'noteType',
        enabled: true,
        path: 'holdings.notes[].noteType',
        value: '',
      }, {
        name: 'note',
        enabled: true,
        path: 'holdings.notes[].note',
        value: '',
      }, {
        name: 'staffOnly',
        enabled: true,
        path: 'holdings.notes[].staffOnly',
        value: null,
        booleanFieldAction: 'IGNORE',
      }],
    }],
  }, {
    name: 'electronicAccess',
    enabled: true,
    path: 'holdings.electronicAccess',
    value: '',
    subfields: [{
      order: 0,
      path: 'holdings.electronicAccess[]',
      fields: [{
        name: 'relationshipId',
        enabled: true,
        path: 'holdings.electronicAccess[].relationshipId',
        value: '',
      }, {
        name: 'uri',
        enabled: true,
        path: 'holdings.electronicAccess[].uri',
        value: '',
      }, {
        name: 'linkText',
        enabled: true,
        path: 'holdings.electronicAccess[].linkText',
        value: '',
      }, {
        name: 'materialsSpecification',
        enabled: true,
        path: 'holdings.electronicAccess[].materialsSpecification',
        value: '',
      }, {
        name: 'publicNote',
        enabled: true,
        path: 'holdings.electronicAccess[].publicNote',
        value: '',
      }],
    }],
  }, {
    name: 'acquisitionMethod',
    enabled: true,
    path: 'holdings.acquisitionMethod',
    value: '',
    subfields: [],
  }, {
    name: 'acquisitionFormat',
    enabled: true,
    path: 'holdings.acquisitionFormat',
    value: '',
    subfields: [],
  }, {
    name: 'receiptStatus',
    enabled: true,
    path: 'holdings.receiptStatus',
    value: '',
    subfields: [],
  }, {
    name: 'receivingHistory.entries',
    enabled: true,
    path: 'holdings.receivingHistory.entries',
    value: '',
    subfields: [{
      order: 0,
      path: 'holdings.receivingHistory.entries[]',
      fields: [{
        name: 'publicDisplay',
        enabled: true,
        path: 'holdings.receivingHistory.entries[].publicDisplay',
        value: null,
        booleanFieldAction: 'IGNORE',
      }, {
        name: 'enumeration',
        enabled: true,
        path: 'holdings.receivingHistory.entries[].enumeration',
        value: '',
      }, {
        name: 'chronology',
        enabled: true,
        path: 'holdings.receivingHistory.entries[].chronology',
        value: '',
      }],
    }],
  }],
};

export default HOLDINGS;
