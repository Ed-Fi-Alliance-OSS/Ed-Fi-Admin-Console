import { SSOMethodDescriptor } from '../../../core/ssoMethods/SSOMethods.types'
import { DomainStatus, Tenant, TenantDomain, TenantStatus, TenantType } from '../../../core/Tenant.types'
import { GetTenantResponse, IntTenantDomain } from './TenantService.responses'

const mapToTenant = (response: GetTenantResponse): Tenant => {
  const tenant: Tenant = {
    tenantId: response.tenantId,
    organizationName: response.organizationName,
    organizationIdentifier: response.organizationIdentifier,
    state: response.state,
    tenantStatus: mapTenantStatus(response.tenantStatus),
    tenantType: mapTenantType(response.tenantType),
    identityProviders: mapProviders(response.identityProviders),
    domains: mapDomains(response.domains),
    isDemo: response.isDemo,
    subscriptions: response.subscriptions,
    enforceMfa: response.enforceMfa,
    createdBy: response.createdBy,
    createdDateTime: response.createdDateTime,
    lastModifiedBy: response.lastModifiedBy,
    lastModifiedDateTime: response.lastModifiedDateTime,
    onBoarding: {...response.onBoarding},
    organizations: response.organizations,
    subscriptionsMigrated: response.subscriptionsMigrated,
    settings: [
      {
        'code': 'setting1',
        'value': 'value1',
        'dataType': 'string'
      }
    ]
    //response.settings.map(setting => ({...setting}))
  }

  return tenant
}

const mapProviders = (identityProviders: number[]): SSOMethodDescriptor[] => {
  const providers: SSOMethodDescriptor[] = identityProviders ? identityProviders.map(provider => {
    if (provider === 1)
      return 'Local'

    if (provider === 2)
      return 'Aad'
    
    return 'Google'
  }) : ['Local']

  return providers
}

const mapTenantStatus = (status: number): TenantStatus => {
  if (status === 1)
    return 'Unknown'
  if (status === 2)
    return 'Active'

  return 'Inactive'
}

const mapTenantType = (type: number): TenantType => {
  if (type === 1)
    return 'Unknown'

  if (type === 2)
    return 'Internal'

  if (type === 3)
    return 'State'

  if (type === 4)
    return 'Collaborative'

  if (type === 5)
    return 'District'

  if (type === 6)
    return 'Vendor'

  if (type === 7)
    return 'Teacher'

  return 'Student'
}

const getDomainStatus = (status: number): DomainStatus => {
  if (status === 0)
    return 'Unknown'

  if (status === 1)
    return 'Unverified'

  if (status === 2)
    return 'Verified'

  if (status === 3)
    return 'Rejected'

  return 'Error'
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

export {
  mapToTenant,
  getDomainStatus
}