// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import { EdOrgViewItem } from '../../../hooks/adminActions/users/useUserEducationOrganizations.types'
import EDXCustomModal, { NoButton } from '../EDXCustomModal'

interface ConfirmDeleteUserModalProps {
    show: boolean 
    edOrg: EdOrgViewItem
    isSavingEdOrg: boolean 
    onEditEdOrg: (edOrgId: string) => void
    onClose: () => void
}

const ConfirmEditEdOrgModal = ({ edOrg, show, isSavingEdOrg, onEditEdOrg, onClose }: ConfirmDeleteUserModalProps) => {
  return (
    <EDXCustomModal  
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <Text>
          Are you sure you want to apply the changes? Editing this user’s role within the organization may affect which applications they have access to and their level of access within the organization.
        </Text>
      </Flex>}
      footer={<Flex
        alignItems='flex-start'
        w='full'
      >
        <NoButton
          disabled={isSavingEdOrg}
          onClick={onClose}
        >
          No, Cancel
        </NoButton>

        <Button
          bg='#dd3827'
          border='1px'
          borderColor='gray.400'
          color='white'
          fontSize='sm'
          loading={isSavingEdOrg}
          ml='10px'
          padding='10px'
          onClick={() => onEditEdOrg(edOrg.educationOrganizationId.toString())}
        >
          Yes, Continue
        </Button>
      </Flex>}
      header="Apply Changes?"
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default ConfirmEditEdOrgModal