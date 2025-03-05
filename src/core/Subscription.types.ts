// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export type LicenseType = 'Unknown' | 'Full' | 'Trial'

export type SubscriptionStatus = 'Unknown' | 'Active' | 'Inactive' | 'Pending' | 'Rejected'

export type SubscriptionAmount = number | 'Unlimited'

export interface SubscriptionApplicationRoles {
    roleName?: string 
    isDefault: boolean
    isAvailableForTenants: boolean
}

export interface Subscription {
    tenantId: string 
    subscriptionId: string 
    applicationId: string 
    applicationName: string 
    applicationRoles: SubscriptionApplicationRoles[]
    startDateTime: string 
    endDateTime: string 
    actualEndDateTime: string 
    gracePeriod: number 
    numberOfLicenses: number 
    assignedLicenses: number 
    maxAssignedLicenses: number 
    lastMaxAssignedLicensesDateTime: string 
    licenseType: LicenseType
    subscriptionStatus: SubscriptionStatus 
    autoAssign: boolean 
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string 
}