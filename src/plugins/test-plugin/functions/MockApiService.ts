import {
  EdxAppConfig,
  useApiService
} from '@edfi/admin-console-shared-sdk'
import { Tenant } from '../../../core/Tenant.types'

export function MockApiService(config: EdxAppConfig, apiService: typeof useApiService) {
  const baseUrl = config.app.basePath + '/api'
  const { api } = apiService()
  return {
    tenants: {
      getAll: () => api.get(`${baseUrl}/tenants`).then(resp => resp.data),
      get: (tenantId: string) => api.get(`${baseUrl}/tenants/${tenantId}`).then(resp => resp.data),
      update: (tenantId: string, tenant: Tenant) => api.patch(`${baseUrl}/tenants/${tenantId}`, tenant).then(resp => resp.data),
    },
    instances: {
      getAll: () => api.get(`${baseUrl}/instances`).then(resp => resp.data),
      get: (instanceId: string) => api.get(`${baseUrl}/instances/${instanceId}`).then(resp => resp.data),
      create: (instance: any) => api.post(`${baseUrl}/instances`, instance).then(resp => resp.data),
    },
    users: {
      getAll: () => api.get(`${baseUrl}/users`).then(resp => resp.data),
      get: (userId: string) => api.get(`${baseUrl}/users/${userId}`).then(resp => resp.data),
    },
    odsinstances: {
      getAll: () => api.get(`${baseUrl}/odsinstances`).then(resp => resp.data),
      get: (odsInstanceId: string) => api.get(`${baseUrl}/odsinstances/${odsInstanceId}`).then(resp => resp.data),
    }
  }
}