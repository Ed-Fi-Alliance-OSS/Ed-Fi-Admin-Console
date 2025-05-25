// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Dialog,
  Box
} from '@chakra-ui/react'

interface AddAppUserModalProps {
    content: JSX.Element
    show: boolean 
    onClose: () => void
}

const ConsoleModal = ({ content, show, onClose }: AddAppUserModalProps) => {
  return (
    <Dialog.Root 
      open={show} 
      onOpenChange={(details) => { if (!details.open) onClose() }}
    >
      <Dialog.Backdrop />

      <Dialog.Content>
        <Box
          borderRadius='0'
          h='100vh'
          marginLeft='auto'
          maxW='629px'
          mt='0'
          position='fixed'
          right='0'
          top='0'
          w='629px'
        >
          <Dialog.CloseTrigger />

          <Dialog.Description>
            <Box
              bg='#eff4f6'
              h='full'
              padding='111px 67px 463px 42px'
              w='full'
            >
              {content}
            </Box>
          </Dialog.Description>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default ConsoleModal