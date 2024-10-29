import useHttpService from "../../../hooks/http/useHttpService"
import { ActionParams } from "../adminAction.types"
import { GetPermissionsResult } from "./PermissionsService.result"

const usePermissionsService = () => {
    const { getAsync } = useHttpService()

    const checkPermissions = async (actionParams: ActionParams) : GetPermissionsResult => {
        //const url = `${actionParams.edxApiUrl}/verifypermission`
        //const url = "/mockdata/data-permissions.json"
        const url = actionParams.config.api?.useLocalMockData ?? false
            ? "/mockdata/data-permissions.json"
            : `${actionParams?.config?.api?.baseUri ?? ''}/adminconsole/permissions`;
        const result = await getAsync<GetPermissionsResult>({
            url,
            actionName: 'Verify Permissions',
            access_token: actionParams.token,
            apiConfig: actionParams.config.api
        })

        return result
    }

    return {
        checkPermissions
    }
}

export default usePermissionsService