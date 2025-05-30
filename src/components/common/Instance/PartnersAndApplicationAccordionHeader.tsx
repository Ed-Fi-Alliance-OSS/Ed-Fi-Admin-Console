// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  MdArrowDropDown as TriangleDownIcon,
  MdArrowDropUp as TriangleUpIcon
} from 'react-icons/md'
import {
  Button, Flex, Text
} from '@chakra-ui/react'
import { SortByParams } from '../../../hooks/controlTable/useControlTableSorting'

interface PartnersAndApplicationAccordionHeaderProps {
    sortingType: 'asc' | 'desc'
    sortByPartnerDesc: ({ field }: SortByParams) => void
    sortByPartnerAsc: ({ field }: SortByParams) => void
}

const PartnersAndApplicationAccordionHeader = ({ sortByPartnerDesc, sortByPartnerAsc, sortingType }: PartnersAndApplicationAccordionHeaderProps) => {
  return (
    <Flex padding='16px 32px'>
      <Flex
        alignItems='center'
        flexDir='column'
        gap='2px'
        justifyContent='center'
        w='32px'
      >
        <Button 
          _hover={{
            background: 'gray.50',
            color: sortingType === 'asc' ? 'blue.600' : 'gray.600'
          }}
          _focus={{ boxShadow: '0 0 0 2px var(--chakra-colors-blue-500)' }}
          aria-label="Sort ascending by vendor"
          background='transparent'
          color={sortingType === 'asc' ? 'blue.500' : 'gray.400'}
          data-testid="sort-asc-company"
          h='16px'
          minW='16px'
          p='0'
          onClick={() => sortByPartnerAsc({ field: 'company' })}
        >
          <TriangleUpIcon 
            aria-hidden="true"
            size={14}
          />
        </Button>

        <Button 
          _hover={{
            background: 'gray.50',
            color: sortingType === 'desc' ? 'blue.600' : 'gray.600'
          }}
          _focus={{ boxShadow: '0 0 0 2px var(--chakra-colors-blue-500)' }}
          aria-label="Sort descending by vendor"
          background='transparent'
          color={sortingType === 'desc' ? 'blue.500' : 'gray.400'}
          data-testid="sort-desc-company"
          h='16px'
          minW='16px'
          p='0'
          onClick={() => sortByPartnerDesc({ field: 'company' })}
        >
          <TriangleDownIcon 
            aria-hidden="true"
            size={14}
          />
        </Button>
      </Flex>

      <Text 
        fontFamily='Poppins'
        fontWeight='700'
        w='250px'
      >
        Vendor
      </Text>

      <Text 
        fontFamily='Poppins'
        fontWeight='700'
        ml='40px'
        w='650px'
      >
        Namespace Prefixes
      </Text>

      <Text 
        fontFamily='Poppins'
        fontWeight='700'
        w='25%'
      >
        Application Count
      </Text>
    </Flex>
  )
}

export default PartnersAndApplicationAccordionHeader