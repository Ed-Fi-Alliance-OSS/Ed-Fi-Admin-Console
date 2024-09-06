export interface EdFiSyncProfileResponse {
    jobId: string 
    connectionId: string 
}

export interface EdFiSyncUpdatedResponse {
    tenantId: string 
    jobId: string
}

export interface JobExecutionRequestedResponse {
    tenantId: string 
    jobId: string 
}