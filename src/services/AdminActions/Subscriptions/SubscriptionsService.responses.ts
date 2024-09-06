export interface ApiResponseApplicationRoles {
    roleName?: string 
    isDefault: boolean 
    isAvailableForTenants: boolean
}

export interface ApiResponseSubscription {
    tenantId: string 
    subscriptionId: string 
    applicationId: string 
    applicationName: string 
    applicationRoles: ApiResponseApplicationRoles[]
    startDateTime: string 
    endDateTime: string 
    actualEndDateTime: string 
    gracePeriod: number 
    numberOfLicenses: number 
    assignedLicenses: number 
    maxAssignedLicenses: number 
    lastMaxAssignedLicensesDateTime: string 
    licenseType: number
    subscriptionStatus: number 
    autoAssign: boolean 
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string 
}

export interface GetSubscriptionsListResponse {
    count: number 
    pageSize: number 
    pageIndex: number 
    data: ApiResponseSubscription[]
}

export interface AddSubscriptionResponse {
    tenantId: string 
    subscriptionId: string 
    applicationId: string 
}

export interface UpdateSubscriptionResponse {
    tenantId: string 
    subscriptionId: string 
}