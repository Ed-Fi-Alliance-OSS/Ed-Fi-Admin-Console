import { useConfig } from '@edfi/admin-console-shared-sdk'
import useHttpService from '../../../hooks/http/useHttpService'
import { ActionParams } from '../adminAction.types'
import { GetPermissionsResult } from './PermissionsService.result'

const usePermissionsService = () => {
  const { getAsync } = useHttpService()
  const { config } = useConfig()

  const checkPermissions = async (actionParams: ActionParams) : GetPermissionsResult => {
    return {
      type: 'Response',
      data: []
    }
  }

  return { checkPermissions }
}

export default usePermissionsService