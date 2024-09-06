export interface JobListResponse {
    tenantId: string
    jobId: string
    name: string
    jobTypeId: string
    jobTypeName: string
    sourceConnectionId: string
    destinationConnectionId: string
    profileId: string
    applicationId: string
    schedule: Schedule
    jobStatus: number
    jobExecutionId: string
    jobExecutionStatus: number
    jobExecutionStartDateTime: string
    jobExecutionEndDateTime: string
    metrics: Metric[]
    ChildJobs: ChildJob[]
    createdBy: string
    createdDateTime: string
    lastModifiedBy: string
    lastModifiedDateTime: string
}

export interface JobProfile {
    tenantId: string
	jobId: string
	name: string
	jobTypeId: string
	jobTypeName: string
	sourceConnectionId: string 
	destinationConnectionId: string
	profileId: string
	profileName: string
	applicationId: string
	jobPoints: number
	dataRefreshType: DataRefreshType
	dataRefreshSpecificDate: string
	maxApiFailure: number
	maxApiRetry: number
	jobCompleteCallbackUrl: string;
	jobMetadata: JobMetadata[]
	schedule: Schedule
	notificationEmails: string[]
	jobStatus: JobStatus
	jobExecutionId: string
	jobExecutionStatus: JobExecutionStatus
	jobExecutionStartDateTime: string
	jobExecutionEndDateTime: string 
	metrics: Metric[]
	ChildJobs: ChildJob[]
	createdBy: string
	createdDateTime: string
	lastModifiedBy: string
	lastModifiedDateTime: string
}

export type JobStatus = "Unknown" | "Active" | "Deactivated" | "QUEUED_FOR_DELETE" | "QUEUED_FOR_SCHEDULE_RESTART"

export interface JobExecutionListResponse {
    tenantId: string 
    jobId: string 
    applicationId: string 
    jobExecutionId: string 
    jobExecutionStatus: number 
    jobExecutionStartDateTime: string 
    jobExecutionEndDateTime: string 
    childJobs: ChildJob[]
    metrics: Metric[]
}

export type JobExecutionStatus = "Unknown" | "Queued" | "Running" | "Completed" | "Completed with errors" | "Cancelled" | "Error"

export interface ChildJob {
	jobId: string
    jobExecutionId: string 
	childJobId: string
	childJobName: string 
	jobExecutionStatus: number
	jobExecutionStartDateTime: string 
	jobExecutionEndDateTime: string
	metrics: Metric[]
}

export interface Metric {
	entity: string 
	processed: number 
	success: number 
	errors: number
}

export interface ConnectionMetadata {
    code: string 
    value: string 
    isSecret: boolean 
}

export interface JobMetadata {
    code: string 
    value: string 
}

export interface Schedule {
    enabled: boolean
	beginDate: string | null
	endDate: string | null
	cron: string 
	timeZone: string 
}

export type DataRefreshType = 'Unknown' | "Full" | "Deltasincelastjobexecution" | "Deltasincespecificdatetime"

export interface JobExecutionLogEntry {
    tenantId: string 
    jobId: string 
    jobExecutionId: string 
    message: string 
    messageType: number 
    loggedDateTime: string 
    errorCode?: string 
}

export type MessageType = "Information" | "Warning" | "Sync Error" | "Fatal Error"

export interface ProviderListResponse {
    providerId: string
    name: string
    description: string
    iconUri: string
    connectionTypes: ConnectionType[]
    createdBy: string
    createdDateTime: string
    lastModifiedBy: string
    lastModifiedDateTime: string
}

export interface ConnectionType {
    providerId: string
	connectionTypeId: string
	name: string
	description: string
	documentationUri: string
	connectionMetadataFields: ConnectionMetadataField[]
}

export interface ConnectionMetadataField {
    tab: string
    code: string
    label: string
    validation: string
    order: string
	display: boolean 
    defaultValue: string
    type: string
    values: string
    api: string
	isSecret: boolean
}

export interface ConnectionCreatedResponse {
    tenantId: string 
    connectionId: string 
}