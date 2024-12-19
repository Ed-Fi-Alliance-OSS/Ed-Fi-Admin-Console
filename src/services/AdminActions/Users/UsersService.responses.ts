import {
  AppUserLicenseRole, AppUserStatus
} from '../../../core/AppUser.types'
import {
  Organization, StaffClassification
} from '../../../core/Tenant.types'

export interface ApiResponseApplicationRole {
    role: string 
    isAssigned: boolean 
}

export interface ApiResponseUserLicense {
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

export interface ApiResponseUser {
    userId: string 
    userName: string 
    email: string
    status: AppUserStatus 
    firstName: string 
    lastName: string 
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string
}

export interface GetUsersListResponse {
    pageIndex?: number 
    pageSize?: number 
    count?: number 
    data: ApiResponseUser[]
}

export interface GetOrganizationsResponse {
    pageIndex: number 
    pageSize: number 
    count: number 
    data: Organization[]
}

export interface GetStaffClassificationsResponse {
    pageIndex: number 
    pageSize: number 
    count: number 
    data: StaffClassification[]
}

export interface CreateUserEducationOrganizationsResponse {
    userId: string
    tenantId: string
    educationOrganizationId: string | number
    educationOrganizationName: string
    staffClassification: string
}

export interface UpdateUserEducationOrganizationResponse {
    userId: string
    tenantId: string
    educationOrganizationId: string | number
    staffClassification: string
}

export interface DeleteUserEducationOrganizationResponse {
    userId: string
    tenantId: string
    educationOrganizationId: string | number
}

export interface AddUserResponse {
    tenantId: string
    userId: string 
    password: string 
}

export interface ActivateUserResponse {
    tenantId: string
    userId: string
}

export interface DeactivateUserResponse {
    tenantId: string
    userId: string
}

export interface DeleteUserResponse {}

export interface DeleteInvitationResponse {}

export interface EditUserResponse {
    tenantId: string
    userId: string 
}

export interface InviteUserResponse {
    tenantId: string 
    invitationId: string
}

export interface ApiAssignLicenseRequests {
    tenantId: string 
    applicationId: string 
    subscriptionId: string
    roles: string[]
}

export interface ApiInvitation {
    tenantId: string 
    invitationId: string 
    firstName: string 
    lastName: string 
    email: string 
    role: string 
    invitationToken: string
    invitationStatus: number
    invitationSendDateTime: string 
    assignLicenseRequests: ApiAssignLicenseRequests[]
}

type UserEmailStatus = 'Unregistered' | 'Registered' | 'RegisteredInCurrentTenant'

export interface CheckUserEmailResponse {
    email: string 
    username: string
    firstName: string 
    lastName: string 
    status: UserEmailStatus
}

export interface GetInvitationsListResponse {
    pageIndex?: number 
    pageSize?: number 
    count?: number
    data: ApiInvitation[]
}

export interface AssignLicenseResponse {
    tenantId: string 
    applicationId: string
    subscriptionId: string 
    userId: string 
}

export interface RevokeLicenseResponse {
    tenantId: string 
    applicationId: string 
    subscriptionId: string 
    userId: string
}

export interface AssignBulkLicensesResponse {
    tenantId: string 
    userId: string 
}

export interface RevokeBulkLicensesResponse {
    tenantId: string 
    userId: string 
}