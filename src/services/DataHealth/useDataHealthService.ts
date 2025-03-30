// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useApiService, useConfig } from '@edfi/admin-console-shared-sdk'
import useHttpService from '../../hooks/http/useHttpService'
import { ActionParams } from '../AdminActions/adminAction.types'
import { GetDataHealthDistrictDetailsResponse } from './DataHealthService.responses'
import { GetDataHealthDistrictDetailsResult } from './DataHealthService.results'
import { usePluginContext } from '../../plugins/BasePlugin'

const useDataHealthService = () => {
  const { getSimpleAsync } = useHttpService()
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const apiService = functionalities.ApiService?.(config, useApiService)
  const getDataHealthInfo = async(actionParams: ActionParams) =>{
    // TODO: Change parameter to use the instanceId
    const result = await apiService?.healthCheck.getByInstanceId(1);
    return result;
  } 

  const getOdsInstanceDataHealthInfo = async (actionParams: ActionParams, year: number): GetDataHealthDistrictDetailsResult => {
    const baseUrl = config.api.edfiAdminApiBaseUri
    const url = `${baseUrl}/adminconsole/healthcheck`

    const result = await getSimpleAsync<GetDataHealthDistrictDetailsResponse>({
      url,
      actionName: 'Get School Year Data Health Info',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    console.log('getOdsInstanceDataHealthInfo', result)
    return result
  }

  return {
    getDataHealthInfo,
    getOdsInstanceDataHealthInfo
  }
}

export default useDataHealthService