import { useConfig } from '@edfi/admin-console-shared-sdk'
import useHttpService from '../../../hooks/http/useHttpService'
import { ActionParams } from '../adminAction.types'
import { GetPermissionsResult } from './PermissionsService.result'

const usePermissionsService = () => {
  const { getAsync } = useHttpService()
  const { config } = useConfig()

  const checkPermissions = async (actionParams: ActionParams) : GetPermissionsResult => {
    //const url = `${actionParams.edxApiUrl}/verifypermission`
    //const url = "/mockdata/adminapi/data-permissions.json"
    const url = actionParams.config.api?.useLocalMockData ?? true
      ? `${config?.app.basePath}/mockdata/edgraphapi/data-permissions.json`
      : `${actionParams?.config?.api?.edfiApiBaseUri ?? ''}/adminconsole/permissions`

    const result = await getAsync<GetPermissionsResult>({
      url,
      actionName: 'Verify Permissions',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })

    return result
  }

  return { checkPermissions }
}

export default usePermissionsService