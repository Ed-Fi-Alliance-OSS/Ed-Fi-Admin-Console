// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useConfig } from '@edfi/admin-console-shared-sdk'
import useHttpService from '../../hooks/http/useHttpService'
import { ActionParams } from '../AdminActions/adminAction.types'
import { GetDataHealthDistrictDetailsResponse } from './DataHealthService.responses'
import { GetDataHealthDistrictDetailsResult } from './DataHealthService.results'

const useDataHealthService = () => {
  const { getSimpleAsync } = useHttpService()
  const { config } = useConfig()

  const getDataHealthInfo = async (actionParams: ActionParams): GetDataHealthDistrictDetailsResult => {
    const baseUrl = actionParams.edxApiUrl
    // const url = `${baseUrl}/${tenantActionRoutes.getHealthCheckDistrictDetails(actionParams.tenantId)}`
    const url = `${config?.app.basePath}/mockdata/adminapi/data-healthcheck.json`
    
    const result = await getSimpleAsync<GetDataHealthDistrictDetailsResponse>({
      url,
      actionName: 'Get Data Health Info',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const getOdsInstanceDataHealthInfo = async (actionParams: ActionParams, year: number): GetDataHealthDistrictDetailsResult => {
    const baseUrl = actionParams.edxApiUrl
    // const url = `${baseUrl}/${tenantActionRoutes.getOdsInstanceHealthCheckDistrictDetails(actionParams.tenantId, year)}`
    const url = `${config?.app.basePath}/mockdata/adminapi/data-healthcheck.json`

    const result = await getSimpleAsync<GetDataHealthDistrictDetailsResponse>({
      url,
      actionName: 'Get School Year Data Health Info',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  return {
    getDataHealthInfo,
    getOdsInstanceDataHealthInfo
  }
}

export default useDataHealthService