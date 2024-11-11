import { DomainStatus } from '../Tenant.types'

export interface VerifyDomain {
    type: string 
    name: string 
    value: string 
    ttl: string 
}

export interface VerifiedDomainInfo {
    lea: string 
    domain: string
    status: DomainStatus
}