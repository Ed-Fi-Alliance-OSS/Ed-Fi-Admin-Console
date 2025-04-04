// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text 
} from '@chakra-ui/react'
import { DataHealthFetchError } from '../../../hooks/dataHealth/useDataHealthInfo'

interface DataHealthFetchErrorMessageProps {
    error: DataHealthFetchError
}

const DataHealthFetchErrorMessage = ({ error }: DataHealthFetchErrorMessageProps) => {
  return (
    <Flex 
      alignItems='center'
      bg="red.100"
      borderRadius='4px' 
      justifyContent="center"
      p='4px'
      w='full'
    >
      <Text
        color='red.700'
        fontSize='14px'
      >
        { `A ${error.errorStatus} error has been encountered. ${error.message}` }
      </Text>
    </Flex>
  )
}

export default DataHealthFetchErrorMessage