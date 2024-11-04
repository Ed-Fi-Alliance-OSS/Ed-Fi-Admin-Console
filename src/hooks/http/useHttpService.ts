import { TEEAuthDataContext } from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { HttpServiceContext } from '../../context/httpServiceContext'
import routes from '../../core/routes'
import { HttpServiceRequestError, HttpServiceResponse } from '../../services/HttpService/HttpService.response.types'
import { HttpServiceGetRequest, HttpServicePostRequest, HttpServicePutRequest, HttpServiceDeleteRequest } from '../../services/HttpService/HttpService.types'

const useHttpService = () => {
  const { edxAppConfig } = useContext(TEEAuthDataContext)
  const { httpService, redirectOnError: redirectIfError } = useContext(HttpServiceContext)
  const navigate = useNavigate()

  const redirectOnError = (result: HttpServiceRequestError) => {
    if (redirectIfError && edxAppConfig) {
      let destination
            
      if (result.statusCode === 403)
        destination = routes.unauthorized.url
      else if (result.statusCode === 404)
        destination = routes.notFound.url
      else if (result.statusCode === 500)
        destination = routes.internalError.url

      if(destination !== null && destination !== undefined)
        navigate(`${destination}`)
    }
  }

  const getAsync = async <TResponse>(params: HttpServiceGetRequest): Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>> => {
    const result = await httpService.get<TResponse>(params)

    if (result.type === 'Error')
      redirectOnError(result)

    return result
  }

  const postAsync = async <TResponse, TData>(params: HttpServicePostRequest<TData>): Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>> => {
    const result = await httpService.post<TResponse, TData>(params)

    if (result.type === 'Error' && (result.statusCode === 403 || result.statusCode === 404))
      redirectOnError(result)

    return result
  }

  const putAsync = async <TResponse, TData>(params: HttpServicePutRequest<TData>): Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>> => {
    const result = await httpService.put<TResponse, TData>(params)

    if (result.type === 'Error')
      redirectOnError(result)

    return result
  }

  const deleteAsync = async <TResponse>(params: HttpServiceDeleteRequest): Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>> => {
    const result = await httpService.delete<TResponse>(params)

    if (result.type === 'Error')
      redirectOnError(result)

    return result
  }

  const getSimpleAsync = async <TResponse>(params: HttpServiceGetRequest): Promise<HttpServiceRequestError | HttpServiceResponse<TResponse>> =>
    await httpService.get<TResponse>(params)

  return {
    getAsync,
    postAsync,
    putAsync,
    deleteAsync,
    getSimpleAsync
  }
}

export default useHttpService