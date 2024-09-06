export interface GetAllConnectionsRequest {
    pageIndex: number 
    pageSize: number 
    orderBy?: string 
    filter?: string
}

export interface CreateEdfiAdminConnectionRequest {
    tenantId: string 
    connectionType: string 
    connectionName: string 
    edFiVersion: string 
    edFiExtension: string 
    metadataUrl: string 
    clientId: string 
    clientSecret: string 
    tokenUrl?: string 
}

export interface UpdateEdfiAdminConnectionRequest {
    tenantId: string 
    connectionId: string
    connectionType: string 
    connectionName: string 
    edFiVersion: string 
    edFiExtension: string 
    metadataUrl: string 
    clientId: string 
    clientSecret: string 
    tokenUrl: string 
}

export interface VerifyEdFiAdminConnectionRequest {
    tenantId: string 
    connectionId: string 
    deleteConnection: boolean
}