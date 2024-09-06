export type TrainingModuleStatus = 'Start' | 'Complete'

export interface TrainingModule {
    name: string 
    description: string 
    status: TrainingModuleStatus
}