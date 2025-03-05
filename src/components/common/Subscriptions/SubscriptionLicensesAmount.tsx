// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Button } from '@chakra-ui/react'
import { SubscriptionAmount } from '../../../core/Subscription.types'

interface SubscriptionLicensesAmountProps {
    amount: SubscriptionAmount
    subscriptionId: string 
    onManageSubscribers: (subscriptionId: string) => void
}

const SubscriptionLicensesAmount = ({ subscriptionId, amount, onManageSubscribers }: SubscriptionLicensesAmountProps) => {
  return (
    <Button
      color='blue.600'
      cursor='pointer'
      fontFamily='Poppins'
      fontWeight='700'
      minW='auto'
      size='md'
      onClick={() => onManageSubscribers(subscriptionId)}
    >
      {amount}
    </Button>
  )
}

export default SubscriptionLicensesAmount