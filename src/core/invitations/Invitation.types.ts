// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export type InvitationStatus = 'Unknown' | 'Sent' | 'Accepted'

export interface InvitationRoles {
    tenantId: string 
    applicationId: string 
    roles: string[]
}

export interface Invitation {
    tenantId: string 
    invitationId: string 
    firstName: string 
    lastName: string 
    email: string 
    role: string 
    invitationToken: string
    invitationStatus: InvitationStatus
    invitationSendDateTime: string 
    assignLicenseRequests: InvitationRoles[]
}