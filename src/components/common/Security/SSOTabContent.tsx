// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import SelectSSOMethodTable from '../OnBoarding/SelectSSOMethodTable'
import TabHeading from '../TabHeading'

const SSOTabContent = () => {
  return (
    <Flex w='full'>
      <Flex flexDir='column'>
        <Flex
          flexDir='column'
          w='300px'
        >
          <TabHeading text="Single Sign-On" />

          <Text 
            fontFamily='Poppins'
            fontWeight='400'
            lineHeight='22px'
            mt='16px'
            fontSize='md'
          >
            Select the methods you’d like to allow users within your District/Charter School to use to log in. Some configuration for the methods you select will need to be done outside of the Tech Console. Once those processes are complete, the “Consent Status” will update.
          </Text>
        </Flex>
      </Flex>

      <Flex
        ml='32px'
        mt='62px'
        w='full'
      >
        <SelectSSOMethodTable showSelect={true} />
      </Flex>
    </Flex>
  )
}

export default SSOTabContent