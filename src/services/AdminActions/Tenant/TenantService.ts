// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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
    if (!apiService) {
      throw new Error('ApiService is not available')
    }

    return apiService.tenants.get(tenantId)
  }

  const getTenants = async (): Promise<Tenant[]> => {
    if (!apiService) {
      throw new Error('ApiService is not available')
    }
    
    return apiService.tenants.getAll()
  }
    
  return {
    getTenantById,
    getTenants
  }
}

export default useTenantService