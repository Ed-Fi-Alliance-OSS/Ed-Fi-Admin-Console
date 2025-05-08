// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Tenant } from '../../../core/Tenant.types'

export interface IntTenantDomain {
    domainStatus: number
    tenantId: string 
    domainName: string 
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string
}

export type GetTenantResponse = Tenant

export interface UpdateTenantRespose {
    tenantId: string 
}