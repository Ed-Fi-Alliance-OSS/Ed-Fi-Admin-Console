// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button,
  Flex,
  Link,
  Table,
  Box
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { DeletingState } from '../../../core/deletingState.types'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'

interface ApplicationDetailsTableProps {
    applicationsList: EdfiApplication[]
    isDeleting: DeletingState 
    onEditApplication: (application: EdfiApplication) => void
    onDeleteApplication: (applicationId: string) => void
}

const ApplicationDetailsTable = ({ applicationsList, isDeleting, onEditApplication, onDeleteApplication }: ApplicationDetailsTableProps) => {
  return (
    <Box
      border='1px'
      borderColor='gray.300'
      borderRadius='4px'
    >
      <Table.Root>
        <Table.Header bg='gray.100'>
          <Table.Row>
            <Table.ColumnHeader
              bg='gray.100'
              color='gray.700'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >
              Application
            </Table.ColumnHeader>

            <Table.ColumnHeader
              bg='gray.100'
              color='gray.700'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >
              Education Organizations
            </Table.ColumnHeader>

            <Table.ColumnHeader
              bg='gray.100'
              color='gray.700'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >
              Permissions
            </Table.ColumnHeader>

            <Table.ColumnHeader bg='gray.100'></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {applicationsList.map((application, index) => (
            <Table.Row
              key={index} 
              border='2px' 
              borderColor='gray.300'
            >
              <Table.Cell
                fontFamily='Poppins'
                fontSize='14px'
                fontWeight='400'
              >
                {application.applicationName}
              </Table.Cell>

              <Table.Cell
                fontFamily='Poppins'
                fontSize='14px'
                fontWeight='400'
                textAlign='center'
              >
                {application.educationOrganizationIds ? application.educationOrganizationIds.length : 0}
              </Table.Cell>

              <Table.Cell>
                <Flex flexDir='column'>
                  <Link
                    asChild 
                    color='blue.600'
                    fontFamily='Poppins'
                    fontSize='14px'
                    fontWeight='400'
                    textDecoration='underline'
                  >
                    <RouterLink to='#'>
                      {application.claimSetName}
                    </RouterLink>
                  </Link>
                </Flex>
              </Table.Cell>

              <Table.Cell>
                <Flex
                  justifyContent='flex-end'
                  w='full'
                >
                  <Button 
                    _hover={{
                      bg: 'blue.700',
                      borderColor: 'blue.700',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' 
                    }}
                    bg='blue.600'
                    border='1px'
                    borderColor='blue.600'
                    borderRadius='4px 0px 0px 4px'
                    boxShadow='0 0 0 1px rgba(59, 130, 246, 0.3)'
                    color='white'
                    fontFamily='Poppins'
                    fontSize='11px'
                    fontWeight='600'
                    lineHeight='1.2'
                    minW='39px'
                    ml='16px'
                    padding='10px'
                    size='xs'
                    type="button"
                    variant='solid'
                    onClick={() => onEditApplication(application)}
                  >
                    Edit
                  </Button>

                  {/* <ApplicationDetailsControl 
                    data={application}
                    isDeleting={isDeleting.deleting && isDeleting.id === application.id.toString()}
                    onDelete={onDeleteApplication}
                  /> */}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default ApplicationDetailsTable
