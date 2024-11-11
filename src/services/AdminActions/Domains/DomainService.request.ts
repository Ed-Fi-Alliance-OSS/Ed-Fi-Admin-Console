export interface PostDomainRequest {
    tenantId: string
    domainName: string 
    domainStatus: 'Unknown'
}

export interface VerifyDomainRequest {
    tenantId: string 
    domainName: string
}