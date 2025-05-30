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
      boxShadow="sm"
      overflow="hidden"
      w='full'
    >
      <Table.Root variant='outline' width="100%">
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
                _last={{ borderRight: 'none' }}
                bg='gray.50'
                borderBottom='2px'
                borderBottomColor='gray.300'
                borderRight="1px"
                borderRightColor="gray.200"
                fontWeight="700"
                padding={thPadding}
              >
                {header}
              </Table.ColumnHeader>)}
          </Table.Row>
        </Table.Header>

        <Table.Body
          borderTop="2px"
          borderTopColor="gray.300"
        >
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
        bg="white"
        flexDir='column'
        padding='16px'
        w='full'
      >
        <Flex
          alignItems='center'
          bg="gray.50"
          borderRadius="md"
          h='35px'
          justifyContent='center'
          w='full'
        >
          <Text 
            color="gray.600"
            fontFamily='Poppins'
            fontSize='16px'
            fontWeight='700'
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