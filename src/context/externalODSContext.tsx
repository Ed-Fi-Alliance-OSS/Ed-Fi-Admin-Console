// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  TEEAuthDataContext, UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  createContext, useContext,
  useState
} from 'react'

export interface ExternalODSInfo {
    isExternalODS: boolean 
}

export const externalODSContext = createContext<ExternalODSInfo>({ isExternalODS: false })

interface ExternalODSProviderProps {
    children: JSX.Element
    config: any
}

const ExternalODSProvider = ({ children, config }: ExternalODSProviderProps) => {
  const { userProfile } = useContext(UserProfileContext)
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  // const { getTenant } = useTenantService()
  const [ isODS, setIsODS ] = useState<boolean>(false)

  const fetchUseExternalODSSetting = async () => {
    if (!edxAppConfig || !userProfile || !auth) {
      return
    } 

    if (!auth.user) {
      return
    } 

    // const tenant = await getTenant(userProfile.tenantId)

    // if (tenant.type === 'Response') {
    //   if (!tenant.data.settings) {
    //     return
    //   } 
            
    //   const useExternalODSSetting = tenant.data.settings.find(setting => setting.code === 'useExternalEdFiOds')
        
    //   if (!useExternalODSSetting) {
    //     return
    //   }

    //   if (useExternalODSSetting.value !== 'true') {
    //     return
    //   } 

    //   setIsODS(true)
    // }
  }

  // useEffect(() => {
  //   if (userProfile) {
  //     fetchUseExternalODSSetting()
  //   }
  // }, [ userProfile ])

  return (
    <externalODSContext.Provider value={{ isExternalODS: isODS }}>
      {children}
    </externalODSContext.Provider>
  )
}

export default ExternalODSProvider