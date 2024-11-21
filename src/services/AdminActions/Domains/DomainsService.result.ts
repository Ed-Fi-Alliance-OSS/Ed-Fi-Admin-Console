import {
  HttpServiceRequestError, HttpServiceResponse 
} from '../../HttpService/HttpService.response.types'
import {
  DeleteDomainResponse, PostDomainResponse, VerifyDomainResponse 
} from './DomainService.response'

export type PostDomainResult = Promise<HttpServiceResponse<PostDomainResponse> | HttpServiceRequestError>
export type VerifyDomainResult = Promise<HttpServiceResponse<VerifyDomainResponse> | HttpServiceRequestError>
export type DeleteDomainResult = Promise<HttpServiceResponse<DeleteDomainResponse> | HttpServiceRequestError>