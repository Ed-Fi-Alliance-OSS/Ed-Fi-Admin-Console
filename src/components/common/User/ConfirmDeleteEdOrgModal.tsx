// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import { EdOrgViewItem } from '../../../hooks/adminActions/users/useUserEducationOrganizations.types'
import EDXCustomModal from '../EDXCustomModal'

interface ConfirmDeleteUserModalProps {
    show: boolean 
    edOrg: EdOrgViewItem
    isDeletingEdOrg: boolean 
    onDeleteEdOrg: (edOrgId: string, staffClassification: string) => void
    onClose: () => void
}

const ConfirmDeleteEdOrgModal = ({ edOrg, show, isDeletingEdOrg, onDeleteEdOrg, onClose }: ConfirmDeleteUserModalProps) => {
  return (
    <EDXCustomModal  
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <Text>
          Are you sure you want to remove this user’s access to this organization? Editing this user’s role within the organization may affect which applications they have access to and their level of access within the organization.
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
          isDisabled={isDeletingEdOrg}
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
          isLoading={isDeletingEdOrg}
          ml='10px'
          padding='10px'
          size='sm'
          onClick={() => onDeleteEdOrg(edOrg.educationOrganizationId.toString(), edOrg.staffClassification)}
        >
          Yes, Delete
        </Button>
      </Flex>}
      header="Delete this Organization"
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default ConfirmDeleteEdOrgModal