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
import UserOrganizationsFormSavePopover from './UserOrganizationsFormSavePopover'

interface UserOrganizationsFormItemProps {
    educationOrganizationName: string 
    staffClassificationDescriptor: string 
    organizationsList: Organization[]
    staffClassificationsList: StaffClassification[]
    isCreatingEducationOrganization: boolean 
    isValidData: () => boolean 
    onSelectEducationOrganizationName: (e: ChangeEvent<HTMLSelectElement>) => void
    onSelectStaffClassificationDescriptor: (e: ChangeEvent<HTMLSelectElement>) => void
    onCreateUserOrganization: () => void
    onCancelAdd: () => void
}

const UserOrganizationsFormItem = ({ organizationsList, staffClassificationsList, isValidData, educationOrganizationName, isCreatingEducationOrganization, staffClassificationDescriptor, onSelectEducationOrganizationName, onSelectStaffClassificationDescriptor, onCancelAdd, onCreateUserOrganization }: UserOrganizationsFormItemProps) => {
  return (
    <Flex 
      _notFirst={{
        borderTop: '2px',
        borderTopColor: 'gray.300' 
      }}
      bg='#eff4f6'
      justifyContent="space-between"
      padding='16px'
    >
      <Flex
        flexDir='column'
        w='320px'
      >
        <Flex
          flexDir='column'
          justifyContent='space-between'
          w='full'
        >
          <Field.Root w='full'>
            <CustomFormLabel
              htmlFor="educationOrganizationName-select"
              text="Organization Name"
            />

            <NativeSelect.Root
              aria-labelledby="educationOrganizationName-label"
              bg='white'
              borderRadius='4px'
              disabled={isCreatingEducationOrganization}
              fontSize='xs'
            >
              <NativeSelect.Field 
                aria-label="Organization Name"
                id="educationOrganizationName-select"
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
          </Field.Root>

          <Field.Root
            mt='16px'
            w='full'
          >
            <CustomFormLabel
              htmlFor="staffClassificationDescriptor-select"
              id="staffClassificationDescriptor-label"
              text="Role"
            />

            <NativeSelect.Root
              aria-labelledby="staffClassificationDescriptor-label"
              bg='white'
              borderRadius='4px'
              color='black'
              disabled={isCreatingEducationOrganization}
              fontSize='xs'
            >
              <NativeSelect.Field 
                aria-label="Staff Classification Role"
                id="staffClassificationDescriptor-select"
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
        </Flex>

        {!isValidData() && <CustomErrorField errorMessage="One organization with this id and role already exists" />}
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
          loading={isCreatingEducationOrganization}
          minW='39px'
          variant='solid'
          onClick={onCreateUserOrganization}
        >
          Save
        </Button>

        <UserOrganizationsFormSavePopover onCancelAdd={onCancelAdd} />
      </Flex>
    </Flex>
  )
}

export default UserOrganizationsFormItem