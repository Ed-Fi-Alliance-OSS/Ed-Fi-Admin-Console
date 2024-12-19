import {
  Tenant
} from '../../../core/Tenant.types'

export interface IntTenantDomain {
    domainStatus: number
    tenantId: string 
    domainName: string 
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string
}

export type GetTenantResponse = Tenant

export interface UpdateTenantRespose {
    tenantId: string 
}