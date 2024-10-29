import useHttpService from "../../../../hooks/http/useHttpService"
import { ActionParams } from "../../adminAction.types"
import edfiActionRoutes from "../../edfiActionRoutes"
import { CreateEdfiAdminConnectionRequest, GetAllConnectionsRequest, UpdateEdfiAdminConnectionRequest, VerifyEdFiAdminConnectionRequest } from "./EdfiAdminConnectionsService.requests"
import { CreatedEdFiAdminConnectionResponse, GetAllEdFiAdminConnectionsResponse, UpdatedEdFiAdminConnectionResponse, VerifyEdFiAdminConnectionResponse } from "./EdfiAdminConnectionsService.response"
import { CreateEdfiAdminConnectionResult, GetAllEdFiAdminConnectionsResult, UpdateEdfiAdminConnectionResult, VerifyEdFiAdminConnectionResult } from "./EdFiAdminConnectionsService.results"

const useEdFiAdminConnectionsService = () => {
    const { getAsync, postAsync, putAsync } = useHttpService()

    const getConnectionsList = async (actionParams: ActionParams, data: GetAllConnectionsRequest): GetAllEdFiAdminConnectionsResult => {
        const baseUrl = actionParams.edxApiUrl
        let url = `${baseUrl}/${edfiActionRoutes.getAllConnections(actionParams.tenantId)}`

        url = `${url}?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`

        if (data.orderBy)
            url = `${url}&orderBy=${data.orderBy}`
    
        const result = await getAsync<GetAllEdFiAdminConnectionsResponse>({
            url,
            actionName: 'Get Connections List',
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }
    
    const createConnection = async (actionParams: ActionParams, data: CreateEdfiAdminConnectionRequest): CreateEdfiAdminConnectionResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.createConnection(actionParams.tenantId)}`
    
        const result = await postAsync<CreatedEdFiAdminConnectionResponse, CreateEdfiAdminConnectionRequest>({
            url,
            actionName: 'Create Ed-Fi Admin Connection',
            data,
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }

    const updateConnection = async (actionParams: ActionParams, data: UpdateEdfiAdminConnectionRequest): UpdateEdfiAdminConnectionResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.updateConnection(actionParams.tenantId, data.connectionId)}`
    
        const result = await putAsync<UpdatedEdFiAdminConnectionResponse, UpdateEdfiAdminConnectionRequest>({
            url,
            actionName: 'Update Ed-Fi Admin Connection',
            data,
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }

    const verifyConnection = async (actionParams: ActionParams, data: VerifyEdFiAdminConnectionRequest): VerifyEdFiAdminConnectionResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.verifyConnection(actionParams.tenantId, data.connectionId)}`
    
        const result = await postAsync<VerifyEdFiAdminConnectionResponse, VerifyEdFiAdminConnectionRequest>({
            url,
            actionName: 'Verify Ed-Fi Admin Connection',
            data,
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }

    return {
        getConnectionsList,
        createConnection,
        updateConnection,
        verifyConnection
    }
}

export default useEdFiAdminConnectionsService