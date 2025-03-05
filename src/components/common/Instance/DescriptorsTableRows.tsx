// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Td, Text
} from '@chakra-ui/react'
import { Descriptor } from '../../../services/AdminActions/Ods/ODSService.results'
import ControlTableRow from '../ControlTableRow'

interface DescriptorsTableRowsProps {
    descriptorsList: Descriptor[]
}

const extractDescription = (descriptor: string) => {
  const index = descriptor.indexOf('Descriptors')

  return descriptor.slice(0, index)
}

const DescriptorsTableRows = ({ descriptorsList }: DescriptorsTableRowsProps) => {
  return (
    <>
      {descriptorsList.map((descriptor, index) => 
        <ControlTableRow key={index}>
          <Td>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {descriptor.namespace}
            </Text>
          </Td>

          <Td>
            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              size='md'
            >
              {descriptor.namespace.split('/')[2].length > 15? descriptor.namespace.split('/')[2].slice(0, 15) + '...' : descriptor.namespace.split('/')[2]}
            </Text>
          </Td>

          <Td>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {extractDescription(descriptor.namespace.split('/')[2])}
            </Text>
          </Td>

          <Td>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              { index }
            </Text>
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default DescriptorsTableRows