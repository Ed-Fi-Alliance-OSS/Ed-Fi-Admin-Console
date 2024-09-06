import { OnBoardingStepStatus } from "../../core/onBoardingWizard/onBoardingWizard.types"

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