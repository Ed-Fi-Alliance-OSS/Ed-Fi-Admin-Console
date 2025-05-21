// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import EDXCustomModal from '../EDXCustomModal'

interface EdFiConfirmConnectionActionModalProps {
    show: boolean 
    isSaving: boolean 
    onAction: () => void
    onClose: () => void
}

const EdFiConfirmConnectionActionModal = ({ show, isSaving, onClose, onAction }: EdFiConfirmConnectionActionModalProps) => {
  return (
    <EDXCustomModal  
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <Text w='400px'>
          There are unsaved issues in this form. Are you sure you want to close it?
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
          disabled={isSaving}
          padding='10px'
          size='sm'
          onClick={onClose}
        >
          No, Go Back
        </Button>

        <Button
          bg='#dd3827'
          border='1px'
          borderColor='gray.400'
          color='white'
          loading={isSaving}
          ml='10px'
          padding='10px'
          size='sm'
          onClick={onAction}
        >
          Yes, Cancel
        </Button>
      </Flex>}
      header="Cancel?"
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default EdFiConfirmConnectionActionModal