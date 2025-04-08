// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export type { ODSInstance } from '@edfi/admin-console-shared-sdk'
export interface InstanceEdfiStatus {
  operationStatus: InstanceOperationStatus
}

export type InstanceOperationStatus = 'Operational' | 'Offline'

export const InstanceWorkerStatus = {
  'Pending': 'Pending to create',
  'InProgress': 'In progress',
  'Completed': 'Completed',
  'Pending_Delete': 'Pending to delete',
  'Deleted': "Deleted",
  'Delete_Failed': 'Delete failed',
  'Pending_Rename': 'Pending to rename',
  'Renamed' : 'Renamed',
  'Rename_Failed': 'Rename failed',
  'Error': 'Error'
}

export interface ODSInstanceContext {
  contextKey: 'schoolYearFromRoute'
  contextValue: string
  id: number | string
  odsInstanceId: string | number
}

export interface SelectedConnection {
  id: string
  connectionName: string
  databaseEngine: string
  edFiVersion: string
  edFiExtension: string
  hostingProvider: string
  allowedTenantIds: string[]
  tiers: Tier[]
  createdBy: string
  createdDateTime: string
  lastModifiedBy: string
  lastModifiedDateTime: string
  connectionType: string
}

export interface Tier {
  tierId: string
  tierName: string
  odsApiConnection: OdsApiConnection
  sqlConnection: SqlConnection
}

export interface Databases {
  admin: AdminDatabase
  security: SecurityDatabase
  ods: OdsDatabase[]
}

export interface AdminDatabase {
  selectedTierId: string,
  selectedTierName: string,
  status: string,
  jobs: DatabaseJobs
}

export interface SecurityDatabase {
  selectedTierId: string
  selectedTierName: string
  status: string
  jobs: DatabaseJobs
}

export interface OdsDatabase {
  selectedTierId: string
  selectedTierName: string
  status: string
  jobs: DatabaseJobs
  year: number
  odsBackupCode: string
  odsBackupDescription: string
}

export interface DatabaseJobs {
  createJobId: string
  deleteJobId: string
  resetDeleteJobId: string
  resetCreateJobId: string
  generateReportsJobId: string
}

export interface OdsApiConnection {
  clientId: string
  clientSecret: string
  tokenUrl: string
  endpoints: Endpoint[]
  metadataUrl: string
}

export interface SqlConnection {
  sqlServer: string
  sqlServerUserName: string
  sqlServerPassword: string
  azureSubscriptionId: string
  azureResourceGroupName: string
  azureServerName: string
  azureServerElasticPoolName: string
}

export interface Endpoint {
  accessTypeId?: string
  compositesUrl?: string
  resourcesUrl?: string
}

export interface AvailableInstance {
  isSelected: boolean
  district: string
  instanceYear: string
  edfiVersion: string
  edfiStatus: InstanceEdfiStatus
  workerStatus: string
}

export interface InstanceDescription {
  name: string
  description: string
  connection: string
  edfiExtension: string
  edfiVersion: string
  edfiStatus: InstanceEdfiStatus
  workerStatus: string
  tsdsVersion: string
  educationOrgId: string
  stateOrgId: string
  campusesCount: number
  staffCount: number
  studentsCount: number
  coursesCount: number
}
