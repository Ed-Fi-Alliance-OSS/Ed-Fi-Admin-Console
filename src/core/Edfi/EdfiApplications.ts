export interface EdfiApplicationProfile {
  id: number
}

export interface EdfiApplication {
  id: number
  applicationName?: string
  claimSetName?: string
  educationOrganizationIds?: number[]
  odsInstanceIds?: Array<number>
  vendorId?: number
  profileIds?: Array<number>
}

export interface EdfiApplicationAuthData {
  id: number
  key?: string
  secret?: string
}