import {
  TEEAuthDataContext, UserProfileContext 
} from '@edfi/admin-console-shared-sdk'
import {
  useContext, useEffect, useState 
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { SSOMethod } from '../../../core/ssoMethods/SSOMethods.types'
import { IdentityProvider } from '../../../core/Tenant.types'
import useTenantService from '../../../services/AdminActions/Tenant/TenantService'
import { UpdateTenantRequest } from '../../../services/AdminActions/Tenant/TenantService.requests'

const ssoMethodsList: SSOMethod[] = [
  {
    name: 'Acme Service Center',
    descriptor: 'Local',
    consentStatus: 'Required',
    selected: true 
  },
  {
    name: 'Microsoft',
    descriptor: 'Aad',
    consentStatus: 'Not Selected',
    selected: false 
  },
  {
    name: 'Google',
    descriptor: 'Google',
    consentStatus: 'Not Selected',
    selected: false 
  }
]

const useSSOProviders = () => {
  const { getTenant, updateTenant } = useTenantService()
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const { userProfile } = useContext(UserProfileContext)
  const [ ssoProviderOptions, setssoProviderOptions ] = useState<SSOMethod[]>([...ssoMethodsList])
  const [isFetchingSSOProviders, setIsFetchingSSOProviders] = useState(false)

  const onToggleSSOProviderOption = async (ssoMethodName: string) => {
    const nssoMethods = [...ssoProviderOptions]
    const ssoIndex = nssoMethods.findIndex(ssoMethod => ssoMethod.name === ssoMethodName)

    if (ssoIndex > -1) {
      nssoMethods[ssoIndex].selected = !nssoMethods[ssoIndex].selected
      if (nssoMethods[ssoIndex].selected) {
        nssoMethods[ssoIndex].consentStatus = 'Consented'
      } else {
        nssoMethods[ssoIndex].consentStatus = 'Not Selected'
      }
    }

    setssoProviderOptions(nssoMethods)
    await saveChanges(nssoMethods)
  }

  const extractSSOProviderOptions = (providers: IdentityProvider[]): SSOMethod[] => {
    const noptions = ssoMethodsList.map(method => ({ ...method })).map(option => {
      if (option.descriptor === 'Local') {
        option.selected = true
      } else if (providers.find(p => p === option.descriptor)) {
        option.selected = true
        option.consentStatus = 'Consented'
      } else {
        option.selected = false
      }

      return option
    })

    console.log('options for identity providers', noptions)

    return noptions
  }

  const fetchSSOProviderData = async () => {
    if (auth && auth.user && edxAppConfig && userProfile && adminConfig) {
      setIsFetchingSSOProviders(true)
      const result = await getTenant(adminConfig.actionParams)

      if (result.type === 'Response') {
        console.log('get tenant request result', result)
        const options = extractSSOProviderOptions(result.data.identityProviders)

        setssoProviderOptions(options)
      }

      setIsFetchingSSOProviders(false)
    }
  }

  const saveChanges = async (selectedOptions: SSOMethod[]) => {
    if (auth && auth.user && edxAppConfig && userProfile && adminConfig) {
      const request: UpdateTenantRequest = {
        tenantId: userProfile.tenantId,
        identityProviders: selectedOptions.filter(option => option.descriptor !== 'Local' && option.selected).map(option => option.descriptor)
      }

      const result = await updateTenant(adminConfig.actionParams, request)

      if (result) {
        console.log('updated tenant result', result)
      }
    }
  }

  useEffect(() => {
    fetchSSOProviderData()
  }, [])

  return {
    ssoProviderOptions,
    isFetchingSSOProviders,
    onToggleSSOProviderOption
  }
}

export default useSSOProviders