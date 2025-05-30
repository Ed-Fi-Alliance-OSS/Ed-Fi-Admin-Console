// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text 
} from '@chakra-ui/react'
import { SubscriptionStatus as SStatus } from '../../../core/Subscription.types'

interface SubscriptionStatusProps {
    status: SStatus
}

const selectBorderColor = (status: SStatus) => {
  if (status === 'Active') {
    return 'green.400'
  }
    
  return 'orange.400'
}

const selectTextColor = (status: SStatus) => {
  if (status === 'Active') {
    return 'green.800'
  }
    
  return 'orange.800'
}

const SubscriptionStatus = ({ status }: SubscriptionStatusProps) => {
  return (
    <Flex 
      alignItems='center'
      border='1px'
      borderColor={selectBorderColor(status)}
      borderRadius='4px'
      h='32px'
      justifyContent='center'
      w='64px'
    >
      <Text
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontSize='md'
        fontWeight='400'
      >
        {status}
      </Text>
    </Flex>
  )
}

export default SubscriptionStatus