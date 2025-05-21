// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Link, Text, Tooltip
} from '@chakra-ui/react'
import { MdHelpOutline } from 'react-icons/md'
import useHelpLinks from '../../../hooks/useHelpLinks'
import WizardContentWrapper from '../Wizard/WizardContentWrapper'

interface OnBoardingTabsWrapperProps {
    children: JSX.Element
    stepName: string 
    currentStep: number
    lastStep: number
    canPrev: boolean 
    canNext: boolean
    onPrev: () => void
    onNext: () => void
}

const OnBoardingTabsWrapper = ({ children, stepName, currentStep, lastStep, canNext, canPrev, onNext, onPrev }: OnBoardingTabsWrapperProps) => {
  const { getOnboardingWizardHelpLinks } = useHelpLinks()

  const getCurrentStepHelpLink = () => {
    const links = getOnboardingWizardHelpLinks()

    // console.log('links', links, links[currentStep -1].knowledgeBaseUrl)

    return links[currentStep -1].knowledgeBaseUrl
  }

  return (
    <WizardContentWrapper>
      <Flex
        flexDir='column'
        w='full'
      >
        <Text   
          color='gray.500'
          fontFamily='Poppins'
          fontWeight='400'
          fontSize='sm'
        >
          Step {currentStep} of {lastStep}
        </Text>

        <Flex alignItems='center'>
          <Text
            alignItems='center'
            display='flex'
            fontFamily='Poppins'
            fontSize='32px'
            fontWeight='700'
            position='relative'
          >
            {currentStep === lastStep? 'Review and Finalize' : stepName}
          </Text>

          <Tooltip
            hasArrow
            bg='blue.700'
            borderRadius='4px'
            label='Get Help Here'
            ml='5px'
            placement="top"
          >
            <span style={{ marginLeft: '5px' }}>
              <Link
                aria-label="help link"
                href={getCurrentStepHelpLink()}
                id="help link"
                referrerPolicy="no-referrer"
                target='_blank'
              >
                <MdHelpOutline 
                  aria-label="help link"
                  focusable="true"
                  fontSize='25px'
                  height='15px'
                  width='15px'
                />
              </Link>
            </span>
          </Tooltip>
        </Flex>
      </Flex>

      <Flex
        mt='32px'
        w='full'
      >
        {children}
      </Flex>

      <Flex
        mt='auto'
        w='full'
      >
        <Flex
          justifyContent='space-between'
          mt='32px'
          w='full'
        >
          <Button
            border='1px'
            disabled={!canPrev}
            minW='175PX'
            fontSize='lg'
            color='secondaryBlue600'
            variant='solid'
            onClick={onPrev}
          >
            Previous
          </Button>

          <Button
            _hover={{ backgroundColor: currentStep === lastStep? 'green.600' : (canNext? 'blue.900' : 'blue.600') }}
            bg={currentStep === lastStep? 'green.600' : 'blue.600'}
            disabled={!canNext}
            minW='138px'
            fontSize='lg'
            variant='solid'
            color={currentStep === lastStep? 'primaryGreen500' : 'primaryBlue600'}
            onClick={onNext}
          >
            {currentStep === lastStep? 'Finalize' : 'Next'}
          </Button>
        </Flex>
      </Flex> 
    </WizardContentWrapper>
  )
}

export default OnBoardingTabsWrapper