// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export interface EdfiApplicationProfile {
  id: number
}

export interface EdfiApplication {
  id: number
  applicationName?: string
  claimSetName?: string
  educationOrganizationIds?: number[]
  odsInstanceIds?: Array<number>
  vendorId?: number
  profileIds?: Array<number>
}

export interface EdfiApplicationAuthData {
  id: number
  key?: string
  secret?: string
}