// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text 
} from '@chakra-ui/react'
import { SSOMethodConsentStatus } from '../../../core/ssoMethods/SSOMethods.types'

const selectBorderColor = (status: SSOMethodConsentStatus) => {
  if (status === 'Consented') {
    return 'green.400'
  }
    
  if (status === 'Awaiting Consent') {
    return 'orange.400'
  }

  if (status === 'Required') {
    return 'blue.400'
  }

  return 'gray.300'
}

const selectTextColor = (status: SSOMethodConsentStatus) => {
  if (status === 'Consented') {
    return 'green.800'
  }
    
  if (status === 'Awaiting Consent') {
    return '#B45905'
  }

  if (status === 'Required') {
    return 'blue.600'
  }

  return 'gray.700'
}

const selectSize = (status: SSOMethodConsentStatus) => {
  if (status === 'Consented') {
    return '93px'
  }

  if (status === 'Awaiting Consent') {
    return '128px'
  }


  if (status === 'Required') {
    return '100px'
  }

  return '100px'
}

interface SSOConsentStatusProps {
    status: SSOMethodConsentStatus
}

const SSOConsentStatus = ({ status }: SSOConsentStatusProps) => {
  return (
    <Flex 
      alignItems='center'
      border='1px'
      borderColor={selectBorderColor(status)}
      borderRadius='4px'
      h='32px'
      justifyContent='center'
      w={selectSize(status)}
    >
      <Text
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        size='md'
      >
        {status}
      </Text>
    </Flex>
  )
}

export default SSOConsentStatus