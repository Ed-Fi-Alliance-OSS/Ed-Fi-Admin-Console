export interface ConnectionMetadata {
    code: string 
    value: string 
    isSecret: boolean
}

export interface CreateConnectionRequest {
    tenantId: string 
    connectionId: string 
    name: string 
    providerId: string 
    connectionTypeId: string 
    connectionMetadata: ConnectionMetadata[]
}