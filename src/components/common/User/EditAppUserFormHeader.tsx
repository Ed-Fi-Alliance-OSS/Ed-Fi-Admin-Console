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
          color='secondaryBlue600'
          fontSize='xs'
          padding='0 25px'
          variant='solid'
          onClick={onClose}
        >Cancel
        </Button>

        <Button
          color='primaryBlue600'
          disabled={isActionDisabled}
          fontSize='xs'
          loading={isSaving}
          ml='10px'
          padding='0 25px'
          variant='solid'
          onClick={onSave}
        >Update User
        </Button>
      </Flex>
    </Flex>
  )
}

export default EditAppUserFormHeader