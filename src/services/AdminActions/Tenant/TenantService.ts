import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import { Tenant } from '../../../core/Tenant.types'
import { ActionParams } from '../adminAction.types'
import adminActionRoutes from '../tenantActionRoutes'
import { UpdateTenantRequest } from './TenantService.requests'
import { UpdateTenantResult } from './TenantService.results'

const useTenantService = () => {
  // const { getAsync, putAsync } = useHttpService()
  const { get } = useApiService()
  const { config } = useConfig()

  const getTenant = async (actionParams: ActionParams): Promise<Tenant[]> => {
    const baseUrl = actionParams.edxApiUrl

    // const url = `${baseUrl}/${adminActionRoutes.getTenant(actionParams.tenantId)}`
    //const url = '/data-tenants.json'
    const url = actionParams.config.api?.useLocalMockData ?? true
      ? `${config?.app.basePath}/mockdata/adminapi/data-tenants.json`
      : `${baseUrl}/adminconsole/tenants`
    
    const result = await get<Tenant[]>({
      url,
      actionName: 'Get Tenant',
    })
    
    if (result.type === 'Response') {
      return result.data
    }

    return []
  }
    
  const updateTenant = async (actionParams: ActionParams, data: UpdateTenantRequest): UpdateTenantResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.putTenant(actionParams.tenantId)}`
    
    // const result = await putAsync<GetTenantResponse, UpdateTenantRequest>({
    //   url,
    //   actionName: 'Update Tenant',
    //   access_token: actionParams.token,
    //   data,
    //   apiConfig: actionParams.config.api
    // })
    
    return {
      type: 'Response',
      data:{ tenantId: data.tenantId, }
    }
  }
    
  return {
    getTenant,
    updateTenant
  }
}

export default useTenantService