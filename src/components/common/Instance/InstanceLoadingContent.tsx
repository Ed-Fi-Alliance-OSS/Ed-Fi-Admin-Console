// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Spinner, Text 
} from '@chakra-ui/react'

interface InstanceLoadingContentProps {
    text?: string
    minH?: string 
}

const InstanceLoadingContent = ({ minH, text }: InstanceLoadingContentProps) => {
  return (
    <Flex 
      alignItems='center'
      flexDir='column' 
      h={minH ?? '200px'} 
      justifyContent='center'
      w='full'
    >
      <Spinner 
        color="blue.600" 
        size='xl'
      />

      <Text 
        fontSize='16px'
        mt='32px'
      >
        { text ?? 'Loading Instance Data...' }
      </Text>
    </Flex>
  )
}

export default InstanceLoadingContent