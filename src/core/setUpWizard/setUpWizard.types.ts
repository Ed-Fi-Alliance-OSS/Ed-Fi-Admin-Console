export type InstanceOnBoardingStepStatus = 'Pending' | 'Completed' | 'InProgress'

export interface InstanceOnboardingStepData {
    index: number 
    name: string 
    description: string 
}

export interface InstanceOnBoardingStep {
    number: number 
    description: string 
    startedAt?: string 
    completedAt?: string 
    status: InstanceOnBoardingStepStatus
}

export interface InstanceOnboarding {
    status: InstanceOnBoardingStepStatus
    progressPercentage: number 
    totalSteps: number
    lastCompletedStep?: number 
    startedAt?: string 
    completedAt?: string 
    steps: InstanceOnBoardingStep[]
}