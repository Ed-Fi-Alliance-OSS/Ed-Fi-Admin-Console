// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Heading 
} from '@chakra-ui/react'
import { Mode } from '../../../hooks/adminActions/subscriptions/useSubscriptionsForm.types'

interface SubscriptionFormHeaderProps {
    mode: Mode
    isSavingChanges: boolean 
    onSave: () => void
    onClose: () => void
}

const SubscriptionFormHeader = ({ mode, isSavingChanges, onSave, onClose }: SubscriptionFormHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
      >{mode === 'Add'? 'Add' : 'Edit'} License
      </Heading>

      <Flex alignItems='flex-start'>
        <Button
          padding='0 25px'
          size='xs'
          variant='secondaryBlue600'
          onClick={onClose}
        >Cancel
        </Button>

        <Button
          isLoading={isSavingChanges}
          ml='10px'
          padding='0 25px'
          size='xs'
          variant='primaryBlue600'
          onClick={onSave}
        >{mode === 'Add'? 'Add' : 'Update'}
        </Button>
      </Flex>
    </Flex>
  )
}

export default SubscriptionFormHeader