const INSTANCE = {
  name: 'instance',
  recordType: 'INSTANCE',
  /* mapActions: {
    fieldTypeBool: ['ALL_TRUE', 'ALL_FALSE', 'AS_IS', 'IGNORE'],
    fieldTypeRepeateble: ['EXTEND_EXISTING', 'DELETE_EXISTING', 'EXCHANGE_EXISTING', 'DELETE_INCOMING'],
  }, */
  mappingFields: [{
    name: 'discoverySuppress',
    enabled: true,
    path: 'instance.discoverySuppress',
    value: '',
    subfields: [],
    booleanFieldAction: 'AS_IS',
  }, {
    name: 'staffSuppress',
    enabled: true,
    path: 'instance.staffSuppress',
    value: '',
    subfields: [],
  }, {
    name: 'previouslyHeld',
    enabled: true,
    path: 'instance.previouslyHeld',
    value: '',
    subfields: [],
    booleanFieldAction: 'AS_IS',
  }, {
    name: 'hrid',
    enabled: false,
    path: 'instance.hrid',
    value: '',
    subfields: [],
  }, {
    name: 'source',
    enabled: false,
    path: 'instance.source',
    value: '',
    subfields: [],
  }, {
    name: 'catalogedDate',
    enabled: true,
    path: 'instance.catalogedDate',
    value: '',
    subfields: [],
  }, {
    name: 'statusId',
    enabled: true,
    path: 'instance.statusId',
    value: '',
    subfields: [],
  }, {
    name: 'modeOfIssuanceId',
    enabled: false,
    path: 'instance.modeOfIssuanceId',
    value: '',
    subfields: [],
  }, {
    name: 'statisticalCodeIds',
    enabled: true,
    path: 'instance.statisticalCodeIds',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.statisticalCodeIds[]',
      fields: [{
        // order: 0,
        name: 'statisticalCodeId',
        enabled: true,
        path: 'instance.statisticalCodeIds[].statisticalCodeId',
        value: '',
      }],
    }],
  }, {
    name: 'title',
    enabled: false,
    path: 'instance.title',
    value: '',
    subfields: [],
  }, {
    name: 'alternativeTitles',
    enabled: false,
    path: 'instance.alternativeTitles',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.alternativeTitles[]',
      fields: [{
        // order: 0,
        name: 'alternativeTitleTypeId',
        enabled: false,
        path: 'instance.alternativeTitles[].alternativeTitleTypeId',
        value: '',
      }, {
        // order: 1,
        name: 'alternativeTitle',
        enabled: false,
        path: 'instance.alternativeTitles[].alternativeTitle',
        value: '',
      }],
    }],
  }, {
    name: 'indexTitle',
    enabled: false,
    path: 'instance.indexTitle',
    value: '',
    subfields: [],
  }, {
    name: 'series',
    enabled: false,
    path: 'instance.series',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.series[]',
      fields: [{
        // order: 0,
        name: 'source',
        enabled: false,
        path: 'instance.series[].series',
        value: '',
      }],
    }],
  }, {
    name: 'precedingTitles',
    enabled: true,
    path: 'instance.precedingTitles',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.precedingTitles[]',
      fields: [{
        // order: 0,
        name: 'precedingInstanceId',
        enabled: true,
        path: 'instance.precedingTitles[].precedingInstanceId',
        value: '',
      }],
    }],
  }, {
    name: 'succeedingTitles',
    enabled: true,
    path: 'instance.succeedingTitles',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.succeedingTitles[]',
      fields: [{
        // order: 0,
        name: 'succeedingInstanceId',
        enabled: true,
        path: 'instance.succeedingTitles[].succeedingInstanceId',
        value: '',
      }],
    }],
  }, {
    name: 'identifiers',
    enabled: false,
    path: 'instance.identifiers',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.identifiers[]',
      fields: [{
        // order: 0,
        name: 'identifierTypeId',
        enabled: false,
        path: 'instance.identifiers[].identifierTypeId',
        value: '',
      }, {
        // order: 1,
        name: 'value',
        enabled: false,
        path: 'instance.identifiers[].value',
        value: '',
      }],
    }],
  }, {
    name: 'contributors',
    enabled: false,
    path: 'instance.contributors',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.contributors[]',
      fields: [{
        // order: 0,
        name: 'contributorNameTypeId',
        enabled: false,
        path: 'instance.contributors[].contributorName',
        value: '',
      }, {
        // order: 0,
        name: 'contributorNameTypeId',
        enabled: false,
        path: 'instance.contributors[].contributorNameTypeId',
        value: '',
      }, {
        // order: 1,
        name: 'contributorTypeId',
        enabled: false,
        path: 'instance.contributors[].contributorTypeId',
        value: '',
      }, {
        // order: 2,
        name: 'contributorTypeText',
        enabled: false,
        path: 'instance.contributors[].contributorTypetext',
        value: '',
      }, {
        // order: 3,
        name: 'primary',
        enabled: false,
        path: 'instance.contributors[].primary',
        value: '',
        booleanFieldAction: 'AS_IS',
      }],
    }],
  }, {
    name: 'publication',
    enabled: false,
    path: 'instance.publication',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.publication[]',
      fields: [{
        // order: 0,
        name: 'publisher',
        enabled: false,
        path: 'instance.publication[].publisher',
        value: '',
      }, {
        // order: 1,
        name: 'role',
        enabled: false,
        path: 'instance.publication[].role',
        value: '',
      }, {
        // order: 2,
        name: 'place',
        enabled: false,
        path: 'instance.publication[].place',
        value: '',
      }, {
        // order: 3,
        name: 'dateOfPublication',
        enabled: false,
        path: 'instance.publication[].dateOfPublication',
        value: '',
      }],
    }],
  }, {
    name: 'editions',
    enabled: false,
    path: 'instance.editions',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.editions[]',
      fields: [{
        // order: 0,
        name: 'edition',
        enabled: false,
        path: 'instance.editions[].edition',
        value: '',
      }],
    }],
  }, {
    name: 'physicalDescriptions',
    enabled: false,
    path: 'instance.physicalDescriptions',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.physicalDescriptions[]',
      fields: [{
        // order: 0,
        name: 'physicalDescription',
        enabled: false,
        path: 'instance.physicalDescriptions[].physicalDescription',
        value: '',
      }],
    }],
  }, {
    name: 'instanceTypeId',
    enabled: false,
    path: 'instance.instanceTypeId',
    value: '',
    subfields: [],
  }, {
    name: 'natureOfContentTermIds',
    enabled: true,
    path: 'instance.natureOfContentTermIds',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.natureOfContentTermIds[]',
      fields: [{
        // order: 0,
        name: 'natureOfContentTermsId',
        enabled: true,
        path: 'instance.natureOfContentTermIds[].natureOfContentTermId',
        value: '',
      }],
    }],
  }, {
    name: 'instanceFormatIds',
    enabled: false,
    path: 'instance.instanceFormatIds',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.instanceFormatIds[]',
      fields: [{
        // order: 0,
        name: 'instanceFormatId',
        enabled: false,
        path: 'instance.instanceFormatIds[].instanceFormatId',
        value: '',
      }],
    }],
  }, {
    name: 'languages',
    enabled: false,
    path: 'instance.languages',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.languages[]',
      fields: [{
        // order: 0,
        name: 'languageId',
        enabled: false,
        path: 'instance.languages[].languageId',
        value: '',
      }],
    }],
  }, {
    name: 'publicationFrequency',
    enabled: false,
    path: 'instance.publicationFrequency',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.publicationFrequency[]',
      fields: [{
        // order: 0,
        name: 'publicationFrequency',
        enabled: false,
        path: 'instance.publicationFrequency[].publicationFrequency',
        value: '',
      }],
    }],
  }, {
    name: 'publicationRange',
    enabled: false,
    path: 'instance.publicationRange',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.publicationRange[]',
      fields: [{
        // order: 0,
        name: 'publicationRange',
        enabled: false,
        path: 'instance.publicationRange[].publicationRange',
        value: '',
      }],
    }],
  }, {
    name: 'notes',
    enabled: false,
    path: 'instance.notes',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.notes[]',
      fields: [{
        // order: 0,
        name: 'noteType',
        enabled: false,
        path: 'instance.notes[].noteType',
        value: '',
      }, {
        // order: 1,
        name: 'note',
        enabled: false,
        path: 'instance.notes[].note',
        value: '',
      }, {
        // order: 2,
        name: 'staffOnly',
        enabled: false,
        path: 'instance.notes[].staffOnly',
        value: null,
        booleanFieldAction: 'AS_IS',
      }],
    }],
  }, {
    name: 'electronicAccess',
    enabled: false,
    path: 'instance.electronicAccess',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.electronicAccess[]',
      fields: [{
        // order: 0,
        name: 'relationshipId',
        enabled: false,
        path: 'instance.electronicAccess[].relationshipId',
        value: '',
      }, {
        // order: 1,
        name: 'uri',
        enabled: false,
        path: 'instance.electronicAccess[].uri',
        value: '',
      }, {
        // order: 2,
        name: 'linkText',
        enabled: false,
        path: 'instance.electronicAccess[].linkText',
        value: '',
      }, {
        // order: 3,
        name: 'materialsSpecification',
        enabled: false,
        path: 'instance.electronicAccess[].materialsSpecification',
        value: '',
      }, {
        // order: 4,
        name: 'publicNote',
        enabled: false,
        path: 'instance.electronicAccess[].publicNote',
        value: '',
      }],
    }],
  }, {
    name: 'subjects',
    enabled: false,
    path: 'instance.subjects',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.subjects[]',
      fields: [{
        // order: 0,
        name: 'subject',
        enabled: false,
        path: 'instance.subjects[].subject',
        value: '',
      }],
    }],
  }, {
    name: 'classifications',
    enabled: false,
    path: 'instance.classifications',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.classifications[]',
      fields: [{
        // order: 0,
        name: 'classificationTypeId',
        enabled: false,
        path: 'instance.classifications[].classificationTypeId',
        value: '',
      }, {
        // order: 1,
        name: 'classificationNumber',
        enabled: false,
        path: 'instance.classifications[].classificationNumber',
        value: '',
      }],
    }],
  }, {
    name: 'parentInstances',
    enabled: true,
    path: 'instance.parentInstances',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.parentInstances[]',
      fields: [{
        // order: 0,
        name: 'superInstanceId',
        enabled: true,
        path: 'instance.parentInstances[].superInstanceId',
        value: '',
      }, {
        // order: 1,
        name: 'instanceRelationshipTypeId',
        enabled: true,
        path: 'instance.parentInstances[].instanceRelationshipTypeId',
        value: '',
      }],
    }],
  }, {
    name: 'childInstances',
    enabled: true,
    path: 'instance.childInstances',
    value: '',
    subfields: [{
      order: 0,
      path: 'instance.childInstances[]',
      fields: [{
        // order: 0,
        name: 'subInstanceId',
        enabled: true,
        path: 'instance.childInstances[].subInstanceId',
        value: '',
      }, {
        // order: 1,
        name: 'instanceRelationshipTypeId',
        enabled: true,
        path: 'instance.childInstances[].instanceRelationshipTypeId',
        value: '',
      }],
    }],
  }],
};

export default INSTANCE;
