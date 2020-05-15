export const FIND_ALL_CQL = 'cql.allRecords=1';

export const DEFAULT_FETCHER_UPDATE_INTERVAL = 5000;
export const DEFAULT_TIMEOUT_BEFORE_FILE_DELETION = 0;

export const STRING_CAPITALIZATION_MODES = {
  ALL: 0,
  FIRST: 1,
  WORDS: 2,
};

export const STRING_CAPITALIZATION_EXCLUSIONS = [
  'ID', 'HRID', 'MARC', 'ISBN', 'PO', 'TBD',
];

export const HTML_LANG_DIRECTIONS = {
  LEFT_TO_RIGHT: 'ltr',
  RIGHT_TO_LEFT: 'rtl',
};

export const SORT_TYPES = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
};

export const UPLOAD_DEFINITION_STATUSES = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  LOADED: 'LOADED',
};

export const FILE_STATUSES = {
  NEW: 'NEW',
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
  COMMITTED: 'COMMITTED',
  ERROR: 'ERROR',
  ERROR_DEFINITION: 'ERROR_DEFINITION',
  DELETING: 'DELETING',
  DISCARDED: 'DISCARDED',
};

export const JOB_STATUSES = {
  PREPARING_FOR_PREVIEW: 'PREPARING_FOR_PREVIEW',
  READY_FOR_PREVIEW: 'READY_FOR_PREVIEW',
  RUNNING: 'RUNNING',
};

export const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';
export const SYSTEM_USER_NAME = 'System';

export const DATA_TYPES = [
  'MARC',
  'Delimited',
  'EDIFACT',
];

export const LAYER_TYPES = {
  CREATE: 'create',
  EDIT: 'edit',
  DUPLICATE: 'duplicate',
};

export const ENTITY_KEYS = {
  FILE_EXTENSIONS: 'fileExtensions',
  JOB_PROFILES: 'jobProfiles',
  MATCH_PROFILES: 'matchProfiles',
  ACTION_PROFILES: 'actionProfiles',
  MAPPING_PROFILES: 'mappingProfiles',
};

export const PROFILE_TYPES = {
  JOB_PROFILE: 'JOB_PROFILE',
  MATCH_PROFILE: 'MATCH_PROFILE',
  ACTION_PROFILE: 'ACTION_PROFILE',
  MAPPING_PROFILE: 'MAPPING_PROFILE',
};

export const PROFILE_TYPES_FOR_URL = {
  jobProfiles: 'job-profiles',
  matchProfiles: 'match-profiles',
  actionProfiles: 'action-profiles',
  mappingProfiles: 'mapping-profiles',
};

export const ASSOCIATION_TYPES = {
  jobProfiles: 'JOB_PROFILE',
  matchProfiles: 'MATCH_PROFILE',
  actionProfiles: 'ACTION_PROFILE',
  mappingProfiles: 'MAPPING_PROFILE',
};

export const PROFILE_NAMES = {
  jobProfiles: 'job profile',
  matchProfiles: 'match profile',
  actionProfiles: 'action profile',
  mappingProfiles: 'field mapping profile',
  JOB_PROFILE: 'job profile',
  MATCH_PROFILE: 'match profile',
  ACTION_PROFILE: 'action profile',
  MAPPING_PROFILE: 'field mapping profile',
};

export const PROFILE_LABEL_IDS = {
  matchProfiles: 'ui-data-import.matchProfileName',
  actionProfiles: 'ui-data-import.actionProfileName',
  jobProfiles: 'ui-data-import.jobProfileName',
  mappingProfiles: 'ui-data-import.mappingProfileName',
};

export const LOG_VIEWER = {
  FILTER: {
    OPTIONS: {
      ALL: 0,
      INFO: 1,
      ERRORS: 2,
    },
  },
};

export const COMPARISON_PARTS = [
  {
    value: 'NUMERICS_ONLY',
    label: 'ui-data-import.match.comparison-part.numerics-only',
  }, {
    value: 'ALPHANUMERICS_ONLY',
    label: 'ui-data-import.match.comparison-part.alpha-numerics-only',
  },
];

export const QUALIFIER_TYPES = [
  {
    value: 'BEGINS_WITH',
    label: 'ui-data-import.match.qualifier.begins-with',
  }, {
    value: 'ENDS_WITH',
    label: 'ui-data-import.match.qualifier.ends-with',
  }, {
    value: 'CONTAINS',
    label: 'ui-data-import.match.qualifier.contains',
  },
];

