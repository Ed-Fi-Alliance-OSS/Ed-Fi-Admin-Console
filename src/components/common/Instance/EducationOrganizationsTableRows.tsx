// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Td, Text
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
          <Td>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {organization.id}
            </Text>
          </Td>

          <Td>
            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              size='md'
            >
              {organization.nameOfInstitution}
            </Text>
          </Td>

          <Td>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {organization.shortNameOfInstitution}
            </Text>
          </Td>

          <Td>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {extractCategory(organization.categories[0].educationOrganizationCategoryDescriptor)}
            </Text>
          </Td>

          <Td>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {extractLea(organization.localEducationAgencyCategoryDescriptor)}
            </Text>
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default EducationOrganizationsTableRows