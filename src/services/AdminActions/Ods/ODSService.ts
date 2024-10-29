import { EdfiActionParams } from "../adminAction.types"
import { Descriptor, EducationOrganization, GetDescriptorsResult, GetEducationOrganizationsResult } from "./ODSService.results"
import odsActionsList from "../odsActionRoutes"
import useHttpService from "../../../hooks/http/useHttpService"

const useODSService = () => {
    const { getAsync } = useHttpService()

    const getEducationOrganizations = async (actionParams: EdfiActionParams): GetEducationOrganizationsResult => {
        const baseUrl = actionParams.edxApiUrl
        // const url = `${baseUrl}/${odsActionsList.getEducationOrganizationsList()}?pageIndex=0&pageSize=10`
        const url = "/mockdata/data-applications.json"
        // TODO: Adapt to use the structure returned by adminapi
        //const url = apiConfig?.useLocalMockData ?? false
        //    ? "/mockdata/data-applications.json"
        //    : `${baseUrl}/v2/applications`
        const result = await getAsync<EducationOrganization[]>({
            url,
            actionName: 'Get Edfi Applications List',
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }
    
    const getDescriptors = async (actionParams: EdfiActionParams): GetDescriptorsResult => {
        const baseUrl = actionParams.edxApiUrl
        // const url = `${baseUrl}/${odsActionsList.getDescriptorsList()}?pageIndex=0&pageSize=100`
        const url = "/mockdata/data-applications.json"
        // TODO: Adapt to use the structure returned by adminapi
        //const url = apiConfig?.useLocalMockData ?? false
        //    ? "/mockdata/data-applications.json"
        //    : `${baseUrl}/v2/applications`
        const result = await getAsync<Descriptor[]>({
            url,
            actionName: 'Get Edfi Applications List',
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }
    
    return {
        getEducationOrganizations,
        getDescriptors
    }
}

export default useODSService