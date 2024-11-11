import { HttpServiceRequestError, HttpServiceResponse } from '../../HttpService/HttpService.response.types'
import { GetPermissionsResponse } from './PermissionsService.response'

export type GetPermissionsResult = Promise<HttpServiceResponse<GetPermissionsResponse> | HttpServiceRequestError>