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
      border='1px'
      borderColor='gray.300'
      borderRadius='4px'
    >
      <Table variant='simple'>
        <Thead bg='gray.100'>
          <Tr>
            <Th
              color='gray.700'
              fontFamily='Open sans'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >Application
            </Th>

            <Th
              color='gray.700'
              fontFamily='Open sans'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >Education Organizations
            </Th>

            <Th
              color='gray.700'
              fontFamily='Open sans'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >Permissions
            </Th>

            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {applicationsList.map((application, index) => 
            <Tr
              key={index} 
              border='2px' 
              borderColor='gray.300'
            >
              <Td
                fontFamily='Open sans'
                fontSize='14px'
                fontWeight='400'
              >{application.applicationName}
              </Td>

              <Td
                fontFamily='Open sans'
                fontSize='14px'
                fontWeight='400'
              >{application.educationOrganizationId? 1 : 0}
              </Td>

              <Td>
                <Flex flexDir='column'>
                  <Link
                    color='blue.600' 
                    fontFamily='Open sans'
                    fontSize='14px'
                    fontWeight='400'
                    href='#'
                    textDecoration='underline'
                  >
                    {application.claimSetName}
                  </Link>
                </Flex>
              </Td>

              <Td>
                <Flex
                  justifyContent='flex-end'
                  w='full'
                >
                  <Button 
                    borderRadius='4px 0px 0px 4px'
                    minW='39px'
                    size='xs'
                    variant='primaryBlue600'
                    onClick={() => onEditApplication(application)}
                  >
                    Edit
                  </Button>

                  <ApplicationDetailsControl 
                    data={application}
                    isDeleting={isDeleting.deleting && isDeleting.id === application.applicationId.toString()}
                    onDelete={onDeleteApplication}
                  />
                </Flex>
              </Td>
            </Tr>)}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ApplicationDetailsTable