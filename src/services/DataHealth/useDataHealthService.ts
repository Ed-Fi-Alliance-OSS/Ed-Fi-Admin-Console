import useHttpService from "../../hooks/http/useHttpService"
import { ActionParams } from "../AdminActions/adminAction.types"
import tenantActionRoutes from "../AdminActions/tenantActionRoutes"
import { GetDataHealthDistrictDetailsResponse } from "./DataHealthService.responses"
import { GetDataHealthDistrictDetailsResult } from "./DataHealthService.results"

const useDataHealthService = () => {
    const { getSimpleAsync } = useHttpService()
    
    const getDataHealthInfo = async (actionParams: ActionParams): GetDataHealthDistrictDetailsResult => {
        const baseUrl = actionParams.edxApiUrl
        // const url = `${baseUrl}/${tenantActionRoutes.getHealthCheckDistrictDetails(actionParams.tenantId)}`
        const url = `/data-healthcheck.json`
    
        const result = await getSimpleAsync<GetDataHealthDistrictDetailsResponse>({
            url,
            actionName: 'Get Data Health Info',
            access_token: actionParams.token
        })
    
        return result
    }

    const getOdsInstanceDataHealthInfo = async (actionParams: ActionParams, year: number): GetDataHealthDistrictDetailsResult => {
        const baseUrl = actionParams.edxApiUrl
        // const url = `${baseUrl}/${tenantActionRoutes.getOdsInstanceHealthCheckDistrictDetails(actionParams.tenantId, year)}`
        const url = '/data-healthcheck.json'
        const result = await getSimpleAsync<GetDataHealthDistrictDetailsResponse>({
            url,
            actionName: 'Get School Year Data Health Info',
            access_token: actionParams.token
        })
    
        return result
    }

    return {
        getDataHealthInfo,
        getOdsInstanceDataHealthInfo
    }
}

export default useDataHealthService