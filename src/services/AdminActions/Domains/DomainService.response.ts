import { DomainStatus } from "../../../core/Tenant.types"

export interface PostDomainResponse {
    tenantId: string
    domainName: string
}

export interface VerifyDomainResponseInt {
    tenantId: string
    domainName: string
    domainStatus: number
}

export interface VerifyDomainResponse {
    tenantId: string
    domainName: string
    domainStatus: DomainStatus
}

export interface DeleteDomainResponse {}