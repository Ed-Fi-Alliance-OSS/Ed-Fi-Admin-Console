import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Organization } from "../../../core/Tenant.types"

interface DistrictSchoolsDataTableProps {
    schools: Organization[]
}

const DistrictSchoolsDataTable = ({ schools }: DistrictSchoolsDataTableProps) => {
    return (
        <TableContainer 
            borderRadius='4px'>
                <Table
                    border='1px'
                    borderRadius='4px'
                    borderColor='gray.300'
                    overflow='hidden'
                    variant='simple'>
                        <Thead bg='gray.100'>
                            <Tr borderRadius='4px' p='0'>
                                <Th 
                                    color='gray.700'
                                    fontFamily='Open sans'
                                    fontWeight='700'
                                    fontSize='14px'
                                    textTransform='none'>
                                        Identifier
                                </Th>
                                <Th
                                    color='gray.700'
                                    fontFamily='Open sans'
                                    fontWeight='700'
                                    fontSize='14px'
                                    textTransform='none'>
                                        Organization Name
                                </Th>
                                <Th
                                    color='gray.700'
                                    fontFamily='Open sans'
                                    fontWeight='700'
                                    fontSize='14px'
                                    textTransform='none'>
                                        Source
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {schools.map(school => 
                                <Tr
                                    border='2px'
                                    borderColor='gray.300'
                                    padding='0'
                                    key={school.identifierValue}>
                                        <Td paddingY='0'>
                                            {school.identifierValue}
                                        </Td>
                                        <Td>
                                            {school.nameOfInstitution}
                                        </Td>
                                        <Td>    
                                            {school.source}
                                        </Td>
                                </Tr>
                            )}
                        </Tbody>
                </Table>
    </TableContainer>
    )   
}

export default DistrictSchoolsDataTable