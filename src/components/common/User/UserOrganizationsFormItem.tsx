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
          <FormControl w='full'>
            <CustomFormLabel
              htmlFor="educationOrganizationName"
              text="Organization Name"
            />

            <Select
              bg='white'
              borderRadius='4px'
              id="educationOrganizationName"
              isDisabled={isCreatingEducationOrganization}
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
              isDisabled={isCreatingEducationOrganization}
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
          isDisabled={!isValidData()}
          isLoading={isCreatingEducationOrganization}
          minW='39px'
          size='xs'
          variant='primaryBlue600'
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