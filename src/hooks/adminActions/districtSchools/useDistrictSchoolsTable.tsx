import {
  TEEAuthDataContext, UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  useContext,
  useEffect, useState
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { Tenant } from '../../../core/Tenant.types'
import useDomainsService from '../../../services/AdminActions/Domains/DomainsService'
import useTenantService from '../../../services/AdminActions/Tenant/TenantService'

const useDistrictSchoolsTable = () => {
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const { getTenantById } = useTenantService()
  const adminConfig = useContext(adminConsoleContext)
  const { userProfile } = useContext(UserProfileContext)
  const [ districtsList, setDistrictsList ] = useState<Tenant[]>([])
  const { deleteDomain } = useDomainsService()
  const [ isRemovingDomain, setIsRemovingDomain ] = useState(false)

  const fetchDistrictsData = async () => {
    if (auth && auth.user && edxAppConfig && userProfile && adminConfig) {
      const result = await getTenantById('1')
      // const result: Tenant[] = []

      if (Array.isArray(result) && result.length > 0) {
        console.log('district data', result)
        setDistrictsList(result)
      }
    }
  }

  const onRemoveDomain = async (domainName: string) => {
    if (adminConfig) {
      setIsRemovingDomain(true)
      const result = await deleteDomain(adminConfig.actionParams, domainName)
      setIsRemovingDomain(false)

      if (result.type === 'Response') {
        await fetchDistrictsData()
      }
    }
  }

  const onRefresh = async () => await fetchDistrictsData()

  useEffect(() => {
    fetchDistrictsData()
  }, [])

  return {
    districtsList,
    onRemoveDomain,
    isRemovingDomain,
    onRefresh
  }
}

export default useDistrictSchoolsTable