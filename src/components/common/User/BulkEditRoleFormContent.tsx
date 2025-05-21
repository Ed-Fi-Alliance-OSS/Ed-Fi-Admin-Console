// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Field, List, ListItem, Text
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomSelect
} from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import { AppUser } from '../../../core/AppUser.types'

interface BulkEditRoleFormContentProps {
    selectedUsersList: AppUser[]
    selectedRole: string
    roleOptions: []
    onSelectUserRole: (e: ChangeEvent<HTMLSelectElement>) => void
}

const BulkEditRoleFormContent = ({ selectedUsersList, selectedRole, onSelectUserRole }: BulkEditRoleFormContentProps) => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Field.Root>
        <CustomFormLabel 
          htmlFor="users"
          text="Selected Users"
        />

        <List
          ml='10px'
          w='full'
        >
          {selectedUsersList.map(user => 
            <ListItem
              _notFirst={{ mt: '16px' }}
              border='2px'
              borderColor='gray.300'
              borderRadius='4px'
              padding='5px 5px'
              w='full'
            >
              <Text 
                color='blue.600'
                fontFamily='Poppins'
                fontWeight='700'
                fontSize='sm'
              >
                {`${user.firstName} ${user.lastName}`}
              </Text>

              <Text
                color='gray.700'
                fontFamily='Poppins'
                fontWeight='400'
                fontSize='xs'
              >
                {user.email}
              </Text>
            </ListItem>)}
        </List>
      </Field.Root>

      <Field.Root mt='32px'>
        <CustomFormLabel 
          htmlFor="roles" 
          text="Role for all Users Above"
        />

        <CustomSelect
          id="roles"
          options={[]}
          value={selectedRole}
          onChange={onSelectUserRole}
        />
      </Field.Root>
    </Flex>
  )
}

export default BulkEditRoleFormContent