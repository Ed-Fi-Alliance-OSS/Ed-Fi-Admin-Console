import { useConfig } from '@edfi/admin-console-shared-sdk'
import { useMockData } from '../../context/mockDataContext'
import useHttpService from '../../hooks/http/useHttpService'
import { ActionParams } from '../AdminActions/adminAction.types'
import odsInstancesActionRoutes from './odsInstancesActionRoutes'
import {
  CreateOdsInstanceOnboardingStepRequest, GetOdsInstancesListRequest, UpdateOdsInstanceIsDefaultRequest, UpdateOdsInstanceOnboardingStepRequest
} from './OdsInstanceService.requests'
import {
  GetOdsInstancesListResponse, ODSInstanceUpdatedResponse
} from './OdsInstanceService.responses'
import {
  GetOdsInstancesListResult, PostOdsInstanceOnboardingStepResult, PutOdsInstanceIsDefaultResult, PutOdsInstanceOnboardingStepResult
} from './OdsInstanceService.results'

const useOdsInstanceService = () => {
  const { getAsync, postAsync, putAsync } = useHttpService()
  const { config } = useConfig()
  const mock  = useMockData()

  const getOdsInstancesList = async (actionParams: ActionParams, request: GetOdsInstancesListRequest): GetOdsInstancesListResult => {
    const baseUrl = actionParams.edxApiUrl
    let queryParams = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}`
        
    if (request.filter) {
      queryParams = `${queryParams}&filter=${request.filter}`
    }
        
    if (request.orderBy) {
      queryParams = `${queryParams}&orderBy=${request.orderBy}`
    }
        
    // const url = `${baseUrl}/${odsInstancesActionRoutes.getInstancesList(actionParams.tenantId)}?${queryParams}`
    // const url = '/data-odsinstances.json'
    const url = actionParams.config.api?.useLocalMockData ?? true
      ? `${config?.app.basePath}/mockdata/adminapi/data-odsinstances.json`
      : `${baseUrl}/adminconsole/odsinstances`

    const result = await getAsync<GetOdsInstancesListResponse>({
      url,
      access_token: actionParams.token,
      actionName: 'Get Instances List',
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const getOdsInstanceById = async (actionParams: ActionParams, instanceId: string): GetOdsInstancesListResult => {
    const baseUrl = actionParams.edxApiUrl
    const filter = `id == "${instanceId}"`
    let queryParams = `pageIndex=${0}&pageSize=${1}`
    queryParams = `${queryParams}&filter=${filter}`
        
    // const url = `${baseUrl}/${odsInstancesActionRoutes.getInstancesList(actionParams.tenantId)}?${queryParams}`
    const url  = `${config.app.basePath}/mockdata/adminapi/data-odsinstances.json`
    
    const result = await getAsync<GetOdsInstancesListResponse>({
      url,
      access_token: actionParams.token,
      actionName: 'Get Instance By Id',
      apiConfig: actionParams.config.api
    })

    if(result.type === 'Response') { 
      return {
        data: result.data.filter(instance => instance.odsInstanceId === instanceId) ?? [],
        type: 'Response' 
      }
    }
    
    return result
  }
    
  const updateInstanceIsDefault = async (actionParams: ActionParams, data: UpdateOdsInstanceIsDefaultRequest): PutOdsInstanceIsDefaultResult => {
    const baseUrl = actionParams.edxApiUrl
    // const url = `${baseUrl}/${odsInstancesActionRoutes.putInstanceIsDefault(actionParams.tenantId, data.instanceId)}`
    // TODO - update the mock data
    mock.set('instance.default', data.instanceId)
    return {
      data: {
        instanceId: data.instanceId,
        tenantId: data.tenantId
      },
      type: 'Response'
    }
    // const result = await putAsync<UpdateODSInstanceIsDefaultResponse, UpdateOdsInstanceIsDefaultRequest>({
    //   url,
    //   actionName: 'Update Is Default Instance',
    //   access_token: actionParams.token,
    //   data,
    //   apiConfig: actionParams.config.api
    // })
    
    // return result
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
    updateInstanceOnboardingStep
  }
}

export default useOdsInstanceService