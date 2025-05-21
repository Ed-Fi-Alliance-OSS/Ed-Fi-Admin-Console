// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text, Button 
} from '@chakra-ui/react'
import EDXCustomModal from '../EDXCustomModal'
import useOdsInstanceDisplayYear from '../../../hooks/odsInstances/useOdsInstanceYearName'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'

interface SelectedInstancesTableModalProps {
    selectedInstance: ExtendedODSInstance | null
    showConfirmInstanceModal: boolean 
    settingAsDefault: boolean 
    onContinue: () => void
    onClose: () => void
}

const SelectedInstancesTableModal = ({ selectedInstance, settingAsDefault, showConfirmInstanceModal, onClose, onContinue }: SelectedInstancesTableModalProps) => {
  const { getDisplayYear } = useOdsInstanceDisplayYear()
    
  return (
    <EDXCustomModal
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <Text>
          By continuing you'll be allowing Acme Service Center to load data into the following school year
          for the Data Warehouse, User Sync, and potential future apps:
        </Text>

        <Text
          color='blue.700'
          fontWeight='bold'
          mt='32px'
        >
          { selectedInstance? getDisplayYear(selectedInstance) : '0000' }
        </Text>
      </Flex>}
      footer={<Flex w='full'>
        <Button 
          border='1px' 
          borderColor='gray.300'
          color='gray.800' 
          disabled={settingAsDefault} 
          size='sm'
          onClick={onClose}
        >
          No, Go Back
        </Button>

        <Button 
          _hover={{ _loading: { bg: 'gray.800' } }} 
          bg='gray.800'
          color='white' 
          loading={settingAsDefault} 
          ml='10px'
          size='sm'
          onClick={onContinue}
        >
          Yes, Continue
        </Button>
      </Flex>}
      header="Are you sure this is the school year you'd like to work with?"
      isOpen={showConfirmInstanceModal}
      type="information"
      onClose={onClose}
    /> 
  )
}

export default SelectedInstancesTableModal