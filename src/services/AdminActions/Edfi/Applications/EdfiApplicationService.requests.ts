// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export interface CreateEdfiApplicationRequest {
    applicationName: string
    vendorId: number 
    claimSetName: string 
    profileId?: number 
    educationOrganizationIds: number[]
    odsInstanceIds?: number[]
}

export interface DeleteEdfiApplicationRequest {
    applicationId: string
}

export interface UpdateEdfiApplicationRequest {
    applicationName: string
    vendorId: number 
    claimSetName: string 
    profileId?: number 
    educationOrganizationIds: number[]
    odsInstanceIds?: number[]
}

export interface ResetEdfiApplicationCredentialsRequest {
    applicationId: string
}