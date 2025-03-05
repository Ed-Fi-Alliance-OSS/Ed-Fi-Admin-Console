// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

// import { useNavigate } from 'react-router-dom'
import {
  useAuth, useConfig, useInitialRoute
} from '@edfi/admin-console-shared-sdk'
import { useEffect } from 'react'
import routes from '../../core/routes'

const CallbackRouter = () => {
  const auth = useAuth()
  const { getInitialPath } = useInitialRoute()
  // const navigate = useNavigate()
  const { config } = useConfig()
  const selectRedirect = () => getInitialPath() ?? routes.home.url

  useEffect(() => {
    console.log('🚁 CallbackRouter', auth.isAuthenticated)
    if (auth.isAuthenticated) {
      // if the auth is authenticated, redirect to the initial path
      try {
        const redirect = selectRedirect().toString().replace(/\/\//ig, '/')
        console.log('🚁 Redirecting from Callback to', redirect)
        window.location.replace('/' + config.app.basePath)
      } catch(e) {
        console.error(e)
        // If we can't navigate, just log the error
        window.location.assign(config.app.basePath || '/')
        // navigate(config.auth.postLogoutRedirectUri, {replace: true})
      }
    } else {
      // If the auth is not authenticated, redirect to the login page
      console.log('🚁 Redirecting from Callback to Login')
      window.location.replace(config.app.basePath + '/401')
    }

  }, [])
  // return <Navigate to={selectRedirect()} replace={true} />

  return null
}

export default CallbackRouter