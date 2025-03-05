// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  EdfiApplication, EdfiApplicationAuthData 
} from '../../../../core/Edfi/EdfiApplications'
import {
  HttpServiceRequestError, HttpServiceResponse 
} from '../../../HttpService/HttpService.response.types'
import { DeleteEdfiApplicationResponse } from './EdfiApplicationService.responses'

export type GetEdfiApplicationsListResult = Promise<HttpServiceResponse<EdfiApplication[]> | HttpServiceRequestError>
export type CreateEdfiApplicationResult = Promise<HttpServiceResponse<EdfiApplicationAuthData> | HttpServiceRequestError>
export type DeleteEdfiApplicationResult = Promise<HttpServiceResponse<DeleteEdfiApplicationResponse> | HttpServiceRequestError>
export type UpdateEdfiApplicationResult = Promise<HttpServiceResponse<EdfiApplication> | HttpServiceRequestError>
export type ResetEdfiApplicationCredentialsResult = Promise<HttpServiceResponse<EdfiApplicationAuthData> | HttpServiceRequestError>