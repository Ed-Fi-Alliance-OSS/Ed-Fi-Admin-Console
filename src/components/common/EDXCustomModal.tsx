// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Dialog,
  Flex,
  Text
} from '@chakra-ui/react'
import { useColorModeValue } from '../ui/color-mode'

interface InformationModalProps {
  type: 'alert' | 'confirmation' | 'information'
  content: JSX.Element | string
  header: JSX.Element | string
  footer: JSX.Element
  isOpen: boolean
  onClose: () => void
}

const EDXCustomModal = ({ type, header, content, footer, isOpen, onClose }: InformationModalProps) => {
  const bgColor = useColorModeValue('white', 'blue.700')

  const selectModalTopColor = () => {
    if (type === 'alert') {
      return 'red.600'
    }

    if (type === 'confirmation') {
      return useColorModeValue('blue.600', 'blue.500')
    }

    return 'blue.100'
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
    >
      <Dialog.Backdrop />

      <Dialog.Content>
        <Flex
          bg={bgColor}
          border='10px solid'
          borderBottom='0px'
          borderColor={selectModalTopColor()}
          borderLeft='0px'
          borderRadius="4px"
          borderRight='0px'
          h='auto'
          minW='517px'
          my='auto'
          w='auto'
        >
          <Dialog.Title>
            <Flex fontSize="24px" paddingBottom="0px">
              {header}
            </Flex>
          </Dialog.Title>

          <Dialog.CloseTrigger />

          <Dialog.Description>
            <Flex
              marginBottom='10px'
              paddingTop='0px'
              w=''
            >
              {typeof (content) === 'string' ?
                <Text fontFamily='Poppins'>{content}
                </Text> : content}
            </Flex>
          </Dialog.Description>

          <Dialog.Footer paddingBottom='35px'>
            {footer}
          </Dialog.Footer>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default EDXCustomModal