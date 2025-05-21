// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Text
} from '@chakra-ui/react'
import { InstanceStatus } from '../../../core/Instance.types'

const selectBorderColor = (status: InstanceStatus) => {
  if (status === 'Operational') {
    return 'green.400'
  }
    
  return 'orange.400'
}

const selectTextColor = (status: InstanceStatus) => {
  if (status === 'Operational') {
    return 'green.800'
  }
    
  return 'orange.800'
}

interface GoToInstanceStatusDetailsProps {
    status: InstanceStatus
}

const GoToInstanceStatusDetails = ({ status }: GoToInstanceStatusDetailsProps) => {
  return (
    <Flex
      alignItems='flex-end'
      flexDir='column'
    >
      <Text
        border='1px'
        borderColor={selectBorderColor(status)}
        borderRadius='4px'
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        padding='5px 0'
        fontSize='sm'
        textAlign='center'
        w='93px'
      >
        {status}
      </Text>

      <Button 
        color='gray.600'
        fontFamily='Poppins'
        fontWeight='400'
        size='sm'
      >
        See Status Details
      </Button>
    </Flex>
  )
}

export default GoToInstanceStatusDetails