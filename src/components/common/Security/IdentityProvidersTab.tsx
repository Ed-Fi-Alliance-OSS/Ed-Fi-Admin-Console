// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import { CustomSwitch } from '@edfi/admin-console-shared-sdk'

const identityOptions = [
  'Acme Service Center',
  'Classlink',
  'Clever',
  'Microsoft',
  'Google'
]

const IdentityProvidersTab = () => {
  return (
    <Flex 
      flexDir='column' 
      w='424px'
    >
      {identityOptions.map((option, index) => 
        <Flex 
          key={index}
          _notFirst={{ mt: '15px' }}
          alignItems='center'
          border='1px'
          borderColor='gray.300'
          borderRadius='4px'
          padding='8px 10px'
          w='full'
        >
          <CustomSwitch
            isChecked
            id="identityProvider"
          />

          <Text
            color='blue.600'
            fontFamily='Poppins'
            fontWeight='700'
            ml='15px'
            fontSize='sm'
          >
            {option}
          </Text>
        </Flex>)}
    </Flex>
  )
}

export default IdentityProvidersTab