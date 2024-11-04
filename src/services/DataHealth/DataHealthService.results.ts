import { HttpServiceRequestError, HttpServiceResponse } from '../HttpService/HttpService.response.types'
import { GetDataHealthDistrictDetailsResponse } from './DataHealthService.responses'

export type GetDataHealthDistrictDetailsResult = Promise<HttpServiceResponse<GetDataHealthDistrictDetailsResponse> | HttpServiceRequestError>