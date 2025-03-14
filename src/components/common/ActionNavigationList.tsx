// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { useConfig } from '@edfi/admin-console-shared-sdk'
import { ActionNavigationItem } from '../../core/actionNavigation'
import ActionNavigationCard from './ActionNavigationCard'


const ActionNavigationList = () => {
  const { config } = useConfig()

  const actionNavigationList: ActionNavigationItem[] = [
    {
      icon: `${config.app.basePath}/assets/settings-icon.svg`,
      name: 'Tenant Instance Settings'
    },
  ]

  return (
    <Flex
      justifyContent='start'
      mt='16px'
      w='full'
    >
      {actionNavigationList.map((item, index) =>
        <ActionNavigationCard
          key={item.name}
          data={item}
          index={index}
        />)}
    </Flex>
  )
}

export default ActionNavigationList