// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex,
  Table, TableContainer,
  Tbody,
  Td,
  Th,
  Thead, Tr
} from '@chakra-ui/react'
import PermissionsAccordionResourceInfo from './PermissionsAccordionResourceInfo'

interface ResourceInfoData {
    name: string 
    read?: boolean 
    create?: boolean 
    update?: boolean 
    delete?: boolean
}

interface ResourceInfo {
    types: ResourceInfoData 
    systemDescriptors: ResourceInfoData 
    educationOrganizations: ResourceInfoData
}

interface PermissionsAccordionTableProps {
    resourceInfo: ResourceInfo
}

const PermissionsAccordionTable = ({ resourceInfo }: PermissionsAccordionTableProps) => {
  return (
    <TableContainer
      border='1px'
      borderColor='gray.300'
      borderRadius='4px'
    >
      <Table   
        border='1px'
        borderColor='gray.300' 
        overflow='hidden'
        variant='simple'
      >
        <Thead bg='gray.100'>
          <Tr p='0'>
            <Th w='full'></Th>

            <Th
              color='gray.700'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >Read
            </Th>

            <Th w='100px'>
              Create
            </Th>

            <Th w='100px'>
              Update
            </Th>

            <Th w='100px'>
              Delete
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr
            border='2px' 
            borderColor='gray.300'
            padding='0'
          >
            <Td paddingY='0'>
              <PermissionsAccordionResourceInfo resourceInfoData={resourceInfo.types} />
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 
          </Tr>

          <Tr
            border='2px' 
            borderColor='gray.300'
            padding='0'
          >
            <Td paddingY='0'>
              <PermissionsAccordionResourceInfo resourceInfoData={resourceInfo.systemDescriptors} />
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 
          </Tr>

          <Tr
            border='2px' 
            borderColor='gray.300'
            padding='0'
          >
            <Td paddingY='0'>
              <PermissionsAccordionResourceInfo resourceInfoData={resourceInfo.educationOrganizations} />
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 

            <Td paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Td> 
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PermissionsAccordionTable