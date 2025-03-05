// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Api } from '@edfi/admin-console-shared-sdk/dist/core/EdxApp.types'
import { OnBoardingStepStatus } from '../../core/onBoardingWizard/onBoardingWizard.types'

export interface FetchOnBoardingWizardData {
    token: string 
    tenantId: string 
    apiUrl: string 
    apiConfig?: Api 
}

export interface AddStepProps {
    apiUrl: string
    tenantId: string 
    token: string
    number: number 
    description: string 
    status: OnBoardingStepStatus
    apiConfig?: Api
}

export interface AddStepRequestData {
    tenantId: string
    number: number
    description: string
    status: OnBoardingStepStatus
}

export interface UpdateOnBoardingWizardDataProps {
    token: string 
    tenantId: string 
    apiUrl: string 
    stepNumber: number 
    stepStatus: OnBoardingStepStatus
    apiConfig?: Api
}

export interface UpdateOnBoardingWizardDataRequest {
    tenantId: string 
    number: number 
    status: OnBoardingStepStatus
}