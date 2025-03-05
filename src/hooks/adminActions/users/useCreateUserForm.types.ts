// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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