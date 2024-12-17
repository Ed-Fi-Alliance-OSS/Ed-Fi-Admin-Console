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