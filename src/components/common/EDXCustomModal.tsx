// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />

      <ModalContent 
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
        <ModalHeader 
          fontSize='24px'
          paddingBottom='0px'
        >
          { header }
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody 
          marginBottom='10px' 
          paddingTop='0px' 
          w=''
        >
          { typeof(content) === 'string'? 
            <Text fontFamily='Poppins'>{ content }
            </Text> : content } 
        </ModalBody>

        <ModalFooter paddingBottom='35px'>
          { footer }
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
  
export default EDXCustomModal