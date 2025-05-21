// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Heading 
} from '@chakra-ui/react'

interface EditAppUserFormHeaderProps {
    isSaving: boolean 
    isActionDisabled: boolean 
    onSave: () => void
    onClose: () => void
}

const EditAppUserFormHeader = ({ isSaving, isActionDisabled, onSave, onClose }: EditAppUserFormHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
      >Edit User
      </Heading>

      <Flex alignItems='flex-end'>
        <Button
          padding='0 25px'
          fontSize='xs'
          variant='solid'
          color='secondaryBlue600'
          onClick={onClose}
        >Cancel
        </Button>

        <Button
          disabled={isActionDisabled}
          loading={isSaving}
          ml='10px'
          padding='0 25px'
          fontSize='xs'
          variant='solid'
          color='primaryBlue600'
          onClick={onSave}
        >Update User
        </Button>
      </Flex>
    </Flex>
  )
}

export default EditAppUserFormHeader