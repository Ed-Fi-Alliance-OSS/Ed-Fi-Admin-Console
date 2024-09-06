import axios, { AxiosError } from "axios"
import { HttpServiceRequestError, HttpServiceResponse } from "./HttpService.response.types"
import { HttpService, HttpServiceDeleteRequest, HttpServiceGetRequest, HttpServiceMethod, HttpServicePostRequest, HttpServicePutRequest } from "./HttpService.types"

axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
})

const includeAuthorization = (access_token) => {
    if (access_token)
        return { headers: { Authorization: `Bearer ${access_token}` } }

    return undefined
}

const createDefaultError = (method: HttpServiceMethod, actionName: string) => {
    const actionMessage = `Error for ${method}: ${actionName}`
    
    const requestError: HttpServiceRequestError = {
        message: actionMessage,
        actionMessage: `Failed to ${actionName}.`,
        statusCode: 'unknown',
        action: actionName,
        type: 'Error'
    }

    return { actionMessage, requestError }
}

const handleAxiosError = (error: AxiosError, requestError: HttpServiceRequestError) => {
    console.error(`${error.message}`, error)
    
    requestError.actionMessage = `${requestError.actionMessage} ${error.response?.status}`
    requestError.statusCode = error.response?.status ?? 'unknown'

    return requestError
}

const httpService: HttpService = {
    async get<TResponse>({ url, access_token, actionName }: HttpServiceGetRequest) {
        console.log(`Get request ${actionName} to ${url}`)

        try {
            const res = await axios.get(url, includeAuthorization(access_token))
        
            const response: HttpServiceResponse<TResponse> = {
                data: res.data,
                type: 'Response'
            }
    
            return response
        }
        catch (error) {
            const { requestError, actionMessage } = createDefaultError('Get', actionName)
    
            if (error instanceof AxiosError) {
               return handleAxiosError(error, requestError)
            } else {
                console.error(`${actionMessage}`, error)
    
                return requestError
            }
        }
    },
    async post<TResponse, TData>({ url, data, access_token, actionName }: HttpServicePostRequest<TData>) {
        console.log(`Post request ${actionName} to ${url}`)

        try {
            const res = await axios.post(url, data, includeAuthorization(access_token))
        
            const response: HttpServiceResponse<TResponse> = {
                data: res.data,
                type: 'Response'
            }
    
            return response
        }
        catch (error) {
            const { actionMessage, requestError } = createDefaultError('Post', actionName)
    
            if (error instanceof AxiosError) {
                return handleAxiosError(error, requestError)
            } else {
                console.error(`${actionMessage}`, error)
    
                return requestError
            }
        }
    },
    async put<TResponse, TData>({ url, data, access_token, actionName }: HttpServicePutRequest<TData>) {
        console.log(`Put request ${actionName} to ${url}`)

        try {
            const res = await axios.put(url, data, includeAuthorization(access_token))
        
            const response: HttpServiceResponse<TResponse> = {
                data: res.data,
                type: 'Response'
            }
    
            return response
        }
        catch (error) {
            const { actionMessage, requestError } = createDefaultError('Put', actionName)
    
            if (error instanceof AxiosError) {
                return handleAxiosError(error, requestError)
            } else {
                console.error(`${actionMessage}`, error)
    
                return requestError
            }
        }
    },
    async delete<TResponse>({ url, access_token, actionName }: HttpServiceDeleteRequest) {
        console.log(`Delete request ${actionName} to ${url}`)

        try {
            const res = await axios.delete(url, includeAuthorization(access_token))
        
            const response: HttpServiceResponse<TResponse> = {
                data: res.data,
                type: 'Response'
            }
    
            return response
        }
        catch (error) {
            const { requestError, actionMessage } = createDefaultError('Get', actionName)
    
            if (error instanceof AxiosError) {
               return handleAxiosError(error, requestError)
            } else {
                console.error(`${actionMessage}`, error)
    
                return requestError
            }
        }
    }
}

export default httpService