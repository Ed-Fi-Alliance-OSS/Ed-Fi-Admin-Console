import {
  Tenant,
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import { usePluginContext } from '../../../plugins/BasePlugin'

const useTenantService = () => {
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const apiService = functionalities.ApiService?.(config, useApiService)

  const getTenantById = async (tenantId: string): Promise<Tenant> => {
    return apiService.tenants.get(tenantId)
  }

  const getTenants = async (): Promise<Tenant[]> => {
    return apiService.tenants.getAll()
  }
    
  return {
    getTenantById,
    getTenants
  }
}

export default useTenantService