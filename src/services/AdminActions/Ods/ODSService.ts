import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import {
  Descriptor, EducationOrganization, GetDescriptorsResult, GetEducationOrganizationsResult
} from './ODSService.results'

const useODSService = () => {
  const { config } = useConfig()
  const { api, get } = useApiService()

  const getEducationOrganizations = async (): GetEducationOrganizationsResult => {
    const url = `${config?.app.basePath}/mockdata/adminapi/data-instances.json`

    // TODO: Adapt to use the structure returned by adminapi
    const result = await get<EducationOrganization[]>({
      url,
      actionName: 'Get Edfi Applications List',
    })
    
    return result
  }

  const getDescriptors = async (): GetDescriptorsResult => {
    const baseUrl = config.api.edfiAdminApiBaseUri
    // const url = `${baseUrl}/${odsActionsList.getDescriptorsList()}?pageIndex=0&pageSize=100`
    const url = `${config?.app.basePath}/mockdata/adminapi/data-applications.json`

    // TODO: Adapt to use the structure returned by adminapi
    //const url = apiConfig?.useLocalMockData ?? true
    //    ? "/data-applications.json"
    //    : `${baseUrl}/v2/applications`
    const result = await get<Descriptor[]>({
      url,
      actionName: 'Get Edfi Applications List',
    })
    
    return result
  }
    
  return {
    getEducationOrganizations,
    getDescriptors
  }
}

export default useODSService