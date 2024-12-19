import {
  TEEAuthDataContext, UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  useContext,
  useEffect,
  useState
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { Tenant } from '../../../core/Tenant.types'
import useDomainsService from '../../../services/AdminActions/Domains/DomainsService'
import useTenantService from '../../../services/AdminActions/Tenant/TenantService'

const useTenant = () => {
  const { userProfile } = useContext(UserProfileContext)
  const { getTenantById } = useTenantService()
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const [ tenant, setTenant ] = useState<Tenant | null>(null)
  const [ isAddingDomain, setIsAddingDomain ] = useState(false)
  const [ isRemovingDomain, setIsRemovingDomain ] = useState(false)
  const { createDomain, deleteDomain } = useDomainsService()

  const fetchTenant = async () => {
    if (auth && auth.user && userProfile && edxAppConfig && adminConfig) {
      const response = await getTenantById('1')

      setTenant(response)
    }
  }

  const onAddDomain = async (domainName: string) => {
    
  }

  const onRemoveDomain = async (domainName: string) => {
    
  }

  useEffect(() => {
    fetchTenant()
  }, [])

  return {
    tenant,
    isAddingDomain,
    isRemovingDomain,
    onAddDomain,
    onRemoveDomain
  }
}

export default useTenant