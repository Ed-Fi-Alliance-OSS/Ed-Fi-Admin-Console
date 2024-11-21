import {
  JobExecutionListResponse, JobListResponse 
} from '../../../core/UserSync/UserSync.types'

const executionInitialData: JobExecutionListResponse = {
  tenantId: '', 
  jobId: '', 
  applicationId: '',
  jobExecutionId: '',
  jobExecutionStatus: 0,
  jobExecutionStartDateTime: '', 
  jobExecutionEndDateTime: '',
  childJobs: [],
  metrics: []
}

const edfiSyncJobInitialData: JobListResponse = {
  tenantId: '',
  jobId: '',
  name: '',
  jobTypeId: '',
  jobTypeName: '',
  sourceConnectionId: '',
  destinationConnectionId: '',
  profileId: '',
  applicationId: '',
  schedule: {
    beginDate: '',
    enabled: false,
    endDate: '',
    cron: '',
    timeZone: ''
  },
  jobStatus: 0,
  jobExecutionId: '',
  jobExecutionStatus: 0,
  jobExecutionStartDateTime: '',
  jobExecutionEndDateTime: '',
  metrics: [],
  ChildJobs: [],
  createdBy: '',
  createdDateTime: '',
  lastModifiedBy: '',
  lastModifiedDateTime: '',
}

export {
  edfiSyncJobInitialData,
  executionInitialData
}