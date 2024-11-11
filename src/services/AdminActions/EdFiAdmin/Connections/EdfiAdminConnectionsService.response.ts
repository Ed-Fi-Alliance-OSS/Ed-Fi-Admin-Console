import { EdFiAdminConnection } from '../../../../core/EdFiAdmin/EdFiAdmin.types'

export interface GetAllEdFiAdminConnectionsResponse {
    pageIndex: number 
    pageSize: number 
    count: number 
    data: EdFiAdminConnection[]
}

export interface CreatedEdFiAdminConnectionResponse {
    tenantId: string 
    connectionId: string 
}

export interface UpdatedEdFiAdminConnectionResponse {
    tenantId: string 
    connectionId: string 
}

export interface VerifyEdFiAdminConnectionResponse {
    status: string 
    details: string
}