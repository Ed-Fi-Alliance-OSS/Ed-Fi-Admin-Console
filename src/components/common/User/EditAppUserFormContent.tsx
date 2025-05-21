// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance li          <Tabs.Content padding='0'>
            <AppUserSubscriptionsForm
              isFetchingProfile={isFetchingProfile}
              isImplicit={isImplicit}
              subscriptionsList={subscriptionOptionsList}
              onSelectRoleForUser={onSelectApplicationRoleForUser}
              onSubscriptionToggle={onSubscriptionToggle}
            />
          </Tabs.Content>is file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Tabs 
} from '@chakra-ui/react'
import {
  ChangeEvent, useContext
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import {
  CreateUserFormData, RoleOption, SubscriptionOption, UserFormMode
} from '../../../hooks/adminActions/users/useCreateUserForm.types'
import { UserEducationOrganizationsHook } from '../../../hooks/adminActions/users/useUserEducationOrganizations.types'
import AppUserDetailsForm from './AppUserDetailsForm'
import AppUserSubscriptionsForm from './AppUserSubscriptionsForm'
import UserOrganizationsForm from './UserOrganizationsForm'

const tabsList = [
  'User Details',
  'Organizations',
  'Licenses'
]

interface EditAppUserFormContentProps {
    mode: UserFormMode
    userData: CreateUserFormData
    edOrgHookData: UserEducationOrganizationsHook
    errors: FormDataErrors
    roleOptions: RoleOption[]
    isImplicit: (applicationId: string) => boolean  
    isFetchingProfile: boolean 
    subscriptionOptionsList: SubscriptionOption[]
    edOrgEditMode: boolean
    onUpdateEditEdOrgMode: (value: boolean) => void
    onChangeMode: (value: string) => void
    onToggleIsAdmin: () => void
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onRoleSelect: (e: ChangeEvent<HTMLSelectElement>) => void
    onSelectApplicationRoleForUser: (subscriptionId: string, role: string) => void
    onSubscriptionToggle: (applicationId: string, subscriptionId: string) => void
}

const EditAppUserFormContent = ({ userData, edOrgHookData, mode, isImplicit, isFetchingProfile, errors, roleOptions, subscriptionOptionsList, edOrgEditMode, onUpdateEditEdOrgMode, onChangeMode, onToggleIsAdmin, onInputChange, onRoleSelect, onSelectApplicationRoleForUser, onSubscriptionToggle }: EditAppUserFormContentProps) => {
  const adminConfig = useContext(adminConsoleContext)

  const handleTabChange = (tab: string) => {
    if (tab === 'User Details') {
      return onChangeMode('Edit')
    }

    onChangeMode('Manage Subscriptions')
  }

  const showEdOrgTab = (tab: string) => {
    if (tab === 'Organizations') {
      if (adminConfig && adminConfig.showEdOrgsTab) {
        return true
      }
            
      return false
    }

    return true
  }

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Tabs.Root  
        isFitted 
        position="relative"
        variant="unstyled"
        w='full'
      >
        <Tabs.List>
          {tabsList.filter(tab => showEdOrgTab(tab)).map((tab, index) => 
            <Tabs.Content
              key={index}
              _notFirst={{ ml: '32px' }}
              _selected={{ color: 'blue.600' }}
              fontFamily='Poppins'
              fontSize='16px'
              fontWeight='bold'
              padding='0'
              textAlign='center'
              onClick={() => handleTabChange(tab)}
            >{tab}
            </Tabs.Content>)}
        </Tabs.List>

        <Tabs.Indicator  
          bg="blue.600"
          borderRadius="1px"
          height="2px"
          mt="5px"
        />

        <Tabs.Content
          mt='35px'
          padding='0'
        >
          <Tabs.Content padding='0'>
            <AppUserDetailsForm
              errors={errors}
              mode={mode}
              roleOptions={roleOptions}
              userData={userData}
              onInputChange={onInputChange}
              onSelectChange={onRoleSelect}
              onToggleIsAdmin={onToggleIsAdmin}
            />
          </Tabs.Content>

          {adminConfig && adminConfig.showEdOrgsTab && <Tabs.Content padding='0'>
            <UserOrganizationsForm 
              editMode={edOrgEditMode}
              formHookData={edOrgHookData}
              onUpdateEditEdOrgMode={onUpdateEditEdOrgMode}
            />
          </Tabs.Content>}

          <TabPanel padding='0'>
            <AppUserSubscriptionsForm
              isFetchingProfile={isFetchingProfile}
              isImplicit={isImplicit}
              subscriptionsList={subscriptionOptionsList}
              onSelectRoleForUser={onSelectApplicationRoleForUser}
              onSubscriptionToggle={onSubscriptionToggle}
            />
          </Tabs.Content>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  )
}

export default EditAppUserFormContent