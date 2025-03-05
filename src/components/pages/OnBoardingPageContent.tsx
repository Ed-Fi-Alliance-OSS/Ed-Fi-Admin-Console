// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Heading
} from '@chakra-ui/react'
import routes from '../../core/routes'
import useOnBoardingWizard from '../../hooks/useOnBoardingWizard'
import BackToLink from '../common/BackToLink'
import OnBoardingWizard from '../common/OnBoarding/OnBoardingWizard'
import OnBoardingWizardStart from '../common/OnBoarding/OnBoardingWizardStart'

const OnBoardingPageContent = () => {
  const { started, 
    completedSteps, 
    currentStepIndex,
    lastStep,
    onCompletedStep,
    onIncompletedStep,
    lastInProgress,
    handleNext,
    handleGoToStep,
    handlePrev,
    canNext,
    canPrev } = useOnBoardingWizard()

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Flex justifyContent='space-between'>
        <BackToLink 
          text="Finish later"
          url={routes.home.url}
        />
      </Flex>

      <Flex 
        bg='blue.500'
        borderRadius='4px'
        flexDir='column'
        mt='10px'
        padding='49px 58px'
        w='full'
      >
        <Heading
          color='white'
          fontFamily='Poppins'
          fontSize='32px'
          fontWeight='700'
        >Let’s get set up.
        </Heading>

        <Flex
          mt='32px'
          w='full'
        >
          {started? 
            <OnBoardingWizard
              canNext={canNext()}
              canPrev={canPrev()}
              completedSteps={completedSteps}
              currentStepIndex={currentStepIndex}
              lastInProgress={lastInProgress}
              lastStep={lastStep}
              onCompletedStep={onCompletedStep}
              onIncompletedStep={onIncompletedStep}
              onNext={handleNext}
              onPrev={handlePrev}
              onTabChange={handleGoToStep}
            /> : 
            <OnBoardingWizardStart
              completedSteps={completedSteps}
              currentStepIndex={currentStepIndex}
              lastInProgress={lastInProgress} 
              onGoToStep={handleGoToStep}
            />}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default OnBoardingPageContent