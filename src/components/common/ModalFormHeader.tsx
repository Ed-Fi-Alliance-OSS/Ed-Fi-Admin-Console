// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Heading 
} from '@chakra-ui/react'

interface ModalFormHeaderProps {
    headerText: string 
    actionText: string
    isSaving: boolean 
    alignCenter?: boolean 
    isDisabled?: boolean
    headerWidth?: string
    onAction: () => void
    onClose: () => void
}

const ModalFormHeader = ({ actionText, headerText, headerWidth, alignCenter, isDisabled, isSaving, onAction, onClose }: ModalFormHeaderProps) => {
  return (
    <Flex
      alignItems={alignCenter? 'center' : 'start'}
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
        w={headerWidth ?? 'auto'}
      >{headerText}
      </Heading>

      <Flex alignItems='flex-end'>
        <Button
          color='secondaryBlue600'
          padding='0 25px'
          size='xs'
          variant='solid'
          onClick={onClose}
        >Cancel
        </Button>

        <Button
          color='primaryBlue600'
          data-testid="add-user-btn"
          disabled={isSaving || isDisabled}
          loading={isSaving}
          ml='10px'
          padding='0 25px'
          size='xs'
          variant='solid'
          onClick={onAction}
        >{actionText}
        </Button>
      </Flex>
    </Flex>
  )
}

export default ModalFormHeader