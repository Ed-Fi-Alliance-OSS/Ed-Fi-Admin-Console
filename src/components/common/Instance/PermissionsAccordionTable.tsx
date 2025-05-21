// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Box,
  Flex,
  Table
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
    <Box
      border='1px'
      borderColor='gray.300'
      borderRadius='4px'
    >
      <Table.Root  
        border='1px'
        borderColor='gray.300' 
        overflow='hidden'
        variant='simple'
      >
        <Table.Header bg='gray.100'>
          <Table.Row p='0'>
            <Table.ColumnHeader w='full'></Table.ColumnHeader>

            <Table.ColumnHeader
              color='gray.700'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >Read
            </Table.ColumnHeader>

            <Table.ColumnHeader w='100px'>
              Create
            </Table.ColumnHeader>

            <Table.ColumnHeader w='100px'>
              Update
            </Table.ColumnHeader>

            <Table.ColumnHeader w='100px'>
              Delete
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row
            border='2px' 
            borderColor='gray.300'
            padding='0'
          >
            <Table.Cell paddingY='0'>
              <PermissionsAccordionResourceInfo resourceInfoData={resourceInfo.types} />
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 
          </Table.Row>

          <Table.Row
            border='2px' 
            borderColor='gray.300'
            padding='0'
          >
            <Table.Cell paddingY='0'>
              <PermissionsAccordionResourceInfo resourceInfoData={resourceInfo.systemDescriptors} />
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 
          </Table.Row>

          <Table.Row
            border='2px' 
            borderColor='gray.300'
            padding='0'
          >
            <Table.Cell paddingY='0'>
              <PermissionsAccordionResourceInfo resourceInfoData={resourceInfo.educationOrganizations} />
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 

            <Table.Cell paddingY='0'>
              <Flex
                bg='gray.100'
                borderRadius='4px'
                h='20px'
                w='20px'
              >
                                        
              </Flex>
            </Table.Cell> 
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default PermissionsAccordionTable