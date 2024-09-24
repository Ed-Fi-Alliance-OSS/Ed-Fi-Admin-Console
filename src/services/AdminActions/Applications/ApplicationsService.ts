import axios, { AxiosError } from "axios"
import { ActionParams } from "../adminAction.types"
import adminActionRoutes from "../tenantActionRoutes"
import { GetTenantApplicationsResponse } from "./ApplicationsService.responses"
import { GetApplicationsResult } from "./ApplicationsService.results"

const getApplicationsList = async (actionParams: ActionParams): GetApplicationsResult => {
    const baseUrl = actionParams.edxApiUrl
    const queryParams = `pageIndex=${0}&pageSize=${100}`

    const endpointUrl = `${baseUrl}/${adminActionRoutes.getApplicationsList(actionParams.tenantId)}?${queryParams}`

    console.log('get tenants applications list request to: ', endpointUrl)

    try {
        const res = await axios.get(endpointUrl, {
            headers: {
                Authorization: `Bearer ${actionParams.token}`,
            }
        })

        const applicationsList: GetTenantApplicationsResponse = res.data

        return applicationsList
    }
    catch (error) {
        if (error instanceof AxiosError) {
            console.error(error.message)
        }else {
            console.error("Error for Get: Applications List", error)
        }
        
        return null
    }
}

export {
    getApplicationsList
}