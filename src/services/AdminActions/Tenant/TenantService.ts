import { ActionParams } from "../adminAction.types"
import adminActionRoutes from "../tenantActionRoutes"
import { UpdateTenantRequest } from "./TenantService.requests"
import { GetTenantResult, UpdateTenantResult } from "./TenantService.results"
import { GetTenantResponse } from "./TenantService.responses"
import { mapToTenant } from "./TenantMapper"
import { HttpServiceResponse } from "../../HttpService/HttpService.response.types"
import { Tenant } from "../../../core/Tenant.types"
import useHttpService from "../../../hooks/http/useHttpService"

const useTenantService = () => {
    const { getAsync, putAsync } = useHttpService()

    const getTenant = async (actionParams: ActionParams): GetTenantResult => {
        const baseUrl = actionParams.edxApiUrl
        // const url = `${baseUrl}/${adminActionRoutes.getTenant(actionParams.tenantId)}`
        const url = '/mockdata/data-tenants.json'
    
        const result = await getAsync<GetTenantResponse>({
            url,
            access_token: actionParams.token,
            actionName: 'Get Tenant'
        })
    
        if (result.type === 'Response') {
            const mappedResult: HttpServiceResponse<Tenant> = {
                data: mapToTenant(result.data),
                type: 'Response'
            }
    
            return mappedResult
        }
    
        return result
    }
    
    const updateTenant = async (actionParams: ActionParams, data: UpdateTenantRequest): UpdateTenantResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${adminActionRoutes.putTenant(actionParams.tenantId)}`
    
        const result = await putAsync<GetTenantResponse, UpdateTenantRequest>({
            url,
            actionName: 'Update Tenant',
            access_token: actionParams.token,
            data
        })
    
        return result
    }
    
    return {
        getTenant,
        updateTenant
    }
}

export default useTenantService