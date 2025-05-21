// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Text } from '@chakra-ui/react'
import { LicenseType as SType } from '../../../core/Subscription.types'

interface SubscriptionTypeProps {
    type: SType
}

const SubscriptionType = ({ type }: SubscriptionTypeProps) => {
  return (
    <Text
      bg='gray.100'
      borderRadius='4px'
      color='gray.600'
      fontFamily='Archivo Narrow'
      fontWeight='400'
      padding='6px 6px'
      fontSize='md'
      textAlign='center'
      w='50px'
    >
      {`${type[0].toLocaleUpperCase()}${type.substring(1)}`}
    </Text>
  )
}

export default SubscriptionType