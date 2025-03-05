// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { EdfiApplication } from '../../../../core/Edfi/EdfiApplications'
import { EdfiVendor } from '../../../../core/Edfi/EdfiVendors'
import {
  HttpServiceRequestError, HttpServiceResponse 
} from '../../../HttpService/HttpService.response.types'
import { DeleteEdfiVendorResponse } from './EdfiVendorsService.response'

export type GetVendorsListResult = Promise<HttpServiceResponse<EdfiVendor[]> | HttpServiceRequestError>
export type GetVendorApplicationsListResult = Promise<HttpServiceResponse<EdfiApplication[]> | HttpServiceRequestError>
export type CreateEdfiVendorResult = Promise<HttpServiceResponse<EdfiVendor> | HttpServiceRequestError>
export type DeleteEdfiVendorResult = Promise<HttpServiceResponse<DeleteEdfiVendorResponse> | HttpServiceRequestError>