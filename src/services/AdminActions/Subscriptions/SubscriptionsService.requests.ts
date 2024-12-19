import {
  LicenseType, SubscriptionStatus 
} from '../../../core/Subscription.types'

export interface GetSubscriptionsListRequest {
    pageIndex: number 
    pageSize: number 
    orderBy?: string 
    filter?: string
}

export interface AddSubscriptionRequest {
    tenantId: string 
    applicationId: string 
    startDateTime: string 
    endDateTime: string 
    gracePeriod: number 
    numberOfLicenses: number 
    assignedLicenses: number
    autoAssign: boolean 
    licenseType: LicenseType
    subscriptionStatus: SubscriptionStatus
}

export interface UpdateSubscriptionRequest {
    tenantId: string
    subscriptionId: string
    startDateTime: string
    endDateTime: string
    gracePeriod: number 
    numberOfLicenses: number 
    autoAssign: boolean
    licenseType: LicenseType
}