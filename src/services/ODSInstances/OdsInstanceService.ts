import useHttpService from "../../hooks/http/useHttpService"
import { ActionParams } from "../AdminActions/adminAction.types"
import odsInstancesActionRoutes from "./odsInstancesActionRoutes"
import { CreateOdsInstanceOnboardingStepRequest, GetOdsInstancesListRequest, UpdateOdsInstanceIsDefaultRequest, UpdateOdsInstanceOnboardingStepRequest } from "./OdsInstanceService.requests"
import { GetOdsInstancesListResponse, ODSInstanceUpdatedResponse, UpdateODSInstanceIsDefaultResponse } from "./OdsInstanceService.responses"
import { GetOdsInstancesListResult, PostOdsInstanceOnboardingStepResult, PutOdsInstanceIsDefaultResult, PutOdsInstanceOnboardingStepResult } from "./OdsInstanceService.results"

const useOdsInstanceService = () => {
    const { getAsync, postAsync, putAsync } = useHttpService()

    const getOdsInstancesList = async (actionParams: ActionParams, request: GetOdsInstancesListRequest): GetOdsInstancesListResult => {
        const baseUrl = actionParams.edxApiUrl
        
        let queryParams = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}`
        
        if (request.filter)
            queryParams = `${queryParams}&filter=${request.filter}`
        
        if (request.orderBy)
            queryParams = `${queryParams}&orderBy=${request.orderBy}`
        
        const url = `${baseUrl}/${odsInstancesActionRoutes.getInstancesList(actionParams.tenantId)}?${queryParams}`
    
        const result = await getAsync<GetOdsInstancesListResponse>({
            url,
            access_token: actionParams.token,
            actionName: 'Get Instances List'
        })
    
        return result
    }

    const getOdsInstanceById = async (actionParams: ActionParams, instanceId: string): GetOdsInstancesListResult => {
        const baseUrl = actionParams.edxApiUrl
        
        const filter = `id == "${instanceId}"`

        let queryParams = `pageIndex=${0}&pageSize=${1}`
        queryParams = `${queryParams}&filter=${filter}`
        
        const url = `${baseUrl}/${odsInstancesActionRoutes.getInstancesList(actionParams.tenantId)}?${queryParams}`
    
        const result = await getAsync<GetOdsInstancesListResponse>({
            url,
            access_token: actionParams.token,
            actionName: 'Get Instance By Id'
        })
    
        return result
    }
    
    const updateInstanceIsDefault = async (actionParams: ActionParams, data: UpdateOdsInstanceIsDefaultRequest): PutOdsInstanceIsDefaultResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${odsInstancesActionRoutes.putInstanceIsDefault(actionParams.tenantId, data.instanceId)}`
    
        const result = await putAsync<UpdateODSInstanceIsDefaultResponse, UpdateOdsInstanceIsDefaultRequest>({
            url,
            actionName: 'Update Is Default Instance',
            access_token: actionParams.token,
            data
        })
    
        return result
    }

    const createInstanceOnboardingStep = async (actionParams: ActionParams, data: CreateOdsInstanceOnboardingStepRequest): PostOdsInstanceOnboardingStepResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${odsInstancesActionRoutes.postInstanceOnboardingStep(actionParams.tenantId, data.instanceId)}`

        const result = await postAsync<ODSInstanceUpdatedResponse, CreateOdsInstanceOnboardingStepRequest>({
            url,
            actionName: "Create Instance Onboarding Step",
            access_token: actionParams.token,
            data
        })

        return result
    }

    const updateInstanceOnboardingStep = async (actionParams: ActionParams, data: UpdateOdsInstanceOnboardingStepRequest): PutOdsInstanceOnboardingStepResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${odsInstancesActionRoutes.putInstanceOnboardingStep(actionParams.tenantId, data.instanceId, data.number)}`

        const result = await putAsync<ODSInstanceUpdatedResponse, UpdateOdsInstanceOnboardingStepRequest>({
            url,
            actionName: "Update Instance Onboarding Step",
            access_token: actionParams.token,
            data
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