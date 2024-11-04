import { TEEAuthDataContext, UserProfileContext } from '@edfi/admin-console-shared-sdk'
import { useEffect, useState, useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { Tenant } from '../../../core/Tenant.types'
import useDomainsService from '../../../services/AdminActions/Domains/DomainsService'
import useTenantService from '../../../services/AdminActions/Tenant/TenantService'

const useDistrictSchoolsTable = () => {
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const { getTenant } = useTenantService()
  const adminConfig = useContext(adminConsoleContext)
  const { userProfile } = useContext(UserProfileContext)
  const [ districtsList, setDistrictsList ] = useState<Tenant[]>([])
  const { deleteDomain } = useDomainsService()
  const [ isRemovingDomain, setIsRemovingDomain ] = useState(false)

  const fetchDistrictsData = async () => {
    if (auth && auth.user && edxAppConfig && userProfile && adminConfig) {
      const result = await getTenant(adminConfig.actionParams)

      if (result.type === 'Response') {
        const ndistrictsList: Tenant[] = []
        ndistrictsList.push(result.data)

        console.log('district data', result.data)

        setDistrictsList(ndistrictsList)
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