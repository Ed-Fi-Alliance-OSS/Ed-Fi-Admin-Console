// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Api } from '@edfi/admin-console-shared-sdk/dist/core/EdxApp.types'
import {
  HttpServiceRequestError, HttpServiceResponse 
} from './HttpService.response.types'

export type HttpServiceMethod = 'Get' | 'Post' | 'Put'

export interface HttpServiceRequest {
    url: string
    access_token?: string 
    actionName: string 
    options?: object
    apiConfig?: Api
}

export interface HttpServiceGetRequest extends HttpServiceRequest {}

export interface HttpServicePostRequest<TData> extends HttpServiceRequest {
    data: TData
}

export interface HttpServicePutRequest<TData> extends HttpServiceRequest {
    data: TData
}

export interface HttpServiceDeleteRequest extends HttpServiceRequest {}

export interface HttpService {
    get: <TResponse>(params: HttpServiceGetRequest) => Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>>
    post: <TResponse, TData>(params: HttpServicePostRequest<TData>) => Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>>
    put: <TResponse, TData>(params: HttpServicePutRequest<TData>) => Promise<HttpServiceRequestError  | HttpServiceResponse<TResponse>>
    delete: <TResponse>(params: HttpServiceDeleteRequest) => Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>>
}