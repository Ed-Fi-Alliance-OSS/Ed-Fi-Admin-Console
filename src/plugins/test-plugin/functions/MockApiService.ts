// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  EdxAppConfig,
  Tenant,
  useApiService
} from '@edfi/admin-console-shared-sdk'
import {
  EdfiApplication, EdfiApplicationAuthData
} from '../../../core/Edfi/EdfiApplications'
import { EdfiClaimSet } from '../../../core/Edfi/EdfiClaimsets'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import {
  CreateEdfiApplicationRequest, UpdateEdfiApplicationRequest
} from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests'

export interface IApiServices {
  tenants: {
    getAll: () => Promise<Tenant[]>
    get: (tenantId: string) => Promise<Tenant>
  }
  instances: {
    getAll: () => Promise<any>
    get: (instanceId: string) => Promise<any>
    create: (instance: {
      name: string
      instanceType: string
      connectionString: string
    }) => Promise<any>
  }
  users: {
    getAll: () => Promise<any>
    get: (userId: string) => Promise<any>
  }
  vendors: {
    getAll: () => Promise<EdfiVendor[]>
    get: (vendorId: string) => Promise<EdfiVendor>
    create: (vendor: EdfiVendor) => Promise<any>
    delete: (vendorId: string) => Promise<any>
    update: (vendorId: number, vendor: any) => Promise<any>
  }
  applications: {
    getByVendorId: (vendorId: string | number) => Promise<EdfiApplication[]>
    getAll: () => Promise<EdfiApplication[]>
    create: (application: CreateEdfiApplicationRequest) => Promise<EdfiApplication>
    delete: (applicationId: string) => Promise<any>
    resetPassword: (applicationId: string) => Promise<EdfiApplicationAuthData>
    update: (applicationId: string, application: UpdateEdfiApplicationRequest) => Promise<boolean>
  }
  claimSets: {
    getAll: () => Promise<EdfiClaimSet[]>
    get: (claimSetId: string) => Promise<EdfiClaimSet>
  }
}

export function MockApiService(config: EdxAppConfig, apiService: typeof useApiService): IApiServices {
  const baseUrl = window.location.origin.includes('localhost') ? 'http://localhost:3000/api' : config.app.basePath + '/api'
  const { api } = apiService('')
  const { api: adminConsoleApi } = apiService(config.api.edfiAdminApiBaseUri)
  return {
    tenants: {
      getAll: () => adminConsoleApi.get('/adminconsole/tenants').then(resp => resp.data),
      get: (tenantId) => adminConsoleApi.get(`/adminconsole/tenants/${tenantId}`).then(resp => resp.data),
    },
    instances: {
      getAll: () => adminConsoleApi.get('/v2/odsinstances').then(resp => resp.data),
      get: (instanceId) => adminConsoleApi.get(`/v2/odsinstances/${instanceId}`).then(resp => resp.data),
      create: (instance) => adminConsoleApi.post('/v2/odsinstances', instance).then(resp => resp.data),
    },
    users: {
      getAll: () => api.get(`${baseUrl}/users`).then(resp => resp.data),
      get: (userId: string) => api.get(`${baseUrl}/users/${userId}`).then(resp => resp.data),
    },
    vendors: {
      getAll: () => adminConsoleApi.get('/v2/vendors').then(resp => resp.data),
      get: (vendorId) => adminConsoleApi.get(`/v2/vendors/${vendorId}`).then(resp => resp.data),
      create: (vendor) => adminConsoleApi.post('/v2/vendors', vendor).then(resp => resp.data),
      delete: (vendorId) => adminConsoleApi.delete(`/v2/vendors/${vendorId}`).then(resp => resp.data),
      update: (vendorId, vendor) => adminConsoleApi.put(`/v2/vendors/${vendorId}`, vendor).then(resp => resp.data),
    },
    applications: {
      getByVendorId: (vendorId) => adminConsoleApi.get(`/v2/vendors/${vendorId}/applications`).then(resp => resp.data),
      getAll: () => adminConsoleApi.get('/v2/applications').then(resp => resp.data),
      create: (application) => adminConsoleApi.post('/v2/applications', application).then(resp => resp.data),
      delete: (applicationId) => adminConsoleApi.delete(`/v2/applications/${applicationId}`).then(resp => resp.data),
      resetPassword: (applicationId) => adminConsoleApi.put(`/v2/applications/${applicationId}/reset-credential`).then(resp => resp.data),
      update: (applicationId, application) => adminConsoleApi.put(`/v2/applications/${applicationId}`, application).then(resp => resp.status >= 200 && resp.status < 300),
    },
    claimSets: {
      getAll: () => adminConsoleApi.get('/v2/claimSets').then(resp => resp.data),
      get: (claimSetId) => adminConsoleApi.get(`/v2/claimSets/${claimSetId}`)
    }
  }
}