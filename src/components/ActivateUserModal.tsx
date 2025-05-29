// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Text
} from '@chakra-ui/react'
import { AppUser } from '../core/AppUser.types'
import EDXCustomModal, { NoButton } from './common/EDXCustomModal'

interface DeactivateUserModalProps {
    user: AppUser
    show: boolean 
    isActivatingUser: boolean 
    onActivateUser: (userId: string) => void
    onClose: () => void
}

const ActivateUserModal = ({
  user,
  isActivatingUser,
  show,
  onActivateUser,
  onClose
}: DeactivateUserModalProps) => {
  return (
    <EDXCustomModal  
      content={
        <Flex
          direction="column" // v3: use 'direction' instead of 'flexDir'
          mt="12px"
        >
          <Text width="400px"> {/* v3: use 'width' instead of 'w' */}
            You are attempting to activate the following user:
          </Text>

          <Text 
            fontFamily="Poppins"
            fontWeight="700"
          >
            {`${user.firstName} ${user.lastName}`}
          </Text>

          <Text mt="32px">
            They will once again have access to their existing account on Acme Service Center. 
            Are you sure you want to continue?
          </Text>
        </Flex>
      }
      footer={
        <Flex
          alignItems="flex-start"
          width="full" // v3: use 'width' instead of 'w'
        >
          <NoButton
            disabled={isActivatingUser} // v3: use 'disabled' instead of 'isDisabled'
            onClick={onClose}
          >
            No, Cancel
          </NoButton>

          <Button
            bg="#dd3827"
            border="1px"
            borderColor="gray.400"
            color="white"
            loading={isActivatingUser} // still valid in v3
            ml="10px"
            padding="10px"
            size="sm"
            onClick={() => onActivateUser(user.userId)}
          >
            Yes, Mark as Active
          </Button>
        </Flex>
      }
      header="Mark user as active?"
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default ActivateUserModal