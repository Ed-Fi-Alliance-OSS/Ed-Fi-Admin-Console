import { createContext } from 'react'
import httpService from '../services/HttpService/HttpService'
import { HttpService } from '../services/HttpService/HttpService.types'

interface IHttpServiceContext {
    redirectOnError: boolean
    httpService: HttpService
}

const HttpServiceContext = createContext<IHttpServiceContext>({
  httpService,
  redirectOnError: false
})

interface HttpServiceContextProviderProps {
    children: JSX.Element
    redirectOnError: boolean 
}

const HttpServiceContextProvider = ({ children, redirectOnError }: HttpServiceContextProviderProps) => {
  return (
    <HttpServiceContext.Provider value={{ httpService, redirectOnError }}>
      { children }           
    </HttpServiceContext.Provider>
  )
}

export {
  HttpServiceContext,
  HttpServiceContextProvider
}