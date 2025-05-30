// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Box, Button, Flex, Field, NativeSelect 
} from '@chakra-ui/react'
import {
  CustomErrorField, CustomFormLabel 
} from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import {
  Organization, StaffClassification 
} from '../../../core/Tenant.types'
import { EdOrgViewItem } from '../../../hooks/adminActions/users/useUserEducationOrganizations.types'
import UserOrganizationsEditPopover from './UserOrganizationsEditPopover'

interface UserOrganizationsEditFormItemProps {
    edOrgToEdit: EdOrgViewItem
    educationOrganizationName: string 
    staffClassificationDescriptor: string 
    organizationsList: Organization[]
    staffClassificationsList: StaffClassification[]
    isUpdatingEducationOrganization: boolean 
    isValidData: () => boolean
    onSelectEducationOrganizationName: (e: ChangeEvent<HTMLSelectElement>) => void
    onSelectStaffClassificationDescriptor: (e: ChangeEvent<HTMLSelectElement>) => void
    onUpdate: (edOrgId: string, staffClassification: string) => void
    onCancel: () => void
}

const UserOrganizationsEditFormItem = ({ organizationsList, staffClassificationsList, edOrgToEdit, isValidData, educationOrganizationName, isUpdatingEducationOrganization, staffClassificationDescriptor, onSelectEducationOrganizationName, onSelectStaffClassificationDescriptor, onUpdate, onCancel }: UserOrganizationsEditFormItemProps) => {
  const isCurrentSelection = () => {
    return edOrgToEdit.educationOrganizationId == educationOrganizationName && edOrgToEdit.staffClassification === staffClassificationDescriptor
  }

  return (
    <Flex 
      _notFirst={{
        borderTop: '2px',
        borderTopColor: 'gray.300' 
      }}
      bg='#eff4f6'
      justifyContent="space-between"
      padding='16px'
    >      <Flex 
        flexDir='column'
        w='320px'
      >
        <Field.Root w='full'>
        <CustomFormLabel
            htmlFor="educationOrganizationName"
            id="educationOrganizationName-label"
            text="Organization Name"
          />

        <Box aria-label="Organization Name Select">
            <NativeSelect.Root
            bg='white'
            borderRadius='4px'
            disabled={true}
            fontSize='xs'
          >
            <NativeSelect.Field 
                aria-label="Organization Name"
                id="educationOrganizationName"
                name="educationOrganizationName"
                title="Organization Name"
                value={educationOrganizationName}
                onChange={onSelectEducationOrganizationName}
              >
                {organizationsList.map((org, index) => 
                <option
                    key={org.identifierValue || `org-${index}`}
                    title={org.nameOfInstitution}
                    value={org.identifierValue}
                  >
                    {org.nameOfInstitution}
                  </option>)}
              </NativeSelect.Field>

            <NativeSelect.Indicator />
          </NativeSelect.Root>
          </Box>
      </Field.Root>

        <Field.Root
        mt='16px'
        w='full'
      >
        <CustomFormLabel
            htmlFor="staffClassificationDescriptor"
            id="staffClassificationDescriptor-label"
            text="Role"
          />

        <NativeSelect.Root
            aria-describedby="staffClassificationDescriptor-label"
            aria-labelledby="staffClassificationDescriptor-label"
            bg='white'
            borderRadius='4px'
            color='black'
            disabled={isUpdatingEducationOrganization}
            fontSize='xs'
          >
            <NativeSelect.Field 
            aria-describedby="staffClassificationDescriptor-label"
            aria-label="Staff Classification Role"
            aria-labelledby="staffClassificationDescriptor-label"
            id="staffClassificationDescriptor"
            name="staffClassificationDescriptor"
            title="Staff Classification Role"
            value={staffClassificationDescriptor}
            onChange={onSelectStaffClassificationDescriptor}
          >
            {staffClassificationsList.map((staffClassification, index) => 
                <option
                key={`${staffClassification.varNamespace}-${staffClassification.codeValue}` || `staff-${index}`}
                title={staffClassification.shortDescription}
                value={`${staffClassification.varNamespace}#${staffClassification.codeValue}`}
              >
                {staffClassification.shortDescription}
              </option>)}
          </NativeSelect.Field>

            <NativeSelect.Indicator />
          </NativeSelect.Root>
      </Field.Root>

        {!isValidData() && !isCurrentSelection() && <CustomErrorField errorMessage="One organization with this id and role already exists" />}
      </Flex>

      <Flex
        alignItems='start'
        justifyContent='start'
        w='auto'
      >
        <Button 
          borderRadius='4px 0px 0px 4px'
          colorPalette='blue'
          disabled={!isValidData()}
          fontSize='xs'
          loading={isUpdatingEducationOrganization}
          minW='39px'
          variant='solid'
          onClick={() => onUpdate(edOrgToEdit.educationOrganizationId as any, edOrgToEdit.staffClassification)}
        >
          Save
        </Button>

        <UserOrganizationsEditPopover onCancelEdit={onCancel} />
      </Flex>
    </Flex>
  )
}

export default UserOrganizationsEditFormItem