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
          _hover={{
            bg: 'red.500',
            borderColor: 'blue.500',
            boxShadow: '0 0 0 3px rgba(248, 76, 76, 0.3)' 
          }}
          bg='red.600'
          border='1px'
          borderColor='blue.600'
          borderRadius='4px 0px 0px 4px'
          boxShadow='0 0 0 1px rgba(248, 76, 76, 0.3)'
          color='white'
          fontFamily='Poppins'
          fontSize='11px'
          fontWeight='600'
          lineHeight='1.2'
          ml='16px'
          padding='0 25px'
          size='xs'
          type="button"
          variant='solid'
          onClick={onClose}
        >Cancel
        </Button>

        <Button
          _hover={{
            bg: 'blue.700',
            borderColor: 'blue.700',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' 
          }}
          bg='blue.600'
          border='1px'
          borderColor='blue.600'
          borderRadius='4px 0px 0px 4px'
          boxShadow='0 0 0 1px rgba(59, 130, 246, 0.3)'
          color='white'
          data-testid="add-user-btn"
          disabled={isSaving || isDisabled}
          fontFamily='Poppins'
          fontSize='11px'
          fontWeight='600'
          lineHeight='1.2'
          loading={isSaving}
          ml='10px'
          padding='0 25px'
          size='xs'
          type="button"
          variant='solid'
          onClick={onAction}
        >{actionText}
        </Button>
      </Flex>
    </Flex>
  )
}

export default ModalFormHeader