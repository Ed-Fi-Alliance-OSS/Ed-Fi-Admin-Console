// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Heading 
} from '@chakra-ui/react'

interface ManageSubscribersFormHeaderProps {
    isSavingChanges: boolean 
    onSave: () => void
    onClose: () => void
}

const ManageSubscribersFormHeader = ({ isSavingChanges, onSave, onClose }: ManageSubscribersFormHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
      >Manage Licenses
      </Heading>

      <Flex alignItems='flex-start'>
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
          fontSize='xs'
          loading={isSavingChanges}
          ml='10px'
          padding='0 25px'
          variant='solid'
          onClick={onSave}
        >Update
        </Button>
      </Flex>
    </Flex>
  )
}

export default ManageSubscribersFormHeader