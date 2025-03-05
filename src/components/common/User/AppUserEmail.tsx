// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Text } from '@chakra-ui/react'

interface AppUserEmailProps {
    email: string 
}

const AppUserEmail = ({ email }: AppUserEmailProps) => {
  const emailText = () => {
    if (email.length <= 20) {
      return email
    }
        
    return  `${email.slice(0, 20)}...`
  }

  return (
    <Text 
      fontFamily='Poppins'
      fontSize='md'
      fontWeight='400'
    >
      {emailText()}
    </Text>
  )
}

export default AppUserEmail