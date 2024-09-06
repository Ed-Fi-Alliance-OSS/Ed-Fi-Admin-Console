export interface UserEducationOrganizationData {
    educationOrganizationId: number | string
    shortNameOfInstitution: string
    nameOfInstitution: string
    staffClassifications: string[]
    source: string
}

export interface UserEducationOrganization {
    pageIndex: number
    pageSize: number
    count: number
    data: UserEducationOrganizationData[]
}