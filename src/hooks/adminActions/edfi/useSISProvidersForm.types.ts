export interface SISProvidersOption {
    value: string 
    text: string
}

export interface OptionalProvidersOption {
    value: string 
    text: string
}

export interface CheckEdfiApplicationResult {
    applicationId?: number
    exists: boolean 
    error?: boolean
}