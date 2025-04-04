// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'

interface SetUpWizardStartLeftProps {
    hasStarted: boolean
}

const SetUpWizardStartLeft = ({ hasStarted }: SetUpWizardStartLeftProps) => {
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
        It’s time to connect a new school year’s data to Acme Service Center!
      </Text>

      <Flex
        flexDir='column'
        mt='32px'
      >
        <Text
          fontFamily='Poppins'
          fontSize='16px'
          fontWeight='400'
          mt='15px'
        >
          Your district/charter school-wide preferences are all set, but in order to use a new year’s data, complete the steps to the right. 
        </Text>
      </Flex>
    </Flex>
  )
}

export default SetUpWizardStartLeft