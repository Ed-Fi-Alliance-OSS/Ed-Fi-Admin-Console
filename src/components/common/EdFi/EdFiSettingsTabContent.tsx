// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import EdFiSettingsConnectionsTable from './EdFiSettingsConnectionsTable'
import EdFiSettingsTabHeader from './EdFiSettingsTabHeader'
import EdFiSettingsWarningBanner from './EdFiSettingsWarningBanner'

const EdFiSettingsTabContent = () => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <EdFiSettingsTabHeader />

      <EdFiSettingsWarningBanner />

      <Flex
        mt='16px'
        w="full"
      >
        <EdFiSettingsConnectionsTable />
      </Flex>
    </Flex>
  )
}

export default EdFiSettingsTabContent