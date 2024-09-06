import { ActionParams } from "../adminAction.types"
import adminActionRoutes from "../tenantActionRoutes"
import SubscriptionsResponseMapper from "./SubscriptionsResponseMapper"
import { AddSubscriptionRequest, GetSubscriptionsListRequest, UpdateSubscriptionRequest } from "./SubscriptionsService.requests"
import { AddSubscriptionResponse, GetSubscriptionsListResponse, UpdateSubscriptionResponse } from "./SubscriptionsService.responses"
import { AddSubscriptionResult, GetSubscriptionsListResult, UpdateSubscriptionResult } from "./SubscriptionsService.results"
import { HttpServiceResponse } from "../../HttpService/HttpService.response.types"
import { SubscriptionsListData } from "./SubscriptionsResponseMapper.types"
import useHttpService from "../../../hooks/http/useHttpService"

const useSubscriptionsService = () => {
    const { getAsync, postAsync, putAsync } = useHttpService()

    const getSubscriptionsList = async (actionParams: ActionParams, requestData: GetSubscriptionsListRequest): GetSubscriptionsListResult => {
        const { pageIndex, pageSize } = requestData
    
        const baseUrl = actionParams.edxApiUrl
        let queryParams = `pageIndex=${pageIndex}&pageSize=${pageSize}`

        if (requestData.filter)
            queryParams = `${queryParams}&filter=${requestData.filter}`

        if (requestData.orderBy)
            queryParams = `${queryParams}&orderBy=${requestData.orderBy}`

        const url = `${baseUrl}/${adminActionRoutes.getSubscriptionsList(actionParams.tenantId)}?${queryParams}`
    
        const result = await getAsync<GetSubscriptionsListResponse>({ 
            access_token: actionParams.token,
            actionName: ' Get Subscriptions List', 
            url
        })
    
        if (result.type === 'Response') {
            const mappedResult: HttpServiceResponse<SubscriptionsListData> = {
                data: SubscriptionsResponseMapper.mapToSubscriptionsList(result.data),
                type: 'Response'
            }
    
            return mappedResult
        }
    
        return result
    }
    
    const addSubscription = async (actionParams: ActionParams, data: AddSubscriptionRequest) : AddSubscriptionResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${adminActionRoutes.postCreateSubscription(actionParams.tenantId)}`
    
        const result = await postAsync<AddSubscriptionResponse, AddSubscriptionRequest>({ 
            access_token: actionParams.token,
            actionName: ' Get Subscriptions List', 
            data,
            url
        })
    
        return result
    }
    
    const updateSubscription = async (actionParams: ActionParams, data: UpdateSubscriptionRequest) : UpdateSubscriptionResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${adminActionRoutes.putUpdateSubscription(actionParams.tenantId, data.subscriptionId)}`
    
        const result = await putAsync<UpdateSubscriptionResponse, UpdateSubscriptionRequest>({
            access_token: actionParams.token,
            actionName: "Update Subscription",
            data,
            url
        })
    
        return result
    }
    
    return {
        getSubscriptionsList,
        addSubscription,
        updateSubscription
    }
}

export default useSubscriptionsService
