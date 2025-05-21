// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Box, Table
} from '@chakra-ui/react'
import { Organization } from '../../../core/Tenant.types'

interface DistrictSchoolsDataTableProps {
    schools: Organization[]
}

const DistrictSchoolsDataTable = ({ schools }: DistrictSchoolsDataTableProps) => {
  return (
    <Box borderRadius='4px'>
      <Table.Root
        border='1px'
        borderColor='gray.300'
        borderRadius='4px'
        overflow='hidden'
        variant='simple'
      >
        <Table.Header bg='gray.100'>
          <Table.Row
            borderRadius='4px'
            p='0'
          >
            <Table.ColumnHeader 
              color='gray.700'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >
              Identifier
            </Table.ColumnHeader>

            <Table.ColumnHeader
              color='gray.700'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >
              Organization Name
            </Table.ColumnHeader>

            <Table.ColumnHeader
              color='gray.700'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='700'
              textTransform='none'
            >
              Source
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {schools.map(school => 
            <Table.Row
              key={school.identifierValue}
              border='2px'
              borderColor='gray.300'
              padding='0'
            >
              <Table.Cell paddingY='0'>
                {school.identifierValue}
              </Table.Cell>

              <Table.Cell>
                {school.nameOfInstitution}
              </Table.Cell>

              <Table.Cell>    
                {school.source}
              </Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table.Root>
    </Box>
  )   
}

export default DistrictSchoolsDataTable