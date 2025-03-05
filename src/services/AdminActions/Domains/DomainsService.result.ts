// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  HttpServiceRequestError, HttpServiceResponse 
} from '../../HttpService/HttpService.response.types'
import {
  DeleteDomainResponse, PostDomainResponse, VerifyDomainResponse 
} from './DomainService.response'

export type PostDomainResult = Promise<HttpServiceResponse<PostDomainResponse> | HttpServiceRequestError>
export type VerifyDomainResult = Promise<HttpServiceResponse<VerifyDomainResponse> | HttpServiceRequestError>
export type DeleteDomainResult = Promise<HttpServiceResponse<DeleteDomainResponse> | HttpServiceRequestError>