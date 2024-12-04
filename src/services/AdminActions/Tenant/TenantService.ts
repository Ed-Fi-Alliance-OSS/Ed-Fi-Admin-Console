import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import { Tenant } from '../../../core/Tenant.types'
import { usePluginContext } from '../../../plugins/BasePlugin'
import { UpdateTenantRequest } from './TenantService.requests'
import { UpdateTenantResult } from './TenantService.results'

const useTenantService = () => {
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const apiService = functionalities.ApiService?.(config, useApiService)

  const getTenant = async (tenantId: string): Promise<Tenant> => {
    return apiService.tenants.get(tenantId)
  }
    
  const updateTenant = async (tenantId: string, data: UpdateTenantRequest): UpdateTenantResult => {
    return apiService.tenants.update(tenantId, data)
  }
    
  return {
    getTenant,
    updateTenant
  }
}

export default useTenantService