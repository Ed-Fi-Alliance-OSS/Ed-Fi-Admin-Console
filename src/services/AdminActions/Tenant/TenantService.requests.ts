export interface UpdateTenantRequest {
  tenantId: string
  document: {
    edfiApiDiscoveryUrl: string
  }
}