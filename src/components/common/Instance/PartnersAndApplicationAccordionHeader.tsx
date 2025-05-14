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
        flexDir='column'
        justifyContent='center'
        w='20px'
      >
        <Button 
          aria-labelledby="sort-asc-company"
          color={sortingType === 'asc'? 'gray.700' : 'gray.500'}
          data-testid="sort-asc-company"
          h='3px'
          minW='5px'
          onClick={() => sortByPartnerAsc({ field: 'company' })}
        >
          <span
            hidden
            id="sort-asc-company"
          >Sort ascending
          </span>

          <TriangleUpIcon 
            aria-label="Sort field ascending"
            focusable="true"
            fontSize='10px'
          />
        </Button>

        <Button 
          aria-labelledby="sort-desc-company"
          color={sortingType === 'desc' ? 'gray.700' : 'gray.500'}
          data-testid="sort-desc-company"
          h='3px'
          minW='5px'
          mt='5px'
          onClick={() => sortByPartnerDesc({ field: 'company' })}
        >
          <span
            hidden
            id="sort-desc-company"
          >Sort descending
          </span>

          <TriangleDownIcon 
            aria-label="Sort field descending" 
            focusable="true"
            fontSize='10px'
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