import { EdfiApplication } from "../../../../core/Edfi/EdfiApplications"
import { EdfiVendor } from "../../../../core/Edfi/EdfiVendors"
import { HttpServiceRequestError, HttpServiceResponse } from "../../../HttpService/HttpService.response.types"
import { DeleteEdfiVendorResponse } from "./EdfiVendorsService.response"

export type GetVendorsListResult = Promise<HttpServiceResponse<EdfiVendor[]> | HttpServiceRequestError>
export type GetVendorApplicationsListResult = Promise<HttpServiceResponse<EdfiApplication[]> | HttpServiceRequestError>
export type CreateEdfiVendorResult = Promise<HttpServiceResponse<EdfiVendor> | HttpServiceRequestError>
export type DeleteEdfiVendorResult = Promise<HttpServiceResponse<DeleteEdfiVendorResponse> | HttpServiceRequestError>