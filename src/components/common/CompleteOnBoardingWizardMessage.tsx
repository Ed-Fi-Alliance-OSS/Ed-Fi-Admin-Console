// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'

const CompleteOnBoardingWizardMessage = () => {
  return (
    <Flex 
      alignItems='center'
      bg='gray.300'
      flexDir='column'
      justifyContent='center'
      padding='30px'
      w='full'
    >
      <Text 
        fontFamily='Poppins'
        fontSize='md'
        fontWeight='400'
      >
        Please complete the OnBoarding Wizard
      </Text> 
    </Flex>
  )
}

export default CompleteOnBoardingWizardMessage