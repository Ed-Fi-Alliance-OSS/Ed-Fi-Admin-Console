import useHttpService from "../../../hooks/http/useHttpService"
import { HttpServiceResponse } from "../../HttpService/HttpService.response.types"
import { ActionParams } from "../adminAction.types"
import { getDomainStatus } from "../Tenant/TenantMapper"
import tenantActionRoutes from "../tenantActionRoutes"
import { PostDomainRequest, VerifyDomainRequest } from "./DomainService.request"
import { DeleteDomainResponse, PostDomainResponse, VerifyDomainResponse, VerifyDomainResponseInt } from "./DomainService.response"
import { DeleteDomainResult, PostDomainResult, VerifyDomainResult } from "./DomainsService.result"

const useDomainsService = () => {
    const { postAsync, putAsync, deleteAsync } = useHttpService()

    const createDomain = async (actionParams: ActionParams, data: PostDomainRequest): PostDomainResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${tenantActionRoutes.postDomain(actionParams.tenantId)}`
    
        const result = await postAsync<PostDomainResponse, PostDomainRequest>({
            url,
            data,
            access_token: actionParams.token,
            actionName: 'Post Domain',
            apiConfig: actionParams.config.api
        })
    
        return result
    }

    const verifyDomain = async (actionParams: ActionParams, data: VerifyDomainRequest) : VerifyDomainResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${tenantActionRoutes.verifyDomain(actionParams.tenantId, data.domainName)}`
    
        const result = await putAsync<VerifyDomainResponseInt, VerifyDomainRequest>({
            url,
            data,
            access_token: actionParams.token,
            actionName: 'Verify Domain',
            apiConfig: actionParams.config.api
        })

        if (result.type === 'Response') {
            const mappedResult: HttpServiceResponse<VerifyDomainResponse> = {
                data: {
                    domainName: result.data.domainName,
                    tenantId: result.data.tenantId,
                    domainStatus: getDomainStatus(result.data.domainStatus)
                },
                type: 'Response'
            }

            return mappedResult
        }
    
        return result
    }

    const deleteDomain = async (actionParams: ActionParams, domainName: string) : DeleteDomainResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${tenantActionRoutes.deleteDomain(actionParams.tenantId, domainName)}`

        const result = await deleteAsync<DeleteDomainResponse>({
            url,
            actionName: "Delete Domain",
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })

        return result 
    }

    return {
        createDomain,
        verifyDomain,
        deleteDomain
    }
}

export default useDomainsService