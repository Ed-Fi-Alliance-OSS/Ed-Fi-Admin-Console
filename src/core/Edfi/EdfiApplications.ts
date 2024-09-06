export interface EdfiApplicationProfile {
    id: number 
}

export interface EdfiApplication {
    applicationId: number
    applicationName?: string 
    claimSetName?: string 
    profileName?: string 
    educationOrganizationId?: string | number
    odsInstanceName?: string 
    vendorId?: number
    profiles?: EdfiApplicationProfile[]
}

export interface EdfiApplicationAuthData {
    applicationId: number 
    key?: string 
    secret?: string
}