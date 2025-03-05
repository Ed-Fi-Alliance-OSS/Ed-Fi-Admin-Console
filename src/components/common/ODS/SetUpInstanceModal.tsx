// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceDisplayYear from '../../../hooks/odsInstances/useOdsInstanceYearName'
import useRedirectToSetUpWizard from '../../../hooks/odsInstances/useRedirectToSetUpPage'
import EDXCustomModal from '../EDXCustomModal'

interface SetUpInstanceModalProps {
    instance: ODSInstance
    show: boolean 
    onClose: () => void
}

const SetUpInstanceModal = ({ instance, show, onClose }: SetUpInstanceModalProps) => {
  const { getDisplayYear } = useOdsInstanceDisplayYear()
  const { onRedirectToSetupWizard } = useRedirectToSetUpWizard()

  return (
    <EDXCustomModal  
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <Text w='400px'>
          Before this school year can be marked as the default for your District/Charter School, it must be configured.
        </Text>
      </Flex>}
      footer={<Flex
        alignItems='flex-start'
        w='full'
      >
        <Button
          border='1px'
          borderColor='gray.400'
          color='red.600'
          padding='10px'
          size='sm'
          onClick={onClose}
        >
          Nevermind
        </Button>

        <Button
          _hover={{ _disabled: { bg: '#DC3625' } }}
          bg='#DC3625'
          border='1px'
          borderColor='#DC3625'
          color='white'
          ml='10px'
          padding='10px'
          size='sm'
          onClick={() => onRedirectToSetupWizard(instance)}
        >
          Set Up { getDisplayYear(instance) }
        </Button>
      </Flex>}
      header="You must set up this school year in order to set it as the default."
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default SetUpInstanceModal