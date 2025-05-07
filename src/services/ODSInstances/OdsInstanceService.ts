// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import { ODSInstance } from '../../core/ODSInstance.types'
import useHttpService from '../../hooks/http/useHttpService'
import { usePluginContext } from '../../plugins/BasePlugin'
import { ActionParams } from '../AdminActions/adminAction.types'
import odsInstancesActionRoutes from './odsInstancesActionRoutes'
import {
  CreateOdsInstanceOnboardingStepRequest, GetOdsInstancesListRequest, UpdateOdsInstanceIsDefaultRequest, UpdateOdsInstanceOnboardingStepRequest
} from './OdsInstanceService.requests'
import {
  GetOdsInstancesListResponse, ODSInstanceUpdatedResponse
} from './OdsInstanceService.responses'
import {
  GetOdsInstancesListResult, PostOdsInstanceOnboardingStepResult,
  PutOdsInstanceOnboardingStepResult
} from './OdsInstanceService.results'

const useOdsInstanceService = () => {
  const { getAsync, postAsync, putAsync } = useHttpService()
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const apiService = functionalities.ApiService?.(config, useApiService)

  const getOdsInstancesList = async (actionParams: ActionParams, request: GetOdsInstancesListRequest): GetOdsInstancesListResult => {
    const baseUrl = config.api.edfiAdminApiBaseUri
    let queryParams = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}`
        
    if (request.filter) {
      queryParams = `${queryParams}&filter=${request.filter}`
    }

    if (request.orderBy) {
      queryParams = `${queryParams}&orderBy=${request.orderBy}`
    }

    const url = actionParams.config.api?.useLocalMockData ?? true
      ? `${config?.app.basePath}/mockdata/adminapi/data-odsinstances.json`
      : `${baseUrl}/adminconsole/odsinstances`

    return apiService.instances.getAll()
  }

  const getOdsInstanceById = async (instanceId: string): Promise<ODSInstance> => {
    return apiService.instances.get(instanceId)
  }
    
  const deleteInstanceById = async (instanceId: string) => {
    return apiService.instances.delete(instanceId)
  }

  const updateInstanceIsDefault = async (actionParams: ActionParams, data: UpdateOdsInstanceIsDefaultRequest) => {
    return apiService.instances.update(data.instanceId, data)
  }

  const createInstanceOnboardingStep = async (actionParams: ActionParams, data: CreateOdsInstanceOnboardingStepRequest): PostOdsInstanceOnboardingStepResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${odsInstancesActionRoutes.postInstanceOnboardingStep(actionParams.tenantId, data.instanceId)}`

    const result = await postAsync<ODSInstanceUpdatedResponse, CreateOdsInstanceOnboardingStepRequest>({
      url,
      actionName: 'Create Instance Onboarding Step',
      access_token: actionParams.token,
      data,
      apiConfig: actionParams.config.api
    })

    return result
  }

  const updateInstanceOnboardingStep = async (actionParams: ActionParams, data: UpdateOdsInstanceOnboardingStepRequest): PutOdsInstanceOnboardingStepResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${odsInstancesActionRoutes.putInstanceOnboardingStep(actionParams.tenantId, data.instanceId, data.number)}`

    const result = await putAsync<ODSInstanceUpdatedResponse, UpdateOdsInstanceOnboardingStepRequest>({
      url,
      actionName: 'Update Instance Onboarding Step',
      access_token: actionParams.token,
      data,
      apiConfig: actionParams.config.api
    })

    return result
  }
    
  return {
    getOdsInstancesList,
    getOdsInstanceById,
    updateInstanceIsDefault,
    createInstanceOnboardingStep,
    updateInstanceOnboardingStep,
    deleteInstanceById
  }
}

export default useOdsInstanceService