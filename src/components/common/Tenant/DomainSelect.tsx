// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdAdd } from 'react-icons/md'
import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import DomainTag from '../DomainTag'

interface DomainSelectProps {
    domains: string[]
}

const DomainSelect = ({ domains }: DomainSelectProps) => {
  return (
    <Flex>
      {domains.map((domain, index) => 
        <DomainTag
          key={index}
          domain={domain}
        />)}

      <Button 
        aria-labelledby="add-btn"
        h='28px'
        minW='28px'
        ml='10px'
        padding='0'
        fontSize='sm'
        variant='solid'
        color='secondaryBlue600'
        w='28px'
      >
        <span id="add-btn">Add</span>

        <MdAdd 
          aria-hidden="true"
          focusable="false"
          fontSize='10px' 
          fontWeight='bold'
        />
      </Button>
    </Flex>
  )
}

export default DomainSelect