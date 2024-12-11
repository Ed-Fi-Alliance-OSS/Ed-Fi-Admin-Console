import {
  EdxAppConfig,
  useApiService
} from '@edfi/admin-console-shared-sdk'

export function MockApiService(config: EdxAppConfig, apiService: typeof useApiService) {
  const baseUrl = window.location.origin.includes('localhost') ? 'http://localhost:3000/api' : config.app.basePath + '/api'
  const { api } = apiService('')
  const { api: adminConsoleApi } = apiService(config.api.edfiAdminApiBaseUri)
  return {
    tenants: {
      getAll: () => adminConsoleApi.get('/adminconsole/tenants').then(resp => resp.data),
      get: (tenantId: string) => adminConsoleApi.get(`/adminconsole/tenants/${tenantId}`).then(resp => resp.data),
    },
    instances: {
      getAll: () => adminConsoleApi.get('/v2/odsinstances').then(resp => resp.data),
      get: (instanceId: string) => adminConsoleApi.get(`/v2/odsinstances/${instanceId}`).then(resp => resp.data),
      create: (instance: any) => adminConsoleApi.post('/v2/odsinstances').then(resp => resp.data),
    },
    users: {
      getAll: () => api.get(`${baseUrl}/users`).then(resp => resp.data),
      get: (userId: string) => api.get(`${baseUrl}/users/${userId}`).then(resp => resp.data),
    },
    odsinstances: {
      getAll: () => api.get(`${baseUrl}/odsinstances`).then(resp => resp.data),
      get: (odsInstanceId: string) => api.get(`${baseUrl}/odsinstances/${odsInstanceId}`).then(resp => resp.data),
      update: (odsInstanceId: string, odsInstance: any) => api.patch(`${baseUrl}/odsinstances/${odsInstanceId}`, odsInstance).then(resp => resp.data),
    }
  }
}