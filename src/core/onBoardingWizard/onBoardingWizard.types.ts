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