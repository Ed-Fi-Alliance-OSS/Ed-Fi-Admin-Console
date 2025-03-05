// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export type SSOMethodConsentStatus = 'Consented' | 'Not Selected' | 'Awaiting Consent' | 'Required'
export type SSOMethodDescriptor = 'Google' | 'Aad' | 'Local'

export interface SSOMethod {
    name: string
    descriptor:  SSOMethodDescriptor
    consentStatus: SSOMethodConsentStatus
    selected: boolean
}