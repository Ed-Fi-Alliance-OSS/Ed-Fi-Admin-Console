// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Skeleton,
  Table, Box,
  Text,
} from '@chakra-ui/react'
import { ControlTableRowList } from '../../core/controlTable'

interface ControlTableProps {
    headers: JSX.Element[]
    rows: ControlTableRowList
    thPadding: string
    itemsCount: number
    pagination?: JSX.Element
    loading: boolean
}

const generateSkeletonArray = () => {
  const array = new Array(10).fill(0)

  return array
}

const ControlTable = ({ headers, rows, thPadding, itemsCount, loading, pagination }: ControlTableProps) => {
  return (
    <Box 
      bg='white'
      border='1px' 
      borderColor='gray.300'
      borderRadius='4px'
      w='full'
      boxShadow="sm"
      overflow="hidden"
    >
      <Table.Root variant='outline'>
        <Table.Header
          bg="gray.50"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
          position="relative"
          zIndex="1"
        >
          <Table.Row>
            {headers.map((header, index) => 
              <Table.ColumnHeader 
                key={index}
                borderBottom='2px'
                borderBottomColor='gray.300'
                padding={thPadding}
                bg='gray.50'
                fontWeight="700"
              >
                {header}
              </Table.ColumnHeader>)}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows}
        </Table.Body>
      </Table.Root>

      {itemsCount === 0 && loading && <Flex
        flexDir='column'
        padding='16px'
        w='full'
      >
        {generateSkeletonArray().map((item, index) => 
          <Skeleton 
            key={index} 
            _notFirst={{ mt: '12px' }} 
            h='35px'
            w='full'
          />)}
      </Flex>}

      {itemsCount === 0 && !loading && <Flex
        flexDir='column'
        padding='16px'
        w='full'
        bg="white"
      >
        <Flex
          alignItems='center'
          h='35px'
          justifyContent='center'
          w='full'
          borderRadius="md"
          bg="gray.50"
        >
          <Text 
            fontFamily='Poppins'
            fontSize='16px'
            fontWeight='700'
            color="gray.600"
          >
            There are 0 items to show
          </Text>
        </Flex>
      </Flex>}

      {pagination &&  
      <Flex
        _notLast={{
          borderBottom: '2px',
          borderBottomColor: 'gray.300' 
        }} 
        borderTop='2px'
        borderTopColor='gray.300'
        px='16px'
        py='16px'
        w='full'
      >
        <Flex w='full'>
          {pagination}
        </Flex>
      </Flex>}
    </Box>
  )
}

export default ControlTable