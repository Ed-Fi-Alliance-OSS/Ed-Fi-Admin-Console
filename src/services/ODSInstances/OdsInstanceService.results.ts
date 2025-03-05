// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  HttpServiceRequestError, HttpServiceResponse
} from '../HttpService/HttpService.response.types'
import {
  GetOdsInstancesListResponse, ODSInstanceUpdatedResponse, UpdateODSInstanceIsDefaultResponse
} from './OdsInstanceService.responses'

export type GetOdsInstancesListResult = Promise<HttpServiceResponse<GetOdsInstancesListResponse> | HttpServiceRequestError>
export type PutOdsInstanceIsDefaultResult = Promise<HttpServiceResponse<UpdateODSInstanceIsDefaultResponse> | HttpServiceRequestError>

// Instance Onboarding
export type PostOdsInstanceOnboardingStepResult = Promise<HttpServiceResponse<ODSInstanceUpdatedResponse> | HttpServiceRequestError>
export type PutOdsInstanceOnboardingStepResult = Promise<HttpServiceResponse<ODSInstanceUpdatedResponse> | HttpServiceRequestError>