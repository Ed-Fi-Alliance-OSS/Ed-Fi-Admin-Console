import {
  DomainStatus, Tenant
} from '../../../core/Tenant.types'
import { GetTenantResponse } from './TenantService.responses'

const mapToTenant = (response: GetTenantResponse): Tenant => {
  const tenant: Tenant = {
    tenantId: response.tenantId,
    document: { edfiApiDiscoveryUrl: response.document?.edfiApiDiscoveryUrl ?? '' }
  }

  return tenant
}

/*
const mapProviders = (identityProviders: number[]): SSOMethodDescriptor[] => {
  const providers: SSOMethodDescriptor[] = identityProviders ? identityProviders.map(provider => {
    if (provider === 1) {
      return 'Local'
    }

    if (provider === 2) {
      return 'Aad'
    }
    
    return 'Google'
  }) : [ 'Local' ]

  return providers
}

const mapTenantStatus = (status: number): TenantStatus => {
  if (status === 1) {
    return 'Unknown'
  }

  if (status === 2) {
    return 'Active'
  }

  return 'Inactive'
}

const mapTenantType = (type: number): TenantType => {
  if (type === 1) {
    return 'Unknown'
  }

  if (type === 2) {
    return 'Internal'
  }

  if (type === 3) {
    return 'State'
  }

  if (type === 4) {
    return 'Collaborative'
  }

  if (type === 5) {
    return 'District'
  }

  if (type === 6) {
    return 'Vendor'
  }

  if (type === 7) {
    return 'Teacher'
  }

  return 'Student'
}



const mapDomains = (domainsList: IntTenantDomain[]): TenantDomain[] => {
  domainsList = [
    {
      'domainStatus': 1,
      'tenantId': 'abc123',
      'domainName': 'mockdomain.com',
      'createdBy': 'user123',
      'createdDateTime': '2022-01-01T10:00:00',
      'lastModifiedBy': 'user123',
      'lastModifiedDateTime': '2022-01-01T10:00:00'
    }
  ]

  const tenantDomains = domainsList.map(item => {
    const domainData: TenantDomain = {
      domainStatus: getDomainStatus(item.domainStatus),
      domainName: item.domainName,
      tenantId: item.tenantId,
      createdDateTime: item.createdDateTime,
      createdBy: item.createdBy,
      lastModifiedBy: item.lastModifiedBy,
      lastModifiedDateTime: item.lastModifiedDateTime
    }

    return domainData
  })

  return tenantDomains
}
const mapTenants = (response: Tenant[]): Tenant[] => {
  return response.map(tenant => ({
    tenantId: tenant.tenantId,
    edfiApiDiscoveryUrl: '',
    onBoarding: tenant.onBoarding,
    // organizationName: tenant.organizationName,
    // organizationIdentifier: tenant.organizationIdentifier,
    // state: tenant.state,
    // tenantStatus: tenant.tenantStatus,
    // tenantType: tenant.tenantType,
    // identityProviders: tenant.identityProviders,
    // domains: tenant.domains,
    // isDemo: tenant.isDemo,
    // subscriptions: tenant.subscriptions,
    // enforceMfa: tenant.enforceMfa,
    // createdBy: tenant.createdBy,
    // createdDateTime: tenant.createdDateTime,
    // lastModifiedBy: tenant.lastModifiedBy,
    // lastModifiedDateTime: tenant.lastModifiedDateTime,
    
    // organizations: tenant.organizations,
    // subscriptionsMigrated: tenant.subscriptionsMigrated,
    // settings: tenant.settings
  }))
}
*/

const getDomainStatus = (status: number): DomainStatus => {
  if (status === 0) {
    return 'Unknown'
  }

  if (status === 1) {
    return 'Unverified'
  }

  if (status === 2) {
    return 'Verified'
  }

  if (status === 3) {
    return 'Rejected'
  }

  return 'Error'
}

export {
  getDomainStatus, mapToTenant
}
