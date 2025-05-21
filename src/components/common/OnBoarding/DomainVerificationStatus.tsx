// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Spinner, Text 
} from '@chakra-ui/react'
import { DomainStatus } from '../../../core/Tenant.types'

interface DomainVerificationStatusProps {
    status: DomainStatus
    domainName?: string
    showDeleteOption?: boolean 
    isRemovingDomain?: boolean
    onRemoveDomain?: (domainName: string) => void
}

const selectBorderColor = (status: DomainStatus) => {
  if (status === 'Unknown') {
    return 'gray.500'
  }

  if (status === 'Verified') {
    return 'green.400'
  }

  if (status === 'Rejected') {
    return 'red.400'
  }

  return 'orange.400'
}

const selectTextColor = (status: DomainStatus) => {
  if (status === 'Unknown') {
    return 'gray.700'
  }

  if (status === 'Verified') {
    return 'green.800'
  }

  if (status === 'Rejected') {
    return 'orange.800'
  }

  return 'orange.800'
}

const DomainVerificationStatus = ({ domainName, status, showDeleteOption, isRemovingDomain, onRemoveDomain }: DomainVerificationStatusProps) => {
  return (
    <Flex 
      alignItems='center'
      border='1px'
      borderColor={selectBorderColor(status)}
      borderRadius='4px'
      h={showDeleteOption? '28px' : '34px'}
      justifyContent='center'
      padding='0px 8px'
      w='auto'
    >
      <Text
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        fontSize='sm'
      >
        {status}
      </Text>

      {showDeleteOption && onRemoveDomain && domainName &&
      <Flex minW='auto'>
        {isRemovingDomain? 
          <Spinner
            color={selectTextColor(status)}
            ml='6px'
            size='sm'
          />
          : 
          <Button  
            aria-label={`remove ${domainName}`}
            color={selectTextColor(status)}
            fontSize='10px' 
            minW='auto'
            ml='6px'
            onClick={() => onRemoveDomain(domainName)}
          >X
          </Button>}
      </Flex>}
    </Flex>
  )
}

export default DomainVerificationStatus