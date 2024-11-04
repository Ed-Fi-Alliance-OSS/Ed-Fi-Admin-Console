import { Table, TableContainer, Thead, Tr, Th, Td, Tbody, Flex, Link, Button } from '@chakra-ui/react'
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
      borderRadius='4px'
      border='1px'
      borderColor='gray.300'>
      <Table   
        border='1px'
        borderColor='gray.300' 
        overflow='hidden'
        variant='simple'>
        <Thead bg='gray.100'>
          <Tr p='0'>
            <Th w='full'></Th>
            <Th
              color='gray.700'
              fontFamily='Open sans'
              fontWeight='700'
              textTransform='none'
              fontSize='14px'>Read</Th>
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
            padding='0'>
            <Td paddingY='0'>
              <PermissionsAccordionResourceInfo resourceInfoData={resourceInfo.types} />
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
          </Tr>
          <Tr
            border='2px' 
            borderColor='gray.300'
            padding='0'>
            <Td paddingY='0'>
              <PermissionsAccordionResourceInfo resourceInfoData={resourceInfo.systemDescriptors} />
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
          </Tr>
          <Tr
            border='2px' 
            borderColor='gray.300'
            padding='0'>
            <Td paddingY='0'>
              <PermissionsAccordionResourceInfo resourceInfoData={resourceInfo.educationOrganizations} />
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
            <Td paddingY='0'>
              <Flex borderRadius='4px' bg='gray.100' h='20px' w='20px'>
                                        
              </Flex>
            </Td> 
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PermissionsAccordionTable