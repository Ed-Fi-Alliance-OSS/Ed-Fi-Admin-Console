// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'

interface OnBoardingWizardStartLeftProps {
    hasStarted: boolean
}

const OnBoardingWizardStartLeft = ({ hasStarted }: OnBoardingWizardStartLeftProps) => {
  return (
    <Flex
      flexDir='column'
      justifyContent='center'
      w='50%'
    >
      <Text
        fontFamily='Poppins'
        fontSize='24px'
        fontWeight='700'
      >
        {!hasStarted? 'Welcome to the Tech Console for Acme Service Center!' : 'Welcome back! Here’s where you’re at:'}
      </Text>

      {!hasStarted && 
      <Flex
        flexDir='column'
        mt='32px'
      >
        <Text 
          fontFamily='Poppins'
          fontSize='16px'
          fontWeight='400'
        >
          In order to get started, we’ll walk you through the process for getting your Instance up and running. 
        </Text>

        <Text
          fontFamily='Poppins'
          fontSize='16px'
          fontWeight='400'
          mt='15px'
        >
          As a first step, we’ll ask you to invite other Admin Users who you can collaborate with to complete the steps. From there, you can work collaboratively within your District or Charter School to complete the steps. We'll track your progress as you work through the setup and collect the information needed at your own pace.  
        </Text>

        <Text
          fontFamily='Poppins'
          fontSize='16px'
          fontWeight='400'
          mt='15px'
        >
          If you prefer to prepare in advance, here’s an overview of the information you’ll need on hand to complete various steps in the process. 
        </Text>
      </Flex>}
    </Flex>
  )
}

export default OnBoardingWizardStartLeft