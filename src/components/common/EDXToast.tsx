// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Box, Flex, Text 
} from '@chakra-ui/react'
import {
  EDXToastContent, EDXToastType 
} from '../../hooks/common/EDXToast.types'

interface EDXToastProps {
    content: EDXToastContent
    type: EDXToastType
}

const EDXToast = ({ content, type }: EDXToastProps) => {
  return (
    <Flex 
      alignItems='center' 
      bg={type === 'Success'? 'green.200' : 'red.100'}
      boxShadow='lg'
      minH='66px'
      minW='400px'
      position='absolute' 
      right='16px' 
      top='60px'
    >
      <Box
        bg={type === 'Success'? 'green.500' : 'red.500'}
        h='full'
        w='5px'
      />

      <Flex
        flexDir='column'
        padding='16px 12px'
        w='395px'
      >    
        <Text 
          fontFamily='Poppins'
          fontSize='md'
          fontWeight='600'
          lineHeight='20px'
        >
          {type === 'Success'? 'Success' : 'Error'}
        </Text>

        <Box>
          {content}
        </Box>
      </Flex>
    </Flex>
  )
}

export default EDXToast