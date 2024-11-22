import { OnBoardingWizardData } from '../../../core/onBoardingWizard/onBoardingWizard.types'
import { Subscription } from '../../../core/Subscription.types'
import {
  Organization, TenantSetting 
} from '../../../core/Tenant.types'

export interface IntTenantDomain {
    domainStatus: number
    tenantId: string 
    domainName: string 
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string
}

export interface GetTenantResponse {
    tenantId: string 
    tenantType: number 
    tenantStatus: number 
    organizationIdentifier: string 
    organizationName: string 
    isDemo: boolean
    enforceMfa: boolean 
    state: string 
    subscriptionsMigrated: boolean 
    subscriptions: Subscription[]
    domains: IntTenantDomain[]
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string 
    identityProviders: number[]
    onBoarding: OnBoardingWizardData
    organizations: Organization[]
    settings: TenantSetting[]
}

export interface UpdateTenantRespose {
    tenantId: string 
}