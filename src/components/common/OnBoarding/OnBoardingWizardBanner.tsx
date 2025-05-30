// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Heading, Image, Text
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { OnBoardingStepStatus } from '../../../core/onBoardingWizard/onBoardingWizard.types'
import routes from '../../../core/routes'
import getAppScope from '../../../helpers/getAppScope'

interface OnBoardingWizardBannerProps {
    currentStepStatus: OnBoardingStepStatus
    currentStepName: string 
    currentStepNumber: number 
    totalSteps: number
}   

const OnBoardingWizardBanner = ({ currentStepStatus, currentStepName, currentStepNumber, totalSteps }: OnBoardingWizardBannerProps) => {
  // console.log("banner current step number", currentStepNumber, currentStepStatus)

  const showStepsProgress = () => {
    if (currentStepNumber > 1) {
      return true
    }
        
    if (currentStepNumber === 1 && currentStepStatus !== 'Pending') {
      return true
    }

    return false
  }

  return (
    <Flex 
      alignItems='center'
      bg='blue.500'
      borderRadius='4px'
      h='241px'
      justifyContent='space-between'
      overflow='hidden'
      padding='50px 65px'
      position='relative'
      w='full'
    >
      <Flex flexDir='column'>
        <Heading
          color='white'
          fontFamily='Poppins'
          fontSize='32px'
          fontWeight='700'
          lineHeight='42px'
        >
          { showStepsProgress()? 'Let’s finish your setup.' : 'Welcome to Acme Service Center! Let’s get set up.'}
        </Heading>

        {showStepsProgress() && <Flex
          alignItems='center'
          mt='16px'
        >
          <Text
            color='white'
            fontFamily='Poppins'
            fontSize='sm'
            fontWeight='400'
          >
            {`You're on Step ${currentStepNumber} of ${totalSteps}: `}
          </Text>

          <Text
            color='white'
            fontFamily='Poppins'
            fontWeight='700'
            ml='5px'
          >
            {currentStepName}
          </Text>
        </Flex>}
      </Flex>      <Button 
        alignItems='center'
        as={RouterLink}
        bg='white'
        color='primaryWhite'
        data-testid="start-ob-btn"
        display='flex'
        fontSize='lg'
        justifyContent='center'
        ml='87px'
        padding='0'
        textDecor='none'
        textDecoration='none'
        //to={routes.onBoardingWizard.url}
        variant='solid'
        w='198px'
        zIndex={2} 
      >
        {currentStepNumber === 1? 'Start Setup' : 'Continue'}
      </Button>

      <Image 
        alt="exchange-symbol"
        position='absolute'
        right='-60px'
        src={`${getAppScope()}/assets/exchange-symbol-03.svg`}
        top='-155px'
        w='380px'
      />
    </Flex>
  )
}

export default OnBoardingWizardBanner