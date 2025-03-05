// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Button } from '@chakra-ui/react'

interface SubscriptionApplicationProps {
    name: string 
    onEditApplicationSubscription: () => void
}

const SubscriptionApplication = ({ name, onEditApplicationSubscription }: SubscriptionApplicationProps) => {
  return (
    <Button
      color='blue.600'
      cursor='pointer'
      fontFamily='Poppins'
      fontWeight='700'
      minW='auto'
      size='md'
      onClick={onEditApplicationSubscription}
    >
      {name}
    </Button> 
  )
}

export default SubscriptionApplication