// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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
    <HttpServiceContext.Provider value={{
      httpService,
      redirectOnError 
    }}
    >
      { children }           
    </HttpServiceContext.Provider>
  )
}

export {
  HttpServiceContext,
  HttpServiceContextProvider
}