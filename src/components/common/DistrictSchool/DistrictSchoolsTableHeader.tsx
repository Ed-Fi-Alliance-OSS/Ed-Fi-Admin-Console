// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'

const DistrictSchoolsTableHeader = () => {
  return (
    <Flex 
      alignItems='center'
      border='1px'
      borderBottom='0px'
      borderColor='gray.300'
      borderRadius='4px 4px 0 0'
      data-testid="district-table"
      height='52px'
      justifyContent='space-between' 
      padding='16px'
      w='full'
    >
      <Flex w='191px'>
        <Text
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='700'
        >District Name
        </Text>
      </Flex>

      <Flex w='231px'>
        <Text
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='700'
        >Education Organization
        </Text>
      </Flex>

      <Flex w='273px'>
        <Text
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='700'
        >Domain(s)
        </Text>
      </Flex>

      <Flex w='150px'>
        <Text
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='700'
        >School Count
        </Text>
      </Flex>
    </Flex>
  )
}

export default DistrictSchoolsTableHeader