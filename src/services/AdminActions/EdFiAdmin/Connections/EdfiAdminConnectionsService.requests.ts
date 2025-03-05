// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export interface GetAllConnectionsRequest {
    pageIndex: number 
    pageSize: number 
    orderBy?: string 
    filter?: string
}

export interface CreateEdfiAdminConnectionRequest {
    tenantId: string 
    connectionType: string 
    connectionName: string 
    edFiVersion: string 
    edFiExtension: string 
    metadataUrl: string 
    clientId: string 
    clientSecret: string 
    tokenUrl?: string 
}

export interface UpdateEdfiAdminConnectionRequest {
    tenantId: string 
    connectionId: string
    connectionType: string 
    connectionName: string 
    edFiVersion: string 
    edFiExtension: string 
    metadataUrl: string 
    clientId: string 
    clientSecret: string 
    tokenUrl: string 
}

export interface VerifyEdFiAdminConnectionRequest {
    tenantId: string 
    connectionId: string 
    deleteConnection: boolean
}