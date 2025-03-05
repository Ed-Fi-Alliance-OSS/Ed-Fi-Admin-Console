// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay 
} from '@chakra-ui/react'

interface VideoModalProps {
    show: boolean 
    content: JSX.Element
    onClose: () => void
}

const VideoModal = ({ show, content, onClose }: VideoModalProps) => {
  return (
    <Modal 
      isOpen={show} 
      motionPreset='slideInRight'
      onClose={onClose}
    >
      <ModalOverlay />

      <ModalContent 
        alignItems='center'
        justifyContent='center'
        maxW='629px'
        my='auto'
      >
        <ModalCloseButton
          right='-15px'
          top='15px'
        />

        <ModalBody 
          bg='#eff4f6'
          borderRadius='4px'
          justifyContent='center'
          padding='64px 32px 32px 32px'
        >
          {content}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default VideoModal