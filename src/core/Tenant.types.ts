import { OnBoardingWizardData } from './onBoardingWizard/onBoardingWizard.types'
import { Subscription } from './Subscription.types'

export interface Organization {
    identifierType: string 
    identifierValue: string 
    discriminator: string
    source: string 
    includeInJwt: boolean 
    shortNameOfInstitution: string
    nameOfInstitution: string
}

export interface StaffClassificationLicense {
    applicationId:string
    licenseStatus:string
    roles: string[]
}

export interface StaffClassification {
   id: string
   createdBy: string
   createdDateTime: string
   lastModifiedBy: string
   lastModifiedDateTime: string
   isDeleted: true
   tenantId: string
   varNamespace: string
   codeValue: string
   shortDescription: string
   description: string
   licenses: StaffClassificationLicense[]
}

export type TenantType = 
    'Unknown' | 
    'Internal' | 
    'State' | 
    'Collaborative' | 
    'District' | 
    'Vendor' |
    'Teacher' | 
    'Student'

const enum TenantTypeEnum {
    Unknown = 1,
    Internal = 2,
    State = 3,
    Collaborative = 4,
    District = 5,
    Vendor = 6,
    Teacher = 7,
    Student = 8
}

export type TenantStatus = 'Unknown' | 'Active' | 'Inactive'

const enum TenantStatusEnum {
    Unknown = 1,
    Active = 2,
    Inactive = 3
}

export type IdentityProvider = 'Local' | 'Aad' | 'Google' | 'Adfs'

const enum IdentityProviderEnum {
    Local = 1,
    Aad = 2,
    Google = 3,
    Adfs = 4
}

export type DomainStatus = 'Unknown' | 'Unverified' | 'Verified' | 'Rejected' | 'Error'

export const enum DomainStatusEnum {
    Unknown = 1,
    Unverified = 2,
    Verified = 3,
    Rejected = 4,
    Error = 5
}

export interface TenantDomain {
    tenantId: string 
    domainName: string 
    domainStatus: DomainStatus
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string
}

export interface Tenant {
    tenantId: string 
    tenantType: TenantType
    tenantStatus: TenantStatus 
    organizationIdentifier: string 
    organizationName: string 
    isDemo: boolean
    enforceMfa: boolean 
    state: string 
    subscriptionsMigrated: boolean 
    subscriptions: Subscription[]
    domains: TenantDomain[]
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string 
    identityProviders: IdentityProvider[]
    onBoarding: OnBoardingWizardData
    organizations: Organization[]
    settings: TenantSetting[]
}

export interface TenantSetting {
    code: string 
    value: string 
    dataType: string 
}