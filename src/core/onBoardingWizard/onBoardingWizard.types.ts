// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Api } from '@edfi/admin-console-shared-sdk/dist/core/EdxApp.types'

export type OnBoardingStepStatus = 'Pending' | 'Completed' | 'InProgress'

export interface StepData {
    index: number 
    name: string 
    description: string 
}

export interface OnBoardingStep {
    number: number 
    description: string 
    startedAt?: string 
    completedAt?: string 
    status: OnBoardingStepStatus
}

export interface OnBoardingWizardData {
    status: OnBoardingStepStatus
    progressPercentage: number 
    totalSteps: number
    lastCompletedStep?: number 
    startedAt?: string 
    completedAt?: string 
    steps: OnBoardingStep[]
    apiConfig?: Api
}