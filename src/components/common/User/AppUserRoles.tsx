// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import { AppUserRole } from '../../../core/AppUser.types'

interface AppUserRolesProps {
    roles: AppUserRole[]
}

const AppUserRoles = ({ roles }: AppUserRolesProps) => {
  return (
    <Flex flexDir='column'>
      {roles.map((role, index) => 
        <Text
          key={index}
          fontFamily='Poppins'
          fontWeight='400'
          size='md'
        >
          {role === 'Tenant.Admin'? 'District Admin' : 'District User'}
        </Text>)}
    </Flex>
  )
}

export default AppUserRoles