// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  HttpServiceRequestError, HttpServiceResponse 
} from '../../HttpService/HttpService.response.types'
import { SubscriptionsListData } from './SubscriptionsResponseMapper.types'
import {
  AddSubscriptionResponse, UpdateSubscriptionResponse 
} from './SubscriptionsService.responses'

export type GetSubscriptionsListResult = Promise<HttpServiceResponse<SubscriptionsListData> | HttpServiceRequestError>
export type AddSubscriptionResult = Promise<HttpServiceResponse<AddSubscriptionResponse> | HttpServiceRequestError>
export type UpdateSubscriptionResult = Promise<HttpServiceResponse<UpdateSubscriptionResponse> | HttpServiceRequestError>
