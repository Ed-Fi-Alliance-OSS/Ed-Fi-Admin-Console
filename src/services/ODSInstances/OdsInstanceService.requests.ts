// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { OnBoardingStepStatus } from '../../core/onBoardingWizard/onBoardingWizard.types'

export interface GetOdsInstancesListRequest {
    pageIndex: number 
    pageSize: number 
    orderBy?: string 
    filter?: string 
}

export interface UpdateOdsInstanceIsDefaultRequest {
    tenantId: string 
    instanceId: string 
    isDefault: boolean
    validate: boolean
}

export interface CreateOdsInstanceOnboardingStepRequest {
    instanceId: string 
    tenantId: string 
    number: number 
    description: string 
    status: OnBoardingStepStatus
}

export interface UpdateOdsInstanceOnboardingStepRequest {
    instanceId: string 
    tenantId: string 
    number: number 
    status: OnBoardingStepStatus
}