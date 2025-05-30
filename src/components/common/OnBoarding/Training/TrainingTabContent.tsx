// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Link, Text
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import OnBoardingTabContentWrapper from '../OnBoardingTabContentWrapper'
import TrainingModuleList from './TrainingModuleList'

interface TrainingTabContentProps {
    onCompleteStep: (stepIndex: number) => void
}

const TrainingTabContent = ({ onCompleteStep }: TrainingTabContentProps) => {
  return (
    <OnBoardingTabContentWrapper>
      <Text
        fontFamily='Poppins'
        fontWeight='400'
        w='539px'
      >
        The following training modules must be completed to continue. This video will give you an introduction to the Ed-Fi ODS and insight into its functionality. Supplementary documents related to this section can be found within the 
        <Link 
          asChild
          color="blue.500"
          fontWeight='bold' 
          mx='3px'
          referrerPolicy="no-referrer"
        >
          <RouterLink target="_blank" to="https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/7962650">
            general onboarding resources
          </RouterLink>
        </Link> 
        in Confluence.
      </Text>

      <Flex
        flexDir='column'
        mt='32px'
        w='full'
      >
        <TrainingModuleList onCompleteStep={onCompleteStep} />
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default TrainingTabContent