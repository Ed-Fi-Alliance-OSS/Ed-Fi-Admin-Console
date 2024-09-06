export interface UpdateTenantRequest {
    tenantId: string 
    identityProviders?: string[]
    domains?: string[]
}