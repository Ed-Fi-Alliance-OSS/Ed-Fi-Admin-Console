import { HttpServiceRequestError, HttpServiceResponse } from "../../HttpService/HttpService.response.types"
import { SubscriptionsListData } from "./SubscriptionsResponseMapper.types"
import { AddSubscriptionResponse, UpdateSubscriptionResponse } from "./SubscriptionsService.responses"

export type GetSubscriptionsListResult = Promise<HttpServiceResponse<SubscriptionsListData> | HttpServiceRequestError>
export type AddSubscriptionResult = Promise<HttpServiceResponse<AddSubscriptionResponse> | HttpServiceRequestError>
export type UpdateSubscriptionResult = Promise<HttpServiceResponse<UpdateSubscriptionResponse> | HttpServiceRequestError>
