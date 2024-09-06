import { EdfiActionParams } from "../../adminAction.types"
import { GetVersionResult } from "./EdfiVersionService.result"
import { GetEdfiVersionResponse } from "./EdfiVersionService.response"
import edfiActionRoutes from "../../edfiActionRoutes"
import useHttpService from "../../../../hooks/http/useHttpService"

const useEdfiVersionService = () => {
    const { getAsync } = useHttpService()

    const getEdfiVersion = async (actionParams: EdfiActionParams): GetVersionResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.getVersion(actionParams.tenantId)}`
    
        const result = await getAsync<GetEdfiVersionResponse>({ 
            actionName: "Get Edfi API Version",  
            access_token: actionParams.token,
            url
        })
    
        return result
    }
    
    return {
        getEdfiVersion
    }
}

export default useEdfiVersionService