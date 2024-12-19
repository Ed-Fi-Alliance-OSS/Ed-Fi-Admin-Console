import {
  HttpServiceRequestError, HttpServiceResponse 
} from '../../HttpService/HttpService.response.types'
import { CreatedConnectionResponse } from './DataSynct.response'

export type CreateConnectionResult = Promise<HttpServiceResponse<CreatedConnectionResponse> | HttpServiceRequestError>