import {
  HttpServiceRequestError, HttpServiceResponse 
} from '../../../HttpService/HttpService.response.types'
import {
  CreatedEdFiAdminConnectionResponse, GetAllEdFiAdminConnectionsResponse, UpdatedEdFiAdminConnectionResponse, VerifyEdFiAdminConnectionResponse 
} from './EdfiAdminConnectionsService.response'

export type GetAllEdFiAdminConnectionsResult = Promise<HttpServiceResponse<GetAllEdFiAdminConnectionsResponse> | HttpServiceRequestError>
export type CreateEdfiAdminConnectionResult = Promise<HttpServiceResponse<CreatedEdFiAdminConnectionResponse> | HttpServiceRequestError>
export type UpdateEdfiAdminConnectionResult = Promise<HttpServiceResponse<UpdatedEdFiAdminConnectionResponse> | HttpServiceRequestError>
export type VerifyEdFiAdminConnectionResult = Promise<HttpServiceResponse<VerifyEdFiAdminConnectionResponse> | HttpServiceRequestError>