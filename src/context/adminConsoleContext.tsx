// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  TEEAuthDataContext, UserProfileContext 
} from '@edfi/admin-console-shared-sdk'
import {
  createContext, useContext, useState, useEffect 
} from 'react'
import {
  ActionParams, EdfiActionParams 
} from '../services/AdminActions/adminAction.types'

export interface AdminConsoleConfig {
    actionParams: ActionParams
    edfiActionParams: EdfiActionParams
    showDataHealth: boolean
    showAdvancedTabs: boolean
    edfiEndpoint: string
    allowDebug: boolean
    showCompositeUrls: boolean
    showUserDelete: boolean,
    showEdfiPartnerDelete: boolean,
    showEdfiApplicationDelete: boolean
    showEdOrgsTab: boolean
    useDataHealthWithSchoolYear: boolean
}

export const adminConsoleContext = createContext<AdminConsoleConfig | null>(null)

interface AdminConsoleConfigProviderProps {
    children: JSX.Element
    config: any
}

const AdminConsoleConfigProvider = ({ children, config }: AdminConsoleConfigProviderProps) => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const { userProfile } = useContext(UserProfileContext)  
  const [ resolvedUser, setResolvedUser ] = useState<any | null>(null)

  // Resolve the user asynchronously
  useEffect(() => {
    const resolveUser = async () => {
      try {
        if (!auth || !auth.user) {
          console.error('Auth or user is not defined')
          return
        }

        const user = await auth.user // Resolve the user promise
        console.log('Resolved user:', user)
        setResolvedUser(user) // Store the resolved user in state
      } catch (error) {
        console.error('Error resolving user:', error)
        setResolvedUser(null)// Set to null if resolving fails
      }
    }

    resolveUser()
  }, [ auth ])// Re-run if `auth` changes

  const getActionParams = (): ActionParams | null => {
    if (resolvedUser && userProfile && edxAppConfig) {
      return {
        tenantId: 'tenant1',
        token: resolvedUser.access_token, // Use the resolved user object
        config: edxAppConfig,
        edxApiUrl: config.api.edxApiUri
      }
    }

    return null
  }

  const getEdfiActionParams = (): EdfiActionParams | null => {
    if (resolvedUser && userProfile && edxAppConfig) {
      return {
        token: resolvedUser.access_token, // Use the resolved user object
        config: edxAppConfig,
        edxApiUrl: config.api.edxApiUri,
        tenantId: 'tenant1',
      }
    }

    return null
  }

  const getEdfiUrl = () => config.app.odsApiInstance ?? ''
  const getShowCompositeUrls = () => config.app.showCompositeUrls ? config.app.showCompositeUrls : false
  const getShowDataHealth = () => config.app.showDataHealth ? config.app.showDataHealth : false
  const getShowAdvancedTabs = () => config.app.showAdvancedTabs ? config.app.showAdvancedTabs : false
  const getAllowDebug = () => config.app.allowDebug ? config.app.allowDebug : false
  const getUseDataHealthWithSchoolYear = () => config.app.useDataHealthWithSchoolYear ? config.app.useDataHealthWithSchoolYear : false
  const getShowUserDelete = () => config.app.showUserDelete ? config.app.showUserDelete : false
  const getShowEdfiPartnerDelete = () => config.app.showEdfiPartnerDelete ? config.app.showEdfiPartnerDelete : false
  const getShowEdfiApplicationDelete = () => config.app.showEdfiApplicationDelete ? config.app.showEdfiApplicationDelete : false
  const getShowEdOrgsTab = () => config.app.showEdOrgsTab ? config.app.showEdOrgsTab : false

  const getAdminConsoleConfig = (): AdminConsoleConfig | null => {
    const actionParams = getActionParams()
    const edfiActionParams = getEdfiActionParams()
    const showDataHealth = getShowDataHealth()
    const showAdvancedTabs = getShowAdvancedTabs()
    const allowDebug = getAllowDebug()
    const showUserDelete = getShowUserDelete()
    const showEdfiPartnerDelete = getShowEdfiPartnerDelete()
    const showEdfiApplicationDelete = getShowEdfiApplicationDelete()
    const showEdOrgsTab = getShowEdOrgsTab()
    const useDataHealthWithSchoolYear = getUseDataHealthWithSchoolYear()

    if (actionParams && edfiActionParams) {
      return {
        actionParams,
        edfiActionParams,
        showDataHealth,
        allowDebug,
        showAdvancedTabs,
        edfiEndpoint: getEdfiUrl(),
        showCompositeUrls: getShowCompositeUrls(),
        showUserDelete,
        showEdfiApplicationDelete,
        showEdfiPartnerDelete,
        showEdOrgsTab,
        useDataHealthWithSchoolYear,
      }
    }

    return null
  }

  return (
    <adminConsoleContext.Provider value={getAdminConsoleConfig()}>
      {children}
    </adminConsoleContext.Provider>
  )
}

export default AdminConsoleConfigProvider