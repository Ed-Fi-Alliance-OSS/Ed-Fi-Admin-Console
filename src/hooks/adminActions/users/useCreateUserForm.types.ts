export interface CreateUserFormLicensesData {
    applicationId: string 
    subscriptionId: string 
    tenantId: string
    userId?: string
    roles?: string[]
}

export interface CreateUserFormData {
    userName: string
    firstName: string 
    lastName: string 
    email: string 
    role: RoleOption 
    licenses: CreateUserFormLicensesData[]
}

export interface SubscriptionOptionRolesItem {
    roleName: string 
    isAvailableForTenant: boolean
}

export interface SubscriptionOption {
    checked: boolean 
    applicationName: string 
    applicationId: string 
    subscriptionId: string
    numberOfLicenses: number
    assignedLicenses: number 
    roles?: SubscriptionOptionRolesItem[]
    selectedRole?: string
}

export type RoleOption = 'Tenant.User' | 'Tenant.Admin'

export type UserFormMode = 'Add' | 'Invite' | 'Edit' | 'Manage Subscriptions' | 'Invite Admin'