// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  useEffect, useState 
} from 'react'
import { EdxAppConfig } from '@edfi/admin-console-shared-sdk'

interface UseFetchAppAuthConfig {
    env: string | undefined
    serverMode: string | undefined
}

const configUri = `${import.meta.env.BASE_URL}config.json`

interface FetchConfigParams {
    env: string | undefined
    serverMode: string | undefined
}

const fetchConfig = async ({ env, serverMode }: FetchConfigParams) => {
  const serveMode = serverMode && serverMode[serverMode.length - 1] === ''? serverMode.substring(0, serverMode.length - 1) : serverMode
  let uri = ''

  if (env) {
    if (serveMode === 'node') {
      uri = configUri
    } else {
      uri = '/local.config.json'
    }
  } else {
    uri = configUri
  }

  const configData = await fetch(uri)
  const config = await configData.json()

  return config
}

export const mapEdxToAppConfig = (edxConfig): EdxAppConfig => {
  const authConfig: EdxAppConfig = {
    title: edxConfig.app.subtitle,
    appName: edxConfig.app.subtitle,
    api: edxConfig.api.baseUri,
    basePath: edxConfig.app.basePath,
    ...edxConfig.auth
  }

  return authConfig
}

declare global {
  export interface Window {
    config: any
  }
}


const useFetchConfig = ({ env, serverMode }: UseFetchAppAuthConfig) => {
  const [ appConfig, setAppConfig ] = useState<EdxAppConfig | null>(null)

  const fetchAppConfig = async () => {
    const edxConfig = await fetchConfig({
      env,
      serverMode 
    })

    window.config = edxConfig
    setAppConfig(mapEdxToAppConfig(edxConfig))
  }

  useEffect(() => {
    fetchAppConfig()
  }, [])

  return { appConfig }
}

export default useFetchConfig