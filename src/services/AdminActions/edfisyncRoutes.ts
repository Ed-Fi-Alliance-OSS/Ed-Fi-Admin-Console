// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

const endpointsPrefix = 'tenants'
const edfiSyncPrefix = 'edfisync'
const getBaseEndpoint = (tenantId: string) => `${endpointsPrefix}/${tenantId}/${edfiSyncPrefix}`

const edfiSyncActionRoutes = {
  getEdFiSync: (tenantId: string) => `${getBaseEndpoint(tenantId)}`,
  getEdFiSyncById: (tenantId: string, jobId: string) => `${getBaseEndpoint(tenantId)}/${jobId}`,
  postEdFiSync: (tenantId: string) => `${getBaseEndpoint(tenantId)}`,
  putEdFiSync: (tenantId: string, jobId: string) => `${getBaseEndpoint(tenantId)}/${jobId}`,
  executeEdFiSync: (tenantId: string, jobId: string) => `${getBaseEndpoint(tenantId)}/${jobId}/execute`,
  getEdFiSyncExecutions: (tenantId: string, jobId: string) => `${getBaseEndpoint(tenantId)}/${jobId}/executions`,
  getEdFiSyncExecutionLogs: (tenantId: string, jobId: string, executionId: string) => `${getBaseEndpoint(tenantId)}/${jobId}/executions/${executionId}/logs`
}

export default edfiSyncActionRoutes