// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { EdxAppConfig } from '@edfi/admin-console-shared-sdk'

export interface ActionParams {
    tenantId: string 
    token: string
    config: EdxAppConfig
    edxApiUrl: string
}

export interface EdfiActionParams {
    tenantId: string
    config: EdxAppConfig
    token: string
    edxApiUrl: string
}