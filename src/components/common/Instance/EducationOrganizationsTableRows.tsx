// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Table, Text
} from '@chakra-ui/react'
import { EducationOrganization } from '../../../services/AdminActions/Ods/ODSService.results'
import ControlTableRow from '../ControlTableRow'

interface EducationOrganizationsTableRowsProps {
    organizationsList: EducationOrganization[]
}

const extractLea = (url: string) => {
  const index = url.indexOf('#')

  return url.slice(index + 1)
}

const extractCategory = (url: string) => {
  const index = url.indexOf('#')

  return url.slice(index + 1)
}

const EducationOrganizationsTableRows = ({ organizationsList }: EducationOrganizationsTableRowsProps) => {
  return (
    <>
      {organizationsList.map((organization, index) => 
        <ControlTableRow key={index}>
          <Table.Cell>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontSize='md'
              fontWeight='400'
            >
              {organization.id}
            </Text>
          </Table.Cell>

          <Table.Cell>
            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontSize='md'
              fontWeight='700'
            >
              {organization.nameOfInstitution}
            </Text>
          </Table.Cell>

          <Table.Cell>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontSize='md'
              fontWeight='400'
            >
              {organization.shortNameOfInstitution}
            </Text>
          </Table.Cell>

          <Table.Cell>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontSize='md'
              fontWeight='400'
            >
              {extractCategory(organization.categories[0].educationOrganizationCategoryDescriptor)}
            </Text>
          </Table.Cell>

          <Table.Cell>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontSize='md'
              fontWeight='400'
            >
              {extractLea(organization.localEducationAgencyCategoryDescriptor)}
            </Text>
          </Table.Cell>
        </ControlTableRow>)}
    </>
  )
}

export default EducationOrganizationsTableRows