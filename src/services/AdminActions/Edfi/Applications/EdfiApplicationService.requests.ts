export interface CreateEdfiApplicationRequest {
    applicationName: string
    vendorId: number 
    claimSetName: string 
    profileId?: number 
    educationOrganizationIds: Array<number>
    odsInstanceIds?: Array<number>
}

export interface DeleteEdfiApplicationRequest {
    applicationId: string
}

export interface UpdateEdfiApplicationRequest {
    applicationName: string
    vendorId: number 
    claimSetName: string 
    profileId?: number 
    educationOrganizationIds: Array<number>
}

export interface ResetEdfiApplicationCredentialsRequest {
    applicationId: string
}