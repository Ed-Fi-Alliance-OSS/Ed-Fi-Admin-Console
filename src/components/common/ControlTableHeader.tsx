// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  MdArrowDropUp, MdArrowDropDown
} from 'react-icons/md'
import {
  Button, Flex, Text
} from '@chakra-ui/react'
import { ControlTableHeaderField } from '../../core/controlTable'

interface ControlTableHeaderProps {
    headerData: ControlTableHeaderField
    justifyContent?: string 
}

const ControlTableHeader = ({ headerData, justifyContent }: ControlTableHeaderProps) => {
  return (
    <Flex
      alignItems='center'
      justifyContent={justifyContent ?? 'flex-start'}
      w='full'
      p='2'
      borderRadius='md'
    >
      <Text
        color='black'
        fontFamily='Poppins'
        fontSize='14px'
        fontWeight='700'
        lineHeight='20px'
        textTransform='none'
      >
        {headerData.text}
      </Text>

      {!(headerData.text === '') && headerData.showSorting && <Flex 
        color='gray.600' 
        flexDir='column' 
        fontSize='12px'
        ml='3px'
        alignItems='center'
      >
        <Flex
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          w='20px'
        >
          <Button 
            aria-labelledby={`sort-asc-${headerData.fieldName}`}
            color={headerData.sortedByField === headerData.fieldName && headerData.sortingType === 'asc'? 'black' : 'gray.500'}
            data-testid={`sort-asc-${headerData.fieldName}`}
            h='14px'
            minW='20px'
            p='0'
            bg='transparent'
            _hover={{ color: 'black' }}
            onClick={() => headerData.onSortAsc({ field: headerData.fieldName })}
          >
            <span
              hidden
              id={`sort-asc-${headerData.fieldName}`}
            >Sort ascending
            </span>

            <MdArrowDropUp 
              aria-label="Sort field ascending"
              focusable="true"
              fontSize='16px'
            />
          </Button>

          <Button 
            aria-labelledby={`sort-desc-${headerData.fieldName}`}
            color={headerData.sortedByField === headerData.fieldName && headerData.sortingType === 'desc' ? 'black' : 'gray.500'}
            data-testid={`sort-desc-${headerData.fieldName}`}
            h='14px'
            minW='20px'
            p='0'
            bg='transparent'
            _hover={{ color: 'black' }}
            onClick={() => headerData.onSortDesc({ field: headerData.fieldName })}
          >
            <span
              hidden
              id={`sort-desc-${headerData.fieldName}`}
            >Sort descending
            </span>

            <MdArrowDropDown 
              aria-label="Sort field descending" 
              focusable="true"
              fontSize='16px'
            />
          </Button>
        </Flex>
      </Flex>}
    </Flex>
  )
}

export default ControlTableHeader