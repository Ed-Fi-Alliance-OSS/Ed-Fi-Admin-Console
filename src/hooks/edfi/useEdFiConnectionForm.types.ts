// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export interface EdFiConnectionFormData {
    connectionId: string | null
    connectionName?: string 
    baseUrl: string 
    key: string 
    secret: string
}

export type EdFiConnectionFormMode = 'Add' | 'Edit'

export type EdFiConnectionVerificationStatus = 'Connected' | 'Not Connected' | 'Authentication Failed' | 'URL Error' | 'Credential Error' | 'Unknown'