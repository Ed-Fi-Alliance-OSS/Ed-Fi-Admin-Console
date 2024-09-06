export type SSOMethodConsentStatus = 'Consented' | 'Not Selected' | 'Awaiting Consent' | 'Required'
export type SSOMethodDescriptor = 'Google' | 'Aad' | 'Local'

export interface SSOMethod {
    name: string
    descriptor:  SSOMethodDescriptor
    consentStatus: SSOMethodConsentStatus
    selected: boolean
}