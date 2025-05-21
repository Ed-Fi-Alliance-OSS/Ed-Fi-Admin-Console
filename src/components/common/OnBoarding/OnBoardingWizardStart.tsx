// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex
} from '@chakra-ui/react'
import useOnboardingWizardStepsData from '../../../hooks/useOnBoardingWizardStepsData'
import WizardContentWrapper from '../Wizard/WizardContentWrapper'
import WizardStartRight from '../Wizard/WizardStartRight'
import OnBoardingWizardStartLeft from './OnBoardingWizardStartLeft'

interface OnBoardingWizardStartProps {
    currentStepIndex: number 
    lastInProgress: number
    completedSteps: number 
    onGoToStep: (index: number) => void
}

const OnBoardingWizardStart = ({ currentStepIndex, lastInProgress, completedSteps, onGoToStep }: OnBoardingWizardStartProps) => {
  const { onboardingStepsData } = useOnboardingWizardStepsData()

  return (
    <WizardContentWrapper>
      

      <Flex
        h='full'
        justifyContent='space-between'
        w='full'
      >
        <OnBoardingWizardStartLeft hasStarted={completedSteps > 0} />

        <WizardStartRight
          completedSteps={completedSteps}
          currentStepIndex={currentStepIndex}
          lastInProgress={lastInProgress}
          stepsList={onboardingStepsData.stepsData}
          onGoToStep={onGoToStep}
        />
      </Flex>

      <Flex
        justifyContent='flex-end'
        mt='auto'
      >
        <Button
          minW='138px'
          size='lg'
          color='primaryBlue600'
          variant='solid'
          onClick={() => onGoToStep(completedSteps === 0? 0 : completedSteps)}
        >
          { completedSteps > 0? 'Continue' : 'Start' }
        </Button>
      </Flex>
    </WizardContentWrapper>
  )
}

export default OnBoardingWizardStart