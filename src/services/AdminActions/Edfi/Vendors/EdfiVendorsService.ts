import { EdfiApplication } from "../../../../core/Edfi/EdfiApplications"
import { EdfiVendor } from "../../../../core/Edfi/EdfiVendors"
import useHttpService from "../../../../hooks/http/useHttpService"
import { EdfiActionParams } from "../../adminAction.types"
import edfiActionRoutes from "../../edfiActionRoutes"
import { CreateEdfiVendorRequest, DeleteEdfiVendorRequest } from "./EdfiVendorsService.requests"
import { DeleteEdfiVendorResponse } from "./EdfiVendorsService.response"
import { CreateEdfiVendorResult, DeleteEdfiVendorResult, GetVendorApplicationsListResult, GetVendorsListResult } from "./EdfiVendorsService.results"

const useEdfiVendorsService = () => {
    const { getAsync, postAsync, deleteAsync } = useHttpService()

    const getVendorsList = async (actionParams: EdfiActionParams): GetVendorsListResult => {
        const baseUrl = actionParams.edxApiUrl
        // const url = `${baseUrl}/${edfiActionRoutes.getVendorsList(actionParams.tenantId)}`
        const url = 'data-vendors.json'
    
        const result = await getAsync<EdfiVendor[]>({
            url,
            actionName: 'Get Vendors List',
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }
    
    const getVendorApplications = async (actionParams: EdfiActionParams, vendorId: string): GetVendorApplicationsListResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.getVendorApplicationsList(actionParams.tenantId, vendorId)}`
    
        const result = await getAsync<EdfiApplication[]>({
            url,
            actionName: 'Get Vendor Applications List',
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }
    
    const createVendor = async (actionParams: EdfiActionParams, data: CreateEdfiVendorRequest): CreateEdfiVendorResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.createVendor(actionParams.tenantId)}`
    
        const result = await postAsync<EdfiVendor, CreateEdfiVendorRequest>({
            url,
            actionName: 'Create Vendor',
            data,
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }

    const deleteVendor = async (actionParams: EdfiActionParams, data: DeleteEdfiVendorRequest): DeleteEdfiVendorResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.deleteVendorById(actionParams.tenantId, data.vendorId)}`

        const result = await deleteAsync<DeleteEdfiVendorResponse>({
            url,
            actionName: "Delete Vendor",
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })

        return result
    }

    // Ed-Fi Admin By School Year
    const getVendorsListForSchoolYear = async (actionParams: EdfiActionParams, year: number): GetVendorsListResult => {
        const baseUrl = actionParams.edxApiUrl
        // const url = `${baseUrl}/${edfiActionRoutes.getVendorsListForSchoolYear(actionParams.tenantId, year)}`
        const url = "/mockdata/data-vendors.json"

        const result = await getAsync<EdfiVendor[]>({
            url,
            actionName: 'Get Vendors List',
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }
    
    const getVendorApplicationsForSchoolYear = async (actionParams: EdfiActionParams, vendorId: string, year: number): GetVendorApplicationsListResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.getVendorApplicationsListForSchoolYear(actionParams.tenantId, vendorId, year)}`
    
        const result = await getAsync<EdfiApplication[]>({
            url,
            actionName: 'Get Vendor Applications List',
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }

    const createVendorForSchoolYear = async (actionParams: EdfiActionParams, data: CreateEdfiVendorRequest, year: number): CreateEdfiVendorResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.createVendorForSchoolYear(actionParams.tenantId, year)}`
    
        const result = await postAsync<EdfiVendor, CreateEdfiVendorRequest>({
            url,
            actionName: 'Create Vendor',
            data,
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })
    
        return result
    }

    const deleteVendorForSchoolYear = async (actionParams: EdfiActionParams, data: DeleteEdfiVendorRequest, year: number): DeleteEdfiVendorResult => {
        const baseUrl = actionParams.edxApiUrl
        const url = `${baseUrl}/${edfiActionRoutes.deleteVendorByIdForSchoolYear(actionParams.tenantId, data.vendorId, year)}`

        const result = await deleteAsync<DeleteEdfiVendorResponse>({
            url,
            actionName: "Delete Vendor",
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })

        return result
    }

    return {
        getVendorsList,
        getVendorApplications,
        createVendor,
        deleteVendor,
        getVendorsListForSchoolYear,
        getVendorApplicationsForSchoolYear,
        createVendorForSchoolYear,
        deleteVendorForSchoolYear
    }
}

export default useEdfiVendorsService