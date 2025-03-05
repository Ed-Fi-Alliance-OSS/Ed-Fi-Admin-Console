// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import AppUserDetailsForm from './AppUserDetailsForm'
import AppUserSubscriptionsForm from './AppUserSubscriptionsForm'
import { ChangeEvent } from 'react'
import {
  CreateUserFormData, RoleOption, SubscriptionOption, UserFormMode 
} from '../../../hooks/adminActions/users/useCreateUserForm.types'
import { CompleteFormErrorMessage } from '@edfi/admin-console-shared-sdk'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'

interface AddAppUserFormContentProps {
    mode: UserFormMode
    userData: CreateUserFormData
    roleOptions: RoleOption[]
    subscriptionOptionsList: SubscriptionOption[]
    hasTriedSubmit: boolean
    errors: FormDataErrors
    onChangeMode: (value: string) => void
    onToggleIsAdmin: () => void
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onRoleSelect: (e: ChangeEvent<HTMLSelectElement>) => void
    onSelectApplicationRoleForUser: (subscriptionId: string, role: string) => void
    onSubscriptionToggle: (applicationId: string, subscriptionId: string) => void
}

const AddAppUserFormContent = ({ mode, userData, roleOptions, subscriptionOptionsList, errors, hasTriedSubmit, onToggleIsAdmin, onChangeMode, onInputChange, onRoleSelect, onSelectApplicationRoleForUser, onSubscriptionToggle }: AddAppUserFormContentProps) => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      {Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage />}

      <Flex
        flexDir='column'
        mt={mode !== 'Invite Admin'? '24px' : '0px'}
        w='full'
      >
        <AppUserDetailsForm 
          errors={errors}
          mode={mode}
          roleOptions={roleOptions}
          userData={userData}
          onInputChange={onInputChange}
          onSelectChange={onRoleSelect}
          onToggleIsAdmin={onToggleIsAdmin}
        />
      </Flex>

      {mode !== 'Invite Admin' && <Flex
        mt='24px'
        w='full'
      >
        <AppUserSubscriptionsForm
          isFetchingProfile={false}
          isImplicit={() => false}
          subscriptionsList={subscriptionOptionsList}
          onSelectRoleForUser={onSelectApplicationRoleForUser}
          onSubscriptionToggle={onSubscriptionToggle}
        />
      </Flex>}
    </Flex>
  )
}

export default AddAppUserFormContent