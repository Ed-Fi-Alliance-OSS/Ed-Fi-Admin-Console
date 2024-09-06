import { HttpServiceRequestError, HttpServiceResponse } from "./HttpService.response.types";

export type HttpServiceMethod = 'Get' | 'Post' | 'Put'

export interface HttpServiceRequest {
    url: string
    access_token?: string 
    actionName: string 
    options?: object
}

export interface HttpServiceGetRequest extends HttpServiceRequest {}

export interface HttpServicePostRequest<TData> extends HttpServiceRequest {
    data: TData
}

export interface HttpServicePutRequest<TData> extends HttpServiceRequest {
    data: TData
}

export interface HttpServiceDeleteRequest extends HttpServiceRequest {}

export interface HttpService {
    get: <TResponse>(params: HttpServiceGetRequest) => Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>>
    post: <TResponse, TData>(params: HttpServicePostRequest<TData>) => Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>>
    put: <TResponse, TData>(params: HttpServicePutRequest<TData>) => Promise<HttpServiceRequestError  | HttpServiceResponse<TResponse>>
    delete: <TResponse>(params: HttpServiceDeleteRequest) => Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>>
}