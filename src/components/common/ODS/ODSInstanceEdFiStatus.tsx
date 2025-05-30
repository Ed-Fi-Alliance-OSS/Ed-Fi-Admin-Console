// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Spinner, Text
} from '@chakra-ui/react'
import { InstanceOperationStatus } from '../../../core/ODSInstance.types'

interface ODSInstanceEdFiStatusProps {
  status: InstanceOperationStatus
}

const selectBorderColor = (status: InstanceOperationStatus) => {
  if (status === 'Operational') {
    return 'green.400'
  }

  return 'orange.400'
}

const selectTextColor = (status: InstanceOperationStatus) => {
  if (status === 'Operational') {
    return 'green.800'
  }

  return 'orange.800'
}

const selectSize = (status: InstanceOperationStatus) => {
  if (status === 'Operational') {
    return '150px'
  }

  return '150px'
}

const ODSInstanceEdFiStatus = ({ status }: ODSInstanceEdFiStatusProps) => {
  return (
    <>
      {status ? <Flex
        alignItems='center'
        border='1px'
        borderColor={selectBorderColor(status)}
        borderRadius='4px'
        h='32px'
        justifyContent='center'
        w={selectSize(status)}
      >
        <Text
          color={selectTextColor(status)}
          fontSize='md'
          fontWeight='400'
        >
          {status}
        </Text>
      </Flex> : <Flex
        h='32px'
        w='150px'
      >
        <Spinner
          color='gray.500'
          size='sm'
        />
      </Flex>}
    </>
  )
}

export default ODSInstanceEdFiStatus