export const DEFAULT_FETCHER_UPDATE_INTERVAL = 5000;
export const DEFAULT_TIMEOUT_BEFORE_FILE_DELETION = 0;

export const STRING_CAPITALIZATION_MODES = {
  ALL: 0,
  FIRST: 1,
  WORDS: 2,
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
  ERROR: 'ERROR',
  ERROR_DEFINITION: 'ERROR_DEFINITION',
  DELETING: 'DELETING',
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

export const ENTITY_CONFIGS = {
  MATCH_PROFILES: {
    RECORD_TYPES: {
      ORDER: {
        caption: 'Order',
        icon: 'orders',
      },
      INVOICE: {
        caption: 'Invoice',
        icon: 'invoices',
      },
      ITEM: {
        caption: 'Item',
        icon: 'items',
      },
      INSTANCE: {
        caption: 'Instance',
        icon: 'instances',
      },
      HOLDINGS: {
        caption: 'Holdings',
        icon: 'holdings',
      },
      MARC_BIBLIOGRAPHIC: {
        caption: 'MARC Bibliographic',
        icon: 'marcBibs',
      },
      MARC_AUTHORITY: {
        caption: 'MARC Authority',
        icon: 'marcAuthorities',
      },
      MARC_HOLDINGS: {
        caption: 'MARC Holdings',
        icon: 'marcHoldings',
      },
    },
  },
};
