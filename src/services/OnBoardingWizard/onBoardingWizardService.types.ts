import { OnBoardingStepStatus } from "../../core/onBoardingWizard/onBoardingWizard.types"

export interface FetchOnBoardingWizardData {
    token: string 
    tenantId: string 
    apiUrl: string 
}

export interface AddStepProps {
    apiUrl: string
    tenantId: string 
    token: string
    number: number 
    description: string 
    status: OnBoardingStepStatus
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
}

export interface UpdateOnBoardingWizardDataRequest {
    tenantId: string 
    number: number 
    status: OnBoardingStepStatus
}