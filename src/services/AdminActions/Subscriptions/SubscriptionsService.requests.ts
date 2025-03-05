// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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