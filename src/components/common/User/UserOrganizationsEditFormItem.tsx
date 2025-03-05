// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, FormControl, Select 
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
    >
      <Flex 
        flexDir='column'
        w='320px'
      >
        <FormControl w='full'>
          <CustomFormLabel
            htmlFor="educationOrganizationName"
            text="Organization Name"
          />

          <Select
            bg='white'
            borderRadius='4px'
            isDisabled={true}
            size='xs'
            value={educationOrganizationName}
            onChange={onSelectEducationOrganizationName}
          >
            {organizationsList.map((org, index) => 
              <option
                key={index}
                value={org.identifierValue}
              >
                {org.nameOfInstitution}
              </option>)}
          </Select> 
        </FormControl>

        <FormControl
          mt='16px'
          w='full'
        >
          <CustomFormLabel
            htmlFor="staffClassificationDescriptor"
            text="Role"
          />

          <Select
            bg='white'
            borderRadius='4px'
            color='black'
            isDisabled={isUpdatingEducationOrganization}
            size='xs'
            value={staffClassificationDescriptor}
            onChange={onSelectStaffClassificationDescriptor}
          >
            {staffClassificationsList.map((staffClassification, index) => 
              <option
                key={index}
                value={`${staffClassification.varNamespace}#${staffClassification.codeValue}`}
              >
                {staffClassification.shortDescription}
              </option>)}
          </Select>
        </FormControl>

        {!isValidData() && !isCurrentSelection() && <CustomErrorField errorMessage="One organization with this id and role already exists" />}
      </Flex>

      <Flex
        alignItems='start'
        justifyContent='start'
        w='auto'
      >
        <Button 
          borderRadius='4px 0px 0px 4px'
          isDisabled={!isValidData()}
          isLoading={isUpdatingEducationOrganization}
          minW='39px'
          size='xs'
          variant='primaryBlue600'
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