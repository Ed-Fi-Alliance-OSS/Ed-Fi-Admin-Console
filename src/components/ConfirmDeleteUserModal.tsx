// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Text
} from '@chakra-ui/react'
import { AppUser } from '../core/AppUser.types'
import EDXCustomModal from './common/EDXCustomModal'

interface ConfirmDeleteUserModalProps {
    user: AppUser
    show: boolean 
    isDeletingUser: boolean 
    onDeleteUser: (userId: string) => void
    onClose: () => void
}

const ConfirmDeleteUserModal = ({ user, show, isDeletingUser, onDeleteUser, onClose }: ConfirmDeleteUserModalProps) => {
  return (
    <EDXCustomModal  
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <Text w='400px'>
          You are attempting to delete the following user:
        </Text>

        <Text 
          fontFamily='Poppins'
          fontWeight='700'
        >
          {`${user.firstName} ${user.lastName}`}
        </Text>

        <Text mt='32px'>
          Their account will be deleted and they will no longer have access to Acme Service Center. 
          Are you sure you want to continue?
        </Text>
      </Flex>}
      footer={<Flex
        alignItems='flex-start'
        w='full'
      >
        <Button
          border='1px'
          borderColor='gray.400'
          color='red.600'
          isDisabled={isDeletingUser}
          padding='10px'
          size='sm'
          onClick={onClose}
        >
          No, Cancel
        </Button>

        <Button
          bg='#dd3827'
          border='1px'
          borderColor='gray.400'
          color='white'
          isLoading={isDeletingUser}
          ml='10px'
          padding='10px'
          size='sm'
          onClick={() => onDeleteUser(user.userId)}
        >
          Yes, Delete User
        </Button>
      </Flex>}
      header="Delete user?"
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default ConfirmDeleteUserModal