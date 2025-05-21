// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Field, Text
} from '@chakra-ui/react'
import {
  CustomCheckbox,
  CustomFormLabel,
  CustomInput
} from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import {
  CreateUserFormData, RoleOption, UserFormMode
} from '../../../hooks/adminActions/users/useCreateUserForm.types'

interface AppUserDetailsFormProps {
    mode: UserFormMode
    userData: CreateUserFormData
    roleOptions: RoleOption[]
    errors: FormDataErrors
    isEmailDisabled?: boolean
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onToggleIsAdmin: () => void
    onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const AppUserDetailsForm = ({ mode, userData, isEmailDisabled, roleOptions, errors, onToggleIsAdmin, onInputChange, onSelectChange }: AppUserDetailsFormProps) => {
  const showUserName = false

  /*
    {mode === 'Add' && <Field.Root mt='24px'>
    <CustomFormLabel 
        htmlFor='role' 
        text='Role' />
    <CustomSelect 
        options={roleOptions.map(role => ({ value: role, text: role === 'Tenant.Admin'? ' District Admin' : 'District User' }) )} 
        value={userData.role}
        onChange={onSelectChange} />
</Field.Root>}

*/

  return (
    <>
      {(mode === 'Add' || mode === 'Edit') && <Field.Root>
        { showUserName &&  <>
          <CustomFormLabel 
            htmlFor='userName' 
            text='User Name'
          />

          <CustomInput 
            id='userName' 
            value={userData.userName}
            onChange={onInputChange}
          />
        </>}
      </Field.Root>}

      <Field.Root mt={mode === 'Add' || mode === 'Edit'? '0px' : '0px'}>
        <CustomFormLabel 
          htmlFor='firstName' 
          text='First Name'
        />

        <CustomInput 
          disabled={mode === 'Edit'} 
          error={errors && errors['firstName'] && errors['firstName'].message}
          id='firstName'
          value={userData.firstName}
          onChange={onInputChange}
        />
      </Field.Root>

      <Field.Root mt='24px'>
        <CustomFormLabel 
          htmlFor='lastName' 
          text='Last Name'
        />

        <CustomInput 
          disabled={mode === 'Edit'} 
          error={errors && errors['lastName'] && errors['lastName'].message}
          id='lastName'
          value={userData.lastName}
          onChange={onInputChange}
        />
      </Field.Root>

      <Field.Root mt='24px'>
        <CustomFormLabel 
          htmlFor='email' 
          text='Email'
        />

        <CustomInput 
          disabled={mode === 'Edit' || isEmailDisabled} 
          error={errors && errors['email'] && errors['email'].message} 
          id='email' 
          type='email'
          value={userData.email}
          onChange={onInputChange}
        />
      </Field.Root>

      <Field.Root mt='24px'>
        <Text 
          fontSize='14px'
          fontWeight='700'
        >Is System Administrator?
        </Text>

        <Flex
          alignItems='center'
          mt='6px'
        >
          <CustomCheckbox
            id="setAsAdmin"
            isChecked={userData.role === 'Tenant.Admin'? true : false}
            value="Yes, grant System Administrator access."
            onCheck={() => onToggleIsAdmin()}
          />

          <Field.Label
            fontSize='12px'
            htmlFor="setAsAdmin"
            ml='6px'
            mt='2px'
          >
            Yes, grant System Administrator access.
          </Field.Label>
        </Flex>

        <Text
          fontFamily='Poppins'
          fontSize='12px'
          fontWeight='400'
          mt='6px'
        >  
          NOTE: System Administrators have the highest level of access in the Tech Console. By granting this user System Administrator access, you will be giving them access to manage instances, users, and licenses, as well as update District/Charter School settings.
        </Text>
      </Field.Root>
    </>
  )
}

export default AppUserDetailsForm