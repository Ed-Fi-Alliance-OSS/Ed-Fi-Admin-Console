// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import AdminConsoleHeader from '../common/AdminConsoleHeader'
import AdminConsoleTabsMenu from '../common/AdminConsoleTabsMenu'
import TenantInstanceTab from '../common/TenantInstance/TenantInstanceTab'

const tabsList = [ 'Tenant Instance Settings', ]

const ConsolePageContent = () => {
  const location = useLocation()
  // const adminConfig = useContext(adminConsoleContext)

  // console.log('admin config', adminConfig)

  // const selectTabs = (tabName: string) => {
  //   if (tabName === 'Documentation (Advanced)') {
  //     if (adminConfig && adminConfig.showAdvancedTabs) {
  //       return true
  //     }

  //     return false
  //   }

  //   return true
  // }

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <AdminConsoleHeader />

      <Flex
        mt='24px'
        w='full'
      >
        <AdminConsoleTabsMenu 
          initialIndex={location.state? location.state.consoleActionIndex : 0}
          tabsList={tabsList}
        >

          <TenantInstanceTab />

          <></>

        </AdminConsoleTabsMenu>
      </Flex>
    </Flex>
  )
}

export default ConsolePageContent