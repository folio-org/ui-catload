import {
  PREPARING_FOR_PREVIEW,
  READY_FOR_PREVIEW,
  RUNNING,
} from '../../../src/components/Jobs/jobStatuses';

const previewJobs = [
  {
    id: '469eba83-41d1-4161-bd1a-0f46d8764c6a',
    hrId: '199482989',
    jobProfileName: 'Main bib jobs (MARC)',
    fileName: 'import_1.mrc',
    runBy: {
      firstName: 'Marie',
      lastName: 'Curie',
    },
    progress: {
      current: 23,
      total: 33,
    },
    startedDate: '2018-11-20T14:50:44.000',
    uiStatus: PREPARING_FOR_PREVIEW,
  },
  {
    id: '469eba83-41d1-4161-bd1a-0f46d876477t',
    hrId: '182982110',
    jobProfileName: 'Library indexing',
    fileName: 'import_1.mrc',
    runBy: {
      firstName: 'Marie',
      lastName: 'Doe',
    },
    progress: {
      current: 43,
      total: 70,
    },
    startedDate: '2018-11-20T13:42:44.000',
    uiStatus: PREPARING_FOR_PREVIEW,
  },
  {
    id: '469eba83-41d1-4161-bd1a-0f46d342177e',
    hrId: '182982111',
    jobProfileName: 'Indexing',
    fileName: 'import_1.mrc',
    runBy: {
      firstName: 'Marie',
      lastName: 'Edwards',
    },
    progress: {
      current: 13,
      total: 33,
    },
    startedDate: '2018-11-20T13:11:49.000',
    uiStatus: PREPARING_FOR_PREVIEW,
  },
  {
    id: '469eba83-41d1-4161-bd1a-0f46d866177d',
    hrId: '182982930',
    jobProfileName: 'Library indexing',
    fileName: 'import_1.mrc',
    runBy: {
      firstName: 'Oliver',
      lastName: 'Clarke',
    },
    progress: {
      current: 33,
      total: 33,
    },
    startedDate: '2018-11-20T13:11:49.000',
    completedDate: '2018-11-20T22:31:34.000',
    uiStatus: READY_FOR_PREVIEW,
  },
  {
    id: '469eba83-41d1-4161-bd1a-0f46d86999pd',
    hrId: '182982220',
    jobProfileName: 'BIB Import from Boston',
    fileName: 'import_1.mrc',
    runBy: {
      firstName: 'Taylor',
      lastName: 'Clarke',
    },
    progress: {
      current: 5000,
      total: 5000,
    },
    startedDate: '2018-11-20T14:13:49.000',
    completedDate: '2018-11-20T20:51:34.000',
    uiStatus: READY_FOR_PREVIEW,
  },
];

const runningJobs = [
  {
    id: '469eba83-41d1-4161-bd1a-0f46d5554c6a',
    hrId: '182982989',
    jobProfileName: 'Main bib jobs',
    fileName: 'import_1.mrc',
    runBy: {
      firstName: 'Mark',
      lastName: 'Curie',
    },
    progress: {
      current: 290,
      total: 500,
    },
    startedDate: '2018-11-22T12:00:31.000',
    uiStatus: RUNNING,
  },
  {
    id: '469eba83-41d1-4161-bd1a-0f46d555499u',
    hrId: '182983328',
    jobProfileName: 'Main bib indexing',
    fileName: 'import_1.mrc',
    runBy: {
      firstName: 'Mark',
      lastName: 'Doe',
    },
    progress: {
      current: 480,
      total: 900,
    },
    startedDate: '2018-11-23T16:40:31.000',
    uiStatus: RUNNING,
  },
  {
    id: '469eba83-41d1-4161-bd1a-0f46d555112p',
    hrId: '182983990',
    jobProfileName: 'Authority updates',
    fileName: 'import_1.mrc',
    runBy: {
      firstName: 'Mark',
      lastName: 'Jones',
    },
    progress: {
      current: 1790,
      total: 2400,
    },
    startedDate: '2018-11-23T17:50:31.000',
    uiStatus: RUNNING,
  },
];

export const jobExecutionDtos = [...previewJobs, ...runningJobs];

export const PREVIEW_JOBS_LENGTH = previewJobs.length;

export const RUNNING_JOBS_LENGTH = runningJobs.length;
