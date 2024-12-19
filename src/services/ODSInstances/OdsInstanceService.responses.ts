import { ODSInstance } from '../../core/ODSInstance.types'

export type GetOdsInstancesListResponse = ODSInstance[]

export interface UpdateODSInstanceIsDefaultResponse {
    tenantId: string 
    instanceId: string 
}

export interface ODSInstanceUpdatedResponse {
    tenantId: string 
    instanceId: string 
}