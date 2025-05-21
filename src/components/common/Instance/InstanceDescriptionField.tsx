// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'

interface InstanceDescriptionFieldProps {
    title: string 
    content: string | number | JSX.Element
}

const InstanceDescriptionField = ({ title, content }: InstanceDescriptionFieldProps) => {
  return (
    <Flex
      _notFirst={{ mt: '36px' }}
      flexDir='column'
    >
      <Text
        color='gray.600'
        fontFamily='Poppins'
        fontWeight='400'
        fontSize='sm'
      >
        {title}
      </Text>

      {typeof(content) === 'string' || typeof(content) === 'number'?
        <Text
          fontFamily='Poppins'
          fontWeight='700'
          fontSize='lg'
          wordBreak="break-all"
        >
          {content}
        </Text>
        : <Flex mt='5px'>
          {content}
        </Flex> }
    </Flex>
  )
}

export default InstanceDescriptionField