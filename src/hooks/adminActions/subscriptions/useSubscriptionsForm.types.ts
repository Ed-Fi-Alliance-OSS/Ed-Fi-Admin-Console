export type Mode = 'Add' | 'Edit'

export interface SubscriptionFormData {
    applicationId: string 
    subscriptionId?: string
    startDateTime: Date | null
    endDateTime: Date | null
    gracePeriod: number 
    numberOfLicenses: number
    unlimitedLicenses: boolean
    autoAssign: boolean 
}

export interface SubscriptionApplicationOption {
    applicationName: string
    applicationId: string 
}