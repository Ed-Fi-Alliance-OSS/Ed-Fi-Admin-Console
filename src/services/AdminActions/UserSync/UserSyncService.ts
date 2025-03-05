// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ActionParams } from '../adminAction.types'
import useHttpService from '../../../hooks/http/useHttpService'
import {
  GetEdFiSyncByIdResult, GetEdFiSyncExecutionLogsResult, GetEdFiSyncExecutionsResult, GetEdFiSyncResult, PostEdFiSyncResult, PostExecuteEdFiSyncResult, PutEdFiSyncResult 
} from './UserSyncService.results'
import {
  JobExecutionListResponse, JobExecutionLogEntry, JobListResponse, JobProfile 
} from '../../../core/UserSync/UserSync.types'
import edfiSyncActionRoutes from '../edfisyncRoutes'
import {
  ExecuteEdFiSync, GetEdFiSyncExecutionLogsRequest, GetEdFiSyncExecutionsRequest, GetEdFiSyncJobByIdRequest, UpdateEdFiSyncRequest 
} from './UserSyncService.requests'
import { PaginatedItemsViewModel } from '../../../core/apiResponses'
import {
  EdFiSyncProfileResponse, EdFiSyncUpdatedResponse, JobExecutionRequestedResponse 
} from './UserSyncService.responses'

const useUserSyncService = () => {
  const { getSimpleAsync, postAsync, putAsync } = useHttpService()

  const getEdFiSync = async (actionParams: ActionParams): GetEdFiSyncResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiSyncActionRoutes.getEdFiSync(actionParams.tenantId)}`
    
    const result = await getSimpleAsync<JobListResponse>({ 
      actionName: 'Get Ed-Fi Sync Job',
      access_token: actionParams.token,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const getEdFiSyncById = async (actionParams: ActionParams, request: GetEdFiSyncJobByIdRequest): GetEdFiSyncByIdResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiSyncActionRoutes.getEdFiSyncById(actionParams.tenantId, request.jobId)}`
    
    const result = await getSimpleAsync<JobProfile>({ 
      actionName: 'Get Ed-Fi Sync Job By Id',
      access_token: actionParams.token,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const getEdFiSyncExecutions = async (actionParams: ActionParams, request: GetEdFiSyncExecutionsRequest): GetEdFiSyncExecutionsResult => {
    const baseUrl = actionParams.edxApiUrl
    const { pageIndex, pageSize } = request
    let queryParams = `pageIndex=${pageIndex}&pageSize=${pageSize}`
        
    if (request.filter) {
      queryParams = `${queryParams}&filter=${request.filter}`
    }

    if (request.orderBy) {
      queryParams = `${queryParams}&orderBy=${request.orderBy}`
    }

    const url = `${baseUrl}/${edfiSyncActionRoutes.getEdFiSyncExecutions(actionParams.tenantId, request.jobId)}?${queryParams}`
    
    const result = await getSimpleAsync<PaginatedItemsViewModel<JobExecutionListResponse>>({ 
      actionName: 'Get Ed-Fi Sync Job Executions',
      access_token: actionParams.token,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const getEdFiSyncExecutionLogs = async (actionParams: ActionParams, request: GetEdFiSyncExecutionLogsRequest): GetEdFiSyncExecutionLogsResult => {
    const baseUrl = actionParams.edxApiUrl
    let queryParams = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}`
        
    if (request.orderBy) {
      queryParams = `${queryParams}&orderBy=${request.orderBy}`
    }

    if (request.filterBy) {
      queryParams = `${queryParams}&filter=${request.filterBy}`
    }
        
    const url = `${baseUrl}/${edfiSyncActionRoutes.getEdFiSyncExecutionLogs(actionParams.tenantId, request.jobId, request.executionId)}?${queryParams}`

    const result = await getSimpleAsync<PaginatedItemsViewModel<JobExecutionLogEntry>>({ 
      actionName: 'Get Ed-Fi Sync Job Execution Logs',  
      access_token: actionParams.token,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const executeEdFiSync = async (actionParams: ActionParams, request: ExecuteEdFiSync): PostExecuteEdFiSyncResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiSyncActionRoutes.executeEdFiSync(actionParams.tenantId, request.jobId)}`
    
    const result = await postAsync<JobExecutionRequestedResponse, any>({ 
      actionName: 'Execute Ed-Fi Sync',  
      access_token: actionParams.token,
      data: undefined,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const createEdFiSync = async (actionParams: ActionParams): PostEdFiSyncResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiSyncActionRoutes.postEdFiSync(actionParams.tenantId)}`
    
    const result = await postAsync<EdFiSyncProfileResponse, any>({ 
      actionName: 'Post Ed-Fi Sync',
      access_token: actionParams.token,
      data: undefined,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const updateEdFiSync = async (actionParams: ActionParams, request: UpdateEdFiSyncRequest): PutEdFiSyncResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiSyncActionRoutes.putEdFiSync(actionParams.tenantId, request.jobId)}`
    
    const result = await putAsync<EdFiSyncUpdatedResponse, UpdateEdFiSyncRequest>({ 
      actionName: 'Put Ed-Fi Sync',
      access_token: actionParams.token,
      data: request,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }
    
  return {
    getEdFiSync,
    getEdFiSyncById,
    getEdFiSyncExecutions,
    getEdFiSyncExecutionLogs,
    executeEdFiSync,
    createEdFiSync,
    updateEdFiSync
  }
}

export default useUserSyncService