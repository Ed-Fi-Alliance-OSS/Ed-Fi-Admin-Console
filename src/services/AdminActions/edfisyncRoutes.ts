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