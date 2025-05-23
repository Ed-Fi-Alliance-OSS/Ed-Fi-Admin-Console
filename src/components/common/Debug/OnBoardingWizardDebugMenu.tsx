// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Field, Text 
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomSelect 
} from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import { OnBoardingStepStatus } from '../../../core/onBoardingWizard/onBoardingWizard.types'

interface OnBoardingWizardDebugMenuProps {
    showTestingButtons: boolean 
    updatingStep: boolean 
    creatingStep: boolean 
    resetingAllSteps: boolean 
    currentUpdateStep: number
    currentResetStep: number 
    stepNumber: number 
    stepStatus: OnBoardingStepStatus
    selectedStep: number 
    selectedStatus: OnBoardingStepStatus
    onChangeSelect: (e: ChangeEvent<HTMLSelectElement>) => void
    onCreateOBStep: () => void
    onResetAllOBSteps: () => void
    onUpdateOBStep: () => void
}

const stepOptions = () => {
  const options: any[] = []

  for (let i = 1; i <= 8; i++) {
    options.push({
      value: i,
      text: `Step ${i}` 
    })
  }

  return options
}   

const statusOptions = () => {
  const statusList: OnBoardingStepStatus[] = [
    'Completed',
    'InProgress',
    'Pending'
  ]

  const options: any[] = statusList.map(status => ({
    value: status,
    text: status 
  }))

  return options
}

const OnBoardingWizardDebugMenu = ({ currentResetStep, currentUpdateStep, showTestingButtons, updatingStep, creatingStep, resetingAllSteps, stepNumber, stepStatus, selectedStatus, selectedStep, onChangeSelect, onCreateOBStep, onResetAllOBSteps, onUpdateOBStep }: OnBoardingWizardDebugMenuProps) => (
  <>
    {showTestingButtons && <Flex
      flexDir='column'
      w='full'
    >
      <Field.Root zIndex={100}>
        <Flex flexDir='column'>
          <CustomFormLabel
            htmlFor="selectStep"
            text="Select Step"
          />

          <CustomSelect
            id="selectStep"
            options={stepOptions()}
            value={selectedStep}
            onChange={onChangeSelect}
          />
        </Flex>

        <Flex
          flexDir='column'
          mt='16px'
        >
          <CustomFormLabel
            htmlFor="selectStatus"
            text="Select Status"
          />

          <CustomSelect
            id="selectStatus"
            options={statusOptions()}
            value={selectedStatus}
            onChange={onChangeSelect}
          />
        </Flex>
      </Field.Root>

      <Flex
        alignItems='center'
        mb='10px'
        w='670'
      >
        <Button
          color='primaryBlue600'
          loading={updatingStep}
          mb='10px'
          mt='16px'
          size='sm'
          variant='solid'
          w='300px'
          zIndex='100'
          onClick={onUpdateOBStep}
        >
          {selectedStep === 1? 'Update Step 1' : `Update Steps from 1 to ${selectedStep} as ${selectedStatus}`} 
        </Button>

        {updatingStep && <Text ml='10px'>
          Updating step: {currentUpdateStep}
        </Text>}
      </Flex>

      <Flex
        alignItems='center'
        mb='30px'
        w='650'
      >
        <Button
          color='primaryBlue600'
          loading={resetingAllSteps}
          size='sm'
          variant='solid'
          w='220px'
          zIndex='100'
          onClick={onResetAllOBSteps}
        >
          Reset Onboarding Wizard
        </Button>

        {resetingAllSteps && <Text ml='10px'>
          Updating step: {currentResetStep}
        </Text>}
      </Flex>
    </Flex>}
  </>
)

export default OnBoardingWizardDebugMenu