export const CRITERION_TYPES = [
  {
    value: 'EXACTLY_MATCHES',
    label: 'ui-data-import.match.criterion-type.exactly-matches',
  }, {
    value: 'EXISTING_VALUE_CONTAINS_INCOMING_VALUE',
    label: 'ui-data-import.match.criterion-type.existing-contains-incoming',
  }, {
    value: 'INCOMING_VALUE_CONTAINS_EXISTING_VALUE',
    label: 'ui-data-import.match.criterion-type.incoming-contains-existing',
  }, {
    value: 'EXISTING_VALUE_BEGINS_WITH_INCOMING_VALUE',
    label: 'ui-data-import.match.criterion-type.existing-begins-with-incoming',
  }, {
    value: 'INCOMING_VALUE_BEGINS_WITH_EXISTING_VALUE',
    label: 'ui-data-import.match.criterion-type.incoming-begins-with-existing',
  }, {
    value: 'EXISTING_VALUE_ENDS_WITH_INCOMING_VALUE',
    label: 'ui-data-import.match.criterion-type.existing-ends-with-incoming',
  }, {
    value: 'INCOMING_VALUE_ENDS_WITH_EXISTING_VALUE',
    label: 'ui-data-import.match.criterion-type.incoming-ends-with-existing',
  },
];

export const VALUE_TYPES = [
  {
    value: 'VALUE_FROM_RECORD',
    label: 'ui-data-import.match.value-type.value-from-record',
  }, {
    value: 'STATIC_VALUE',
    label: 'ui-data-import.match.value-type.static-value',
  },
];

export const FORMS_SETTINGS = {
  [ENTITY_KEYS.MATCH_PROFILES]: {
    MATCHING: {
      QUALIFIER_TYPES: [
        'BEGINS_WITH',
        'ENDS_WITH',
        'CONTAINS',
      ],
      COMPARISON_PARTS: [
        'NUMERICS_ONLY',
        'ALPHANUMERICS_ONLY',
      ],
      CRITERION_TYPES: [
        'EXACTLY_MATCHES',
        'EXISTING_VALUE_CONTAINS_INCOMING_VALUE',
        'INCOMING_VALUE_CONTAINS_EXISTING_VALUE',
        'EXISTING_VALUE_BEGINS_WITH_INCOMING_VALUE',
        'INCOMING_VALUE_BEGINS_WITH_EXISTING_VALUE',
        'EXISTING_VALUE_ENDS_WITH_INCOMING_VALUE',
        'INCOMING_VALUE_ENDS_WITH_EXISTING_VALUE',
      ],
      VALUE_TYPES: [
        'VALUE_FROM_RECORD',
        'STATIC_VALUE',
      ],
      STATIC_VALUE_TYPES: [
        'TEXT',
        'NUMBER',
        'EXACT_DATE',
        'DATE_RANGE',
      ],
    },
  },
  [ENTITY_KEYS.MAPPING_PROFILES]: {
    DECORATORS: {
      REPEATABLE_ACTIONS: {
        EXTEND_EXISTING: 'ui-data-import.settings.mappingProfiles.map.wrapper.repeatableActions.extendExisting',
        DELETE_EXISTING: 'ui-data-import.settings.mappingProfiles.map.wrapper.repeatableActions.deleteExisting',
        EXCHANGE_EXISTING: 'ui-data-import.settings.mappingProfiles.map.wrapper.repeatableActions.exchangeExisting',
        DELETE_INCOMING: 'ui-data-import.settings.mappingProfiles.map.wrapper.repeatableActions.deleteIncoming',
      },
      DATE_PICKER: {
        TODAY: {
          value: 'TODAY',
          id: 'ui-data-import.settings.mappingProfiles.map.wrapper.acceptedValues.today',
        },
        CHOOSE_DATE: {
          value: 'CHOOSE_DATE',
          id: 'ui-data-import.settings.mappingProfiles.map.wrapper.acceptedValues.chooseDate',
        },
      },
      BOOLEAN_ACTIONS: [
        {
          label: 'ui-data-import.settings.mappingProfiles.map.administrativeData.field.markAllAffectedRecords',
          value: 'ALL_TRUE',
        },
        {
          label: 'ui-data-import.settings.mappingProfiles.map.administrativeData.field.unmarkAllAffectedRecords',
          value: 'ALL_FALSE',
        },
        {
          label: 'ui-data-import.settings.mappingProfiles.map.administrativeData.field.keepAllAffectedRecords',
          value: 'AS_IS',
        },
      ],
    },
  },
};

export const PROFILE_LINKING_RULES = {
  allowDelete: false,
  deleteRecursive: false,
  allowUnlink: true,
  unlinkRecursive: false,
  profilesAllowed: [
    ENTITY_KEYS.MATCH_PROFILES,
    ENTITY_KEYS.ACTION_PROFILES,
  ],
  columnsAllowed: {
    [ENTITY_KEYS.MATCH_PROFILES]: [
      'name',
      'match',
    ],
    [ENTITY_KEYS.ACTION_PROFILES]: [
      'name',
      'action',
      'mapping',
    ],
  },
  childrenAllowed: [ENTITY_KEYS.MATCH_PROFILES],
  siblingsProhibited: { [ENTITY_KEYS.ACTION_PROFILES]: [ENTITY_KEYS.MATCH_PROFILES] },
};

export const PROFILE_RELATION_TYPES = {
  NONE: null,
  MATCH: 'MATCH',
  NON_MATCH: 'NON_MATCH',
};

export const INSTANCE_RESOURCE_PATHS = [
  'raml-util/schemas/metadata.schema',
  'instance.json',
  'instancerelationship.json',
];

export const HOLDINGS_RESOURCE_PATHS = [
  'raml-util/schemas/metadata.schema',
  'holdingsrecord.json',
];

export const ITEM_RESOURCE_PATHS = [
  'raml-util/schemas/metadata.schema',
  'item.json',
];

export const ORDER_RESOURCE_PATHS = [
  'raml-util/schemas/metadata.schema',
  'acq-models/mod-orders-storage/schemas/purchase_order.json',
  'acq-models/mod-orders-storage/schemas/ongoing.json',
  'acq-models/mod-orders-storage/schemas/po_line.json',
  'acq-models/mod-orders-storage/schemas/details.json',
  'acq-models/mod-orders-storage/schemas/product_identifier.json',
  'acq-models/mod-orders-storage/schemas/contributor.json',
  'acq-models/mod-orders-storage/schemas/receiving_history.json',
  'acq-models/mod-orders-storage/schemas/cost.json',
  'acq-models/mod-orders-storage/schemas/fund_distribution.json',
  'acq-models/mod-orders-storage/schemas/location.json',
  'acq-models/mod-orders-storage/schemas/physical.json',
  'acq-models/mod-orders-storage/schemas/eresource.json',
  'acq-models/mod-orders-storage/schemas/vendor_detail.json',
];

export const NOTES_RESOURCE_PATHS = ['types/notes/note.json'];

export const INVOICE_RESOURCE_PATHS = [
  'raml-util/schemas/metadata.schema',
  'acq-models/mod-invoice-storage/schemas/invoice.json',
  'acq-models/mod-invoice-storage/schemas/adjustment.json',
  'acq-models/mod-invoice-storage/schemas/document_metadata.json',
  'acq-models/mod-invoice-storage/schemas/invoice_line.json',
  'acq-models/mod-invoice-storage/schemas/fund_distribution.json',
];

export const SRM_RESOURCE_PATHS = ['instance.json'];

export const FILTER_QUERY_PARAMS = {
  DEFAULT: 'cql.allRecords=1',
  NOT_STATIC_VALUE: 'cql.allRecords=1 NOT incomingRecordType=STATIC_VALUE',
};

export const ACTION_OPTIONS = [
  {
    value: 'ADD',
    label: 'ui-data-import.settings.mappingProfile.marcTable.action.add',
  }, {
    value: 'DELETE',
    label: 'ui-data-import.settings.mappingProfile.marcTable.action.delete',
  }, {
    value: 'EDIT',
    label: 'ui-data-import.settings.mappingProfile.marcTable.action.edit',
  }, {
    value: 'MOVE',
    label: 'ui-data-import.settings.mappingProfile.marcTable.action.move',
  },
];

export const SUBACTION_OPTIONS = [
  {
    value: 'ADD_SUBFIELD',
    label: 'ui-data-import.settings.mappingProfile.marcTable.subaction.addSubfield',
  }, {
    value: 'INSERT',
    label: 'ui-data-import.settings.mappingProfile.marcTable.subaction.insert',
  }, {
    value: 'REMOVE',
    label: 'ui-data-import.settings.mappingProfile.marcTable.subaction.remove',
  }, {
    value: 'REPLACE',
    label: 'ui-data-import.settings.mappingProfile.marcTable.subaction.replace',
  }, {
    value: 'NEW',
    label: 'ui-data-import.settings.mappingProfile.marcTable.subaction.newField',
  }, {
    value: 'EXISTING',
    label: 'ui-data-import.settings.mappingProfile.marcTable.subaction.existingField',
  },
];

export const POSITION_OPTIONS = [
  {
    value: 'BEFORE',
    label: 'ui-data-import.settings.mappingProfile.marcTable.position.before',
  }, {
    value: 'AFTER',
    label: 'ui-data-import.settings.mappingProfile.marcTable.position.after',
  },
];

export const MARC_TABLE_CONFIG = {
  allowedSubactions: {
    ADD: ['ADD_SUBFIELD'],
    DELETE: [],
    EDIT: ['INSERT', 'REMOVE', 'REPLACE'],
    MOVE: ['NEW', 'EXISTING'],
  },
  allowedPositions: { EDIT: { INSERT: ['BEFORE', 'AFTER'] } },
  hasDataField: {
    ADD: true,
    DELETE: false,
    EDIT: true,
    MOVE: true,
  },
};
