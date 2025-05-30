// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import EDXCustomModal, { NoButton } from '../EDXCustomModal'

interface ConfirmSetDefaultInstanceModalProps {
    instance: ODSInstance
    show: boolean 
    updatingInstance: boolean 
    onSetIsDefault: (instanceId: string, isDefault: boolean, validate: boolean) => void
    onClose: () => void
}

const ConfirmSetDefaultInstanceModal = ({ instance, show, updatingInstance, onSetIsDefault, onClose }: ConfirmSetDefaultInstanceModalProps) => {
  return (
    <EDXCustomModal  
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <Text w='400px'>
          This will change the default school year for your entire District/Charter School. 
          Only one school year can be the global default at a time, and you will be unable to revert this change.
        </Text>
      </Flex>}
      footer={<Flex
        alignItems='flex-start'
        w='full'
      >
        <NoButton
          disabled={updatingInstance}
          onClick={onClose}
        >
          No, Cancel
        </NoButton>

        <Button
          _hover={{ _disabled: { bg: '#DC3625' } }}
          bg='#DC3625'
          border='1px'
          borderColor='#DC3625'
          color='white'
          loading={updatingInstance}
          ml='10px'
          padding='10px'
          size='sm'
          onClick={() => onSetIsDefault(instance.id.toString(), true, true)}
        >
          Yes, Set as Default
        </Button>
      </Flex>}
      header="Set as Default School Year?"
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default ConfirmSetDefaultInstanceModal