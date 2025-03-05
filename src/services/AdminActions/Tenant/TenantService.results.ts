// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Tenant } from '../../../core/Tenant.types'
import {
  HttpServiceRequestError, HttpServiceResponse 
} from '../../HttpService/HttpService.response.types'
import { UpdateTenantRespose } from './TenantService.responses'

export type GetTenantResult = Promise<HttpServiceResponse<Tenant> | HttpServiceRequestError>
export type UpdateTenantResult = Promise<HttpServiceResponse<UpdateTenantRespose> | HttpServiceRequestError>