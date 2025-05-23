// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import {
  AppsMenuMoreOption, Content, DefaultLayout, EdxAppConfig, ExternalAppsContext, Footer, NotificationBar, TEEAuthDataContext, TopBar, TopBarLeft, TopBarRight, useAuthActions, useConfig, useNotificationsBar, UserProfileContext, AuthContextProps
} from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTenantContext } from '../../context/tenantContext'
import useTenantService from '../../services/AdminActions/Tenant/TenantService'

interface DefaultLayoutContentProps {
  auth: AuthContextProps
  edxAppConfig: EdxAppConfig
  content: JSX.Element
  notificationBarMessage: string
  isClosingSession: boolean
  onLogout: () => Promise<void>
}

const DefaultLayoutWrapper = ({ content, notificationBarMessage, isClosingSession, onLogout }: DefaultLayoutContentProps) => {
  const { edxAppConfig } = useContext(TEEAuthDataContext)
  const { userProfile } = useContext(UserProfileContext)
  const { externalApps } = useContext(ExternalAppsContext)
  const { getTenants } = useTenantService()
  // const {} = useContext(edxAppConfig)
  const { handleLogIn, handleChangeTenantId } = useAuthActions()
  const { showNotificationsBar, onCloseNotificationsBar } = useNotificationsBar({ show: true })
  const navigate = useNavigate()
  const { tenants } = useTenantContext()

  const moreOptions: AppsMenuMoreOption[] = [
    {
      name: 'Account Info',
      url: null 
    },
    {
      name: 'Online Community',
      url: null 
    },
    {
      name: 'Help',
      url: null 
    }
  ]

  const handleLogoClick = () => {
    console.log('Logo clicked', 'edxAppConfig', edxAppConfig)
    navigate('/', { replace: true })
  }

  // console.log('external apps', externalApps)
  const { config } = useConfig()
  return (
    <DefaultLayout
      content={<Content
        marginTop='60px'
        maxW="1400px"
      >
        {content}
      </Content>}
      footer={<Footer 
        imageUrl={config.app.logo ?? ''}
        onClick={handleLogoClick}
      />}
      notificationBar={
        <Flex
          mt='-10px'
          w='full'
        >
          <NotificationBar
            content={notificationBarMessage}
            show={false}
            onClose={onCloseNotificationsBar}
          />
        </Flex>}
      topBar={<TopBar
        leftComponent={<TopBarLeft
          list={externalApps}
          menuOptions={moreOptions}
          onClick={handleLogoClick}
        />}
        rightComponent={(Array.isArray(tenants) && tenants.length > 0) ? <TopBarRight
          isClosingSession={isClosingSession}
          profileData={userProfile}
          tenants={tenants}
          onChangeTenantId={handleChangeTenantId}
          onLogin={handleLogIn}
          onLogout={onLogout}
        /> : <></>}
      />}
    />
  )
}

export default DefaultLayoutWrapper