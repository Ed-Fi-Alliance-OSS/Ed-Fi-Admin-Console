// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Link, Text, Tooltip, Box
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

    return links[currentStep - 1].knowledgeBaseUrl
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
          fontSize='sm'
          fontWeight='400'
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
            {currentStep === lastStep ? 'Review and Finalize' : stepName}
          </Text>

          <Tooltip.Root closeDelay={0} openDelay={0} positioning={{ placement: 'top' }}>
            <Tooltip.Trigger>
              <span style={{ marginLeft: '5px' }}>
                <Link
                  aria-label="help link"
                  id="help link"
                  referrerPolicy="no-referrer"
                  target='_blank'
                  asChild
                >
                  <RouterLink to={getCurrentStepHelpLink()}>
                    <MdHelpOutline
                      aria-label="help link"
                      focusable="true"
                      fontSize='25px'
                      height='15px'
                      width='15px'
                    />
                  </RouterLink>
                </Link>
              </span>
            </Tooltip.Trigger>
            <Tooltip.Positioner>
              <Tooltip.Content>
                <Flex style={{
                  background: 'var(--chakra-colors-blue-700)',
                  borderRadius: '4px' 
                }}
                >
                  <Tooltip.Arrow>
                    <Tooltip.ArrowTip />
                  </Tooltip.Arrow>
                  Get Help Here
                </Flex>
              </Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip.Root>
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
            color='secondaryBlue600'
            disabled={!canPrev}
            fontSize='lg'
            minW='175PX'
            variant='solid'
            onClick={onPrev}
          >
            Previous
          </Button>

          <Button
            _hover={{ backgroundColor: currentStep === lastStep ? 'green.600' : (canNext ? 'blue.900' : 'blue.600') }}
            bg={currentStep === lastStep ? 'green.600' : 'blue.600'}
            color={currentStep === lastStep ? 'primaryGreen500' : 'primaryBlue600'}
            disabled={!canNext}
            fontSize='lg'
            minW='138px'
            variant='solid'
            onClick={onNext}
          >
            {currentStep === lastStep ? 'Finalize' : 'Next'}
          </Button>
        </Flex>
      </Flex>
    </WizardContentWrapper>
  )
}

export default OnBoardingTabsWrapper