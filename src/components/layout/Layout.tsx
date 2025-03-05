// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { AuthContextProps } from 'react-oidc-context'
import { useLocation } from 'react-router-dom'
import {
  EdxAppConfig, useRouteLayoutSelector 
} from '@edfi/admin-console-shared-sdk'
import useScrollTop from '../../hooks/useScrollTop'
import DefaultLayoutWrapper from './DefaultLayoutWrapper'
import useCheckPermissions from '../../hooks/useCheckPermissions'

interface LayoutProps {
    auth: AuthContextProps
    edxAppConfig: EdxAppConfig
    content: JSX.Element
    notificationBarMessage: string
    simpleLayoutRouteList: string[]
    isClosingSession: boolean
    onLogout: () => Promise<void>
}

const Layout = ({ auth, edxAppConfig, content, notificationBarMessage, simpleLayoutRouteList, isClosingSession, onLogout }: LayoutProps) => {
  const location = useLocation()
  useScrollTop()

  const { routeHasDefaultLayout } = useRouteLayoutSelector()

  return (
    <Flex
      minH='100vh'
      position='relative'
      w="full"
    >
      <Flex
        className="one"
        flexDirection='column'
        justifyContent='center'
        w='full'
      >
        {routeHasDefaultLayout(simpleLayoutRouteList, location.pathname)?  
          <DefaultLayoutWrapper 
            auth={auth}
            content={content}
            edxAppConfig={edxAppConfig}
            isClosingSession={isClosingSession}
            notificationBarMessage={notificationBarMessage}
            onLogout={onLogout}
          />
          :
          content}
      </Flex>
    </Flex>
  )
}

export default Layout