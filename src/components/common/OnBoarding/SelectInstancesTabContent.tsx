// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'
import { ODSInstanceTableMode } from '../ODS/ODSInstanceTable.types'
import OnBoardingTabContentWrapper from './OnBoardingTabContentWrapper'
import SelectedInstancesTable from './SelectedInstancesTable'

interface SelectInstancesTabContentProps {
    tableMode: ODSInstanceTableMode
    selectedInstance: ExtendedODSInstance | null
    showConfirmInstanceModal: boolean 
    settingAsDefault: boolean 
    onUpdateInstancesCount: (count: number) => void
    onSelectInstance: (instance: ExtendedODSInstance) => void
    onContinue: () => void
    onCloseModal: () => void
}

const SelectInstancesTabContent = ({ tableMode, selectedInstance, settingAsDefault, onSelectInstance, showConfirmInstanceModal, onUpdateInstancesCount, onContinue, onCloseModal }: SelectInstancesTabContentProps) => {
  return (
    <OnBoardingTabContentWrapper>
      <Text
        fontFamily='Poppins'
        fontWeight='400'
        textAlign='justify'
        w='720px'
      >
        Now that your domain is verified, 
        we have made the following school years(s) available for your District/Charter School to load data into. 
        Select the school year (if you only see one, just click “Next”) you would like to work with, and you’ll be able to continue on in the process.
      </Text>

      <Flex
        mt='32px'
        w='full'
      >
        <SelectedInstancesTable 
          selectedInstance={selectedInstance}
          settingAsDefault={settingAsDefault}
          showConfirmInstanceModal={showConfirmInstanceModal}
          tableMode={tableMode}
          onClose={onCloseModal}
          onContinue={onContinue}
          onSelectInstance={onSelectInstance}
          onUpdateInstancesCount={onUpdateInstancesCount}
        />
      </Flex>

      <Flex
        justifyContent='space-between'
        mt='32px'
        w='full'
      >
        {false &&  <Text
          color='blue.500'
          fontFamily='Poppins'
          fontWeight='700'
          size='md'
        >
          Not seeing what you were expecting? Get help here.
        </Text>}
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default SelectInstancesTabContent