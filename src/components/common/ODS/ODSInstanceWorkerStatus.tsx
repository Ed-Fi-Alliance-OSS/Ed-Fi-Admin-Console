// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Spinner, Text
} from '@chakra-ui/react'
import {
  InstanceOperationStatus, InstanceWorkerStatus
} from '../../../core/ODSInstance.types'

interface ODSInstanceWorkerStatusProps {
  status: string
}

const getStatus = (status: string) => {
  return InstanceWorkerStatus[status] || InstanceWorkerStatus['Error']
}

const ODSInstanceWorkerStatus = ({ status }: ODSInstanceWorkerStatusProps) => {
  return (
    <>
      {status ? <Flex
        alignItems='center'
        border='1px'
        borderColor='gray.400'
        borderRadius='4px'
        h='32px'
        justifyContent='center'
        w='170px'
      >
        <Text
          color='gray.400'
          fontSize='md'
          fontWeight='400'
        >
          {getStatus(status)}
        </Text>
      </Flex> : <Flex
        h='32px'
        w='170px'
      >
        <Spinner
          color='gray.500'
          size='sm'
        />
      </Flex>}
    </>
  )
}

export default ODSInstanceWorkerStatus