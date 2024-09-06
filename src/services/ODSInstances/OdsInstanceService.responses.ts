import { ODSInstance } from "../../core/ODSInstance.types"

export interface GetOdsInstancesListResponse {
    pageIndex: number 
    pageSize: number 
    count: number 
    data: ODSInstance[]
}

export interface UpdateODSInstanceIsDefaultResponse {
    tenantId: string 
    instanceId: string 
}

export interface ODSInstanceUpdatedResponse {
    tenantId: string 
    instanceId: string 
}