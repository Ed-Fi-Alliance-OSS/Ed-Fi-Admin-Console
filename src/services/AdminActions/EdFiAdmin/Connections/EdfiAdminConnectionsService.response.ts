// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { EdFiAdminConnection } from '../../../../core/EdFiAdmin/EdFiAdmin.types'

export interface GetAllEdFiAdminConnectionsResponse {
    pageIndex: number 
    pageSize: number 
    count: number 
    data: EdFiAdminConnection[]
}

export interface CreatedEdFiAdminConnectionResponse {
    tenantId: string 
    connectionId: string 
}

export interface UpdatedEdFiAdminConnectionResponse {
    tenantId: string 
    connectionId: string 
}

export interface VerifyEdFiAdminConnectionResponse {
    status: string 
    details: string
}