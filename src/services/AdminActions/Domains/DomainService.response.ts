// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { DomainStatus } from '../../../core/Tenant.types'

export interface PostDomainResponse {
    tenantId: string
    domainName: string
}

export interface VerifyDomainResponseInt {
    tenantId: string
    domainName: string
    domainStatus: number
}

export interface VerifyDomainResponse {
    tenantId: string
    domainName: string
    domainStatus: DomainStatus
}

export interface DeleteDomainResponse {}