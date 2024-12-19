import {
  useConfig
} from '@edfi/admin-console-shared-sdk'
import {
  EdfiApplication, EdfiApplicationAuthData
} from '../../../../core/Edfi/EdfiApplications'
import useHttpService from '../../../../hooks/http/useHttpService'
import { EdfiActionParams } from '../../adminAction.types'
import edfiActionRoutes from '../../edfiActionRoutes'
import {
  CreateEdfiApplicationRequest, DeleteEdfiApplicationRequest, ResetEdfiApplicationCredentialsRequest, UpdateEdfiApplicationRequest
} from './EdfiApplicationService.requests'
import { DeleteEdfiApplicationResponse } from './EdfiApplicationService.responses'
import {
  CreateEdfiApplicationResult, DeleteEdfiApplicationResult, GetEdfiApplicationsListResult, ResetEdfiApplicationCredentialsResult, UpdateEdfiApplicationResult
} from './EdfiApplicationService.results'


const useEdfiApplicationsService = () => {
  const { getAsync, postAsync, putAsync, deleteAsync } = useHttpService()
  const { config } = useConfig()

  const getEdfiApplicationsList = async (actionParams: EdfiActionParams): GetEdfiApplicationsListResult => {
    const { config } = useConfig()
    const baseUrl = actionParams.edxApiUrl
    // const url = `${baseUrl}/${edfiActionRoutes.getApplicationsList(actionParams.tenantId)}`
    const url = `${config?.app.basePath}/mockdata/adminapi/data-applications.json`
    
    const result = await getAsync<EdfiApplication[]>({
      url,
      actionName: 'Get Edfi Applications List',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }
    
  const createEdfiApplication = async (actionParams: EdfiActionParams, data: CreateEdfiApplicationRequest): CreateEdfiApplicationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiActionRoutes.createApplication(actionParams.tenantId)}`
    
    const result = await postAsync<EdfiApplicationAuthData, CreateEdfiApplicationRequest>({
      url,
      actionName: 'Create Edfi Applications List',
      data,
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const deleteEdfiApplication = async (actionParams: EdfiActionParams, data: DeleteEdfiApplicationRequest): DeleteEdfiApplicationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiActionRoutes.deleteApplicationById(actionParams.tenantId, data.applicationId)}`

    const result = await deleteAsync<DeleteEdfiApplicationResponse>({
      url,
      actionName: 'Delete Edfi Application',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })

    return result
  }
    
  const updateEdfiApplication = async (actionParams: EdfiActionParams, applicationId: string, data: UpdateEdfiApplicationRequest) : UpdateEdfiApplicationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiActionRoutes.updateApplication(actionParams.tenantId, applicationId)}`
    
    const result = await putAsync<EdfiApplication, UpdateEdfiApplicationRequest>({
      url,
      data,
      actionName: 'Put Edfi application',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }
    
  const resetApplicationCredentials = async (actionParams: EdfiActionParams, data: ResetEdfiApplicationCredentialsRequest): ResetEdfiApplicationCredentialsResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiActionRoutes.resetApplicationCredentials(actionParams.tenantId, data.applicationId)}`
    
    const result = await putAsync<EdfiApplicationAuthData, ResetEdfiApplicationCredentialsRequest>({
      url,
      data,
      actionName: 'Reset Edfi Applications List',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  // Ed-Fi Admin By School Year
  const getEdfiApplicationsListForSchoolYear = async (actionParams: EdfiActionParams, year: number): GetEdfiApplicationsListResult => {
    const baseUrl = actionParams.edxApiUrl
    // const url = `${baseUrl}/${edfiActionRoutes.getApplicationsListForSchoolyear(actionParams.tenantId, year)}`
    const url = `${config?.app.basePath}/mockdata/adminapi/data-applications.json`

    // TODO: Adapt to use the structure returned by adminapi
    //const url = apiConfig?.useLocalMockData ?? true
    //    ? "/data-applications.json"
    //    : `${baseUrl}/v2/applications`
    const result = await getAsync<EdfiApplication[]>({
      url,
      actionName: 'Get Edfi Applications List',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const createEdfiApplicationForSchoolYear = async (actionParams: EdfiActionParams, data: CreateEdfiApplicationRequest, year: number): CreateEdfiApplicationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiActionRoutes.createApplicationForSchoolYear(actionParams.tenantId, year)}`
    
    const result = await postAsync<EdfiApplicationAuthData, CreateEdfiApplicationRequest>({
      url,
      actionName: 'Create Ed-Fi Application',
      data,
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

    
  const deleteEdfiApplicationForSchoolYear = async (actionParams: EdfiActionParams, data: DeleteEdfiApplicationRequest, year: number): DeleteEdfiApplicationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiActionRoutes.deleteApplicationByIdForSchoolYear(actionParams.tenantId, data.applicationId, year)}`

    const result = await deleteAsync<DeleteEdfiApplicationResponse>({
      url,
      actionName: 'Delete Edfi Application',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })

    return result
  }
    
  const updateEdfiApplicationForSchoolYear = async (actionParams: EdfiActionParams, applicationId: string, data: UpdateEdfiApplicationRequest, year: number) : UpdateEdfiApplicationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiActionRoutes.updateApplicationForSchoolYear(actionParams.tenantId, applicationId, year)}`
    
    const result = await putAsync<EdfiApplication, UpdateEdfiApplicationRequest>({
      url,
      data,
      actionName: 'Put Edfi application',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const resetApplicationCredentialsForSchoolYear = async (actionParams: EdfiActionParams, data: ResetEdfiApplicationCredentialsRequest, year: number): ResetEdfiApplicationCredentialsResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${edfiActionRoutes.resetApplicationCredentialsForSchoolYear(actionParams.tenantId, data.applicationId, year)}`
    
    const result = await putAsync<EdfiApplicationAuthData, ResetEdfiApplicationCredentialsRequest>({
      url,
      data,
      actionName: 'Reset Credentials For Ed-Fi Application',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  return {
    getEdfiApplicationsList,
    createEdfiApplication,
    deleteEdfiApplication,
    updateEdfiApplication,
    resetApplicationCredentials,
    createEdfiApplicationForSchoolYear,
    resetApplicationCredentialsForSchoolYear,
    getEdfiApplicationsListForSchoolYear,
    updateEdfiApplicationForSchoolYear,
    deleteEdfiApplicationForSchoolYear
  }
}

export default useEdfiApplicationsService