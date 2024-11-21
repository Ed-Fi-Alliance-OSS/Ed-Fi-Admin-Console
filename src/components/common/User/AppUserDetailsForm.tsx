import {
  Flex, FormControl, FormLabel, Text 
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import {
  CreateUserFormData, RoleOption, UserFormMode 
} from '../../../hooks/adminActions/users/useCreateUserForm.types'
import {
  CustomFormLabel, CustomSelect, CustomInput, CustomCheckbox 
} from '@edfi/admin-console-shared-sdk'

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
    {mode === 'Add' && <FormControl mt='24px'>
    <CustomFormLabel 
        htmlFor='role' 
        text='Role' />
    <CustomSelect 
        options={roleOptions.map(role => ({ value: role, text: role === 'Tenant.Admin'? ' District Admin' : 'District User' }) )} 
        value={userData.role}
        onChange={onSelectChange} />
</FormControl>}

*/

  return (
    <>
      {(mode === 'Add' || mode === 'Edit') && <FormControl>
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
      </FormControl>}

      <FormControl mt={mode === 'Add' || mode === 'Edit'? '0px' : '0px'}>
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
      </FormControl>

      <FormControl mt='24px'>
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
      </FormControl>

      <FormControl mt='24px'>
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
      </FormControl>

      <FormControl mt='24px'>
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

          <FormLabel
            fontSize='12px'
            htmlFor="setAsAdmin"
            ml='6px'
            mt='2px'
          >
            Yes, grant System Administrator access.
          </FormLabel>
        </Flex>

        <Text
          fontFamily='Open sans'
          fontSize='12px'
          fontWeight='400'
          mt='6px'
        >  
          NOTE: System Administrators have the highest level of access in the Tech Console. By granting this user System Administrator access, you will be giving them access to manage instances, users, and licenses, as well as update District/Charter School settings.
        </Text>
      </FormControl>
    </>
  )
}

export default AppUserDetailsForm