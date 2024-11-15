import { TEEAuthDataContext, UserProfileContext } from '@edfi/admin-console-shared-sdk'
import { createContext, useContext, useEffect, useState } from 'react'
import useTenantService from '../services/AdminActions/Tenant/TenantService'

export interface ExternalODSInfo {
    isExternalODS: boolean 
}

export const externalODSContext = createContext<ExternalODSInfo>({
  isExternalODS: false
})

interface ExternalODSProviderProps {
    children: JSX.Element
    config: any
}

const ExternalODSProvider = ({ children, config }: ExternalODSProviderProps) => {
  const { userProfile } = useContext(UserProfileContext)
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const { getTenant } = useTenantService()
  const [isODS, setIsODS] = useState<boolean>(false)

  const fetchUseExternalODSSetting = async () => {
    if (!edxAppConfig || !userProfile || !auth)
      return 

    if (!auth.user)
      return 

    const tenant = await getTenant({
      tenantId: userProfile.tenantId,
      token: auth.user.access_token,
      config: edxAppConfig,
      edxApiUrl: config.api.edxApiUri
    })

    if (tenant.type === 'Response') {
      if (!tenant.data.settings)
        return 
            
      const useExternalODSSetting = tenant.data.settings.find(setting => setting.code === 'useExternalEdFiOds')
        
      if (!useExternalODSSetting)
        return

      if (useExternalODSSetting.value !== 'true')
        return 

      setIsODS(true)
    }
  }

  useEffect(() => {
    if (userProfile)
      fetchUseExternalODSSetting()
  }, [ userProfile ])

  return (
    <externalODSContext.Provider value={{ isExternalODS: isODS }}>
      {children}
    </externalODSContext.Provider>
  )
}

export default ExternalODSProvider