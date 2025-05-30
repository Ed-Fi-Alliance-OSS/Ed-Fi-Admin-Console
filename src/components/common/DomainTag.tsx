// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Text } from '@chakra-ui/react'

interface DomainTagProps {
    domain: string  
}

const DomainTag = ({ domain }: DomainTagProps) => {
  return (
    <Text
      _notFirst={{ ml: '10px' }}
      alignItems='center'
      bg='gray.100'
      borderRadius='4px'
      color='gray.700'
      display='flex'
      fontFamily='Archivo Narrow'
      fontSize='md'
      height='28px'
      justifyContent='center'
      padding='0 12px'
      textAlign='center'
    >
      {domain}
    </Text>
  )
}

export default DomainTag