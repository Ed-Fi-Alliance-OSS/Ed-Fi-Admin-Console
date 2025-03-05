// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import TabHeading from '../TabHeading'
import TenantSettingsForm from './TenantSettingsForm'

const TenantTabContent = () => {
  return (
    <Flex w='full'>
      <TabHeading text="Tenant Settings" />

      <Flex
        maxW='730px'
        ml='58px'
        mt='10px'
        w='full'
      >
        <TenantSettingsForm />
      </Flex>
    </Flex>
  )
}

export default TenantTabContent