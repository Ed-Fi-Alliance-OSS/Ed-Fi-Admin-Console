// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Dialog,
  Flex,
  Text,
  Button
} from '@chakra-ui/react'
import { useColorModeValue } from '../ui/color-mode'
import React from 'react'

interface InformationModalProps {
  type: 'alert' | 'confirmation' | 'information'
  content: JSX.Element | string
  header: JSX.Element | string
  footer: JSX.Element
  isOpen: boolean
  onClose: () => void
}

// Create a styled "No" button wrapper to apply consistent styling
export const NoButton = React.forwardRef<HTMLButtonElement, any>(({ children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      _hover={{ bg: 'gray.50' }}
      bg="white"
      border="1px"
      borderColor="gray.300"
      color="gray.800"
      padding="10px"
      size="sm"
      {...props}
    >
      {children}
    </Button>
  )
})

NoButton.displayName = 'NoButton'

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
      <Dialog.Backdrop style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 9998
      }}
      />

      <Dialog.Content style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        width: 'auto',
        zIndex: 9999,
        margin: '0 auto'
      }}
      >
        <Flex
          minW={{
            base: '90%',
            sm: '517px' 
          }}
          bg={bgColor}
          border='10px solid'
          borderBottom='0px'
          borderColor={selectModalTopColor()}
          borderLeft='0px'
          borderRadius="4px"
          borderRight='0px'
          boxShadow="0 10px 25px rgba(0, 0, 0, 0.15)"
          flexDirection="column"
          h='auto'
          maxW='800px'
          mx="auto"
          w='auto'
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            padding="20px 20px 10px 20px"
          >
            <Dialog.Title>
              <Text fontSize="24px" fontWeight="semibold" margin="0">
                {header}
              </Text>
            </Dialog.Title>

            <Dialog.CloseTrigger />
          </Flex>

          <Dialog.Description>
            <Flex
              marginBottom='20px'
              paddingX='20px'
              paddingY='10px'
            >
              {typeof (content) === 'string' ?
                <Text fontFamily='Poppins' lineHeight="1.5">
                  {content}
                </Text> : content}
            </Flex>
          </Dialog.Description>

          <Dialog.Footer 
            display="flex"
            gap="10px"
            justifyContent="flex-end"
            paddingBottom='20px'
            paddingX='20px'
          >
            {footer}
          </Dialog.Footer>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default EDXCustomModal