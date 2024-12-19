import { TEEAuthDataContext } from '@edfi/admin-console-shared-sdk'
import {
  useState, useEffect, useContext 
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { EdfiClaimSet } from '../../../core/Edfi/EdfiClaimsets'
import useClaimsetService from '../../../services/AdminActions/Edfi/ClaimSets/ClaimsetsService'

const usePermissionsAccordion = () => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const { getClaimsetsList } = useClaimsetService()
  const [ permissions, setPermissions ] = useState<EdfiClaimSet[]>([])
  const [ isFetchingPermissions, setIsFetchingPermissions ] = useState(false)

  const fetchPermissions = async () => {
    if (edxAppConfig && auth && auth.user && adminConfig) {
      setIsFetchingPermissions(true)
      const result = await getClaimsetsList(adminConfig.edfiActionParams)
      setIsFetchingPermissions(false)

      if (result.type === 'Response') {
        setPermissions(result.data)
      }
    }
  }

  useEffect(() => {
    fetchPermissions()
  }, [])

  return {
    permissions,
    isFetchingPermissions
  }
}

export default usePermissionsAccordion