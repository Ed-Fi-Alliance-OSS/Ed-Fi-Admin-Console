import {
  TEEAuthDataContext, UserProfile, UserProfileContext 
} from '@edfi/admin-console-shared-sdk'
import {
  useContext, useEffect, useState 
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import {
  DomainStatus, TenantDomain 
} from '../../../core/Tenant.types'
import { VerifyDomainRequest } from '../../../services/AdminActions/Domains/DomainService.request'
import { VerifyDomainResponse } from '../../../services/AdminActions/Domains/DomainService.response'
import useDomainsService from '../../../services/AdminActions/Domains/DomainsService'

export interface DomainData {
    name: string 
    checked: boolean 
    state: DomainStatus
    validationValue: string
}

interface UseVerifyDomainProps {
    tenantDomains?: TenantDomain[]
}

const generateDomainDataList = (tenantDomains: TenantDomain[], userProfile: UserProfile | null) => {
  if (tenantDomains.length > 0 && userProfile) {
    const domansDataList: DomainData[] = tenantDomains.map(domain => ({ 
      name: domain.domainName, 
      validationValue: userProfile? userProfile.tenantId : '',
      checked: false,
      state: domain.domainStatus
    }))
        
    return domansDataList
  }

  return []
}

const useVerifyDomain = ({ tenantDomains }: UseVerifyDomainProps) => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const { userProfile } = useContext(UserProfileContext)
  const adminConfig = useContext(adminConsoleContext)
  const [domainsList, setDomainsList] = useState<DomainData[]>([])
  const [isCheckingDomainStatus, setIsCheckingDomainStatus] = useState(false)
  const { verifyDomain } = useDomainsService()

  const assignDomainStatus = (domain: DomainData, verficationResult: VerifyDomainResponse) => {
    const ndomainlist = domainsList.map(domain => ({ ...domain }))
    const index = ndomainlist.findIndex(item => item.name === domain.name)

    if (index !== -1) {
      ndomainlist[index].state = verficationResult.domainStatus
      setDomainsList(ndomainlist)
    }
  }

  const fetchAllDomainStates = async (domainsDataList: DomainData[]) => {
    if (edxAppConfig && auth && auth.user && adminConfig && userProfile) {
            
      setDomainsList(domainsDataList)
    }
  }

  const fetchDomainState = async (domainData: DomainData) => {
    if (edxAppConfig && auth && auth.user && adminConfig && userProfile) {
      setIsCheckingDomainStatus(true)
      const request: VerifyDomainRequest = {
        tenantId: userProfile.tenantId,
        domainName: domainData.name
      }

      const result = await verifyDomain(adminConfig.actionParams, request)
      setIsCheckingDomainStatus(false)

      console.log('verify domain result', result)

      if (result.type === 'Response') {
        assignDomainStatus(domainData, result.data)
      } else {
        assignDomainStatus(domainData, {
          tenantId: userProfile.tenantId,
          domainName: domainData.name,
          domainStatus: 'Error'
        })
      }
    }
  }

  const onVerifyDomain = async (domainData: DomainData) => await fetchDomainState(domainData)

  useEffect(() => {
    if (tenantDomains) {
      // console.log('tenant domains', tenantDomains)
      const domainsDataList = generateDomainDataList(tenantDomains, userProfile)

      fetchAllDomainStates(domainsDataList)
    }
  }, [ tenantDomains ])

  return {
    domainsList,
    onVerifyDomain,
    isCheckingDomainStatus
  }
}

export default useVerifyDomain