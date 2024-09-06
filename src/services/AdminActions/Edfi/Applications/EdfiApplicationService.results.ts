import { EdfiApplication, EdfiApplicationAuthData } from "../../../../core/Edfi/EdfiApplications";
import { HttpServiceRequestError, HttpServiceResponse } from "../../../HttpService/HttpService.response.types";
import { DeleteEdfiApplicationResponse } from "./EdfiApplicationService.responses";

export type GetEdfiApplicationsListResult = Promise<HttpServiceResponse<EdfiApplication[]> | HttpServiceRequestError>
export type CreateEdfiApplicationResult = Promise<HttpServiceResponse<EdfiApplicationAuthData> | HttpServiceRequestError>
export type DeleteEdfiApplicationResult = Promise<HttpServiceResponse<DeleteEdfiApplicationResponse> | HttpServiceRequestError>
export type UpdateEdfiApplicationResult = Promise<HttpServiceResponse<EdfiApplication> | HttpServiceRequestError>
export type ResetEdfiApplicationCredentialsResult = Promise<HttpServiceResponse<EdfiApplicationAuthData> | HttpServiceRequestError>