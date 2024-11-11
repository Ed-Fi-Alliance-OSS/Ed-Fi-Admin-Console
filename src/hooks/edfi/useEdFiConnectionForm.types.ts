export interface EdFiConnectionFormData {
    connectionId: string | null
    connectionName?: string 
    baseUrl: string 
    key: string 
    secret: string
}

export type EdFiConnectionFormMode = 'Add' | 'Edit'

export type EdFiConnectionVerificationStatus = 'Connected' | 'Not Connected' | 'Authentication Failed' | 'URL Error' | 'Credential Error' | 'Unknown'