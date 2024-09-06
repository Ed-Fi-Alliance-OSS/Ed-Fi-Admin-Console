import { TenantStatus } from "./Tenant.types"

export type AppUserStatus = 'Active' | 'Inactive' | 'Unknown'
export type AppUserRole = 'Tenant.User' | 'Tenant.Admin'
export type AppUserSource = 'Manual' | "Ed-Fi Sync"

export interface AppUserLicenseRole {
    role: string 
    isAssigned: true
}

export interface AppUserLicense {
    subscriptionTenantId: string 
    isTenantSubscribed: boolean 
    tenantSubscriptionId: string 
    tenantSubscriptionStartDateTime: string 
    tenantSubscriptionEndDateTime: string 
    tenantSubscriptionActualEndDateTime: string 
    numberOfLicenses: number 
    assignedLicenses: number 
    isUserLicensed: boolean
    applicationTenantId: string 
    applicationId: string 
    applicationName: string 
    applicationRole: AppUserLicenseRole[]
}

export interface AppUser {
    userId: string 
    userName: string
    firstName: string 
    lastName: string 
    status: AppUserStatus
    email: string 
    licenses: AppUserLicense[]
    tenants?: AppUserTenant[]
    roles: AppUserRole[]
    source: AppUserSource | null // If this is null, means == Manual
    updated: string 
}

export interface AppUserTenantLicenseRole {
    role: string
    isImplicitlyAssigned: boolean 
    status: string 
    educationOrganizationId?: number
    staffClassification: string 
}

export interface AppUserTenantLicense {
    applicationId: string
    applicationName: string
    roles: AppUserTenantLicenseRole[]
}

export interface AppUserTenant {
    tenantId: string 
    tenantStatus: TenantStatus
    roles: string[]
    status: number 
    licenses: AppUserTenantLicense[]
}

export interface AppUserPreference {
    code: string 
    value: string 
}

export interface AppUserLogin {
    loginProvider: string
    providerDisplayName: string
}

export interface AppUserProfile {
    userId: string
    userName: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    lockoutEnabled: string
    tenants: AppUserTenant[]
    preferences: AppUserPreference[]
    browserDebugEnabled: boolean 
    licenses: AppUserLicense[]
    createdBy: string
    createdDateTime: string
    lastModifiedBy: string
    lastModifiedDateTime: string
    logins: AppUserLogin[]
    source: string
    lastLoginDateTime: string
}