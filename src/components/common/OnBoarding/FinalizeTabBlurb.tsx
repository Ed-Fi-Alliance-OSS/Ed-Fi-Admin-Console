// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Link, Text
} from '@chakra-ui/react'

const FinalizeTabBlurb = () => {
  return (
    <Flex 
      bg='gray.100'
      borderRadius='4px'
      flexDir="column"
      p='23px'
      w='full'
    >
      <Text
        fontFamily='Poppins'
        fontSize='20px'
        fontWeight='bold'
      >
        Everything looking good?
      </Text>

      <Text 
        fontFamily='Poppins'
        fontSize='12px'
        mt='16px'
      >
        If all the information above looks correct, click “Finalize” below to complete the Onboarding Wizard. Note: by clicking “Finalize”, you are granting The Texas Education Exchange (Acme Service Center) permission to access data related to users, roles, and campuses. Read our 
        <Link 
          color='blue.500'
          fontWeight='700'
          mx='5px'
          target="_blank"
          asChild
        >
          <RouterLink to="https://txedexchange.net/terms-privacy">
          Terms and Data Privacy Policy
          </RouterLink>
        </Link>
        to learn more. 
      </Text>
    </Flex>
  )
}

export default FinalizeTabBlurb