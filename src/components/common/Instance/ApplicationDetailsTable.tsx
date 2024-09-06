import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Link,
    Flex,
    Button,
} from '@chakra-ui/react'
import { DeletingState } from '../../../core/deletingState.types'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'
import ApplicationDetailsControl from './ApplicationDetailsControl'

interface ApplicationDetailsTableProps {
    applicationsList: EdfiApplication[]
    isDeleting: DeletingState 
    onEditApplication: (application: EdfiApplication) => void
    onDeleteApplication: (applicationId: string) => void
}

const ApplicationDetailsTable = ({ applicationsList, isDeleting, onEditApplication, onDeleteApplication }: ApplicationDetailsTableProps) => {
    return (
        <TableContainer
            borderRadius='4px'
            border='1px'
            borderColor='gray.300'>
                <Table variant='simple'>
                    <Thead bg='gray.100'>
                        <Tr>
                            <Th
                                color='gray.700'
                                fontFamily='Open sans'
                                fontWeight='700'
                                textTransform='none'
                                fontSize='14px'>Application</Th>
                            <Th
                                color='gray.700'
                                fontFamily='Open sans'
                                fontWeight='700'
                                textTransform='none'
                                fontSize='14px'>Education Organizations</Th>
                            <Th
                                color='gray.700'
                                fontFamily='Open sans'
                                fontWeight='700'
                                textTransform='none'
                                fontSize='14px'>Permissions</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {applicationsList.map((application, index) => 
                            <Tr
                                border='2px' 
                                borderColor='gray.300' 
                                key={index}>
                                <Td
                                    fontFamily='Open sans'
                                    fontWeight='400'
                                    fontSize='14px'>{application.applicationName}</Td>
                                <Td
                                    fontFamily='Open sans'
                                    fontWeight='400'
                                    fontSize='14px'>{application.educationOrganizationId? 1 : 0}</Td>
                                <Td>
                                    <Flex flexDir='column'>
                                        <Link
                                            color='blue.600' 
                                            fontFamily='Open sans'
                                            fontWeight='400'
                                            fontSize='14px'
                                            href='#'
                                            textDecoration='underline'>
                                                {application.claimSetName}
                                        </Link>
                                    </Flex>
                                </Td>
                                <Td>
                                    <Flex justifyContent='flex-end' w='full'>
                                        <Button 
                                            onClick={() => onEditApplication(application)}
                                            borderRadius='4px 0px 0px 4px'
                                            variant='primaryBlue600'
                                            size='xs'
                                            minW='39px'>
                                                Edit
                                        </Button>
                                        <ApplicationDetailsControl 
                                            data={application}
                                            isDeleting={isDeleting.deleting && isDeleting.id === application.applicationId.toString()}
                                            onDelete={onDeleteApplication} />
                                    </Flex>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
        </TableContainer>
    )
}

export default ApplicationDetailsTable