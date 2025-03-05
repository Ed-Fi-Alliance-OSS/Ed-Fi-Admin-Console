// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export interface EdFiAdminConnection {
    id: string 
    connectionName: string 
    connectionType: string 
    databaseEngine?: string 
    edFiVersion?: string 
    edFiExtension?: string 
    hostingProvider?: string 
    allowedTenantIds?: string[]
    tiers: EdFiAdminConnectionTier[]
    createdBy: string 
    createdDateTime: string 
    lastModifiedBy: string 
    lastModifiedDateTime: string 
}

export interface EdFiAdminConnectionEndpoint {
    accessTypeId: string 
    compositesUrl: string 
    resourcesUrl: string 
}

export interface ODSEdFiAdminConnection {
    clientId: string 
    clientSecret: string 
    tokenUrl: string 
    endpoints: EdFiAdminConnectionEndpoint[]
    metadataUrl: string 
}

export interface EdFiAdminTierSqlConnection {
    sqlServer: string 
    sqlServerUserName: string 
    sqlServerPasswordSecret: string 
    azureSubscriptionId: string 
    azureResourceGroupName: string 
    azureServerName: string 
    azureServerElasticPoolName: string 
}

export interface EdFiAdminConnectionTier {
    tierId: string 
    tierName: string 
    odsApiConnection: ODSEdFiAdminConnection 
    sqlConnection: EdFiAdminTierSqlConnection 
}