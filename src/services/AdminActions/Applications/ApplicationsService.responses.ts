export interface Application {
    tenantId: string 
    applicationId: string 
    applicationName: string 
}

export interface GetTenantApplicationsResponse {
    pageIndex: number 
    pageSize: number 
    count: number 
    data: Application[]
}