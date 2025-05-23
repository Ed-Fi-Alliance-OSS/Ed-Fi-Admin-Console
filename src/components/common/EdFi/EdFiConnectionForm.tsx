// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Field, Text
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomInput, CustomSelect
} from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import {
  EdFiConnectionFormData, EdFiConnectionFormMode, EdFiConnectionVerificationStatus
} from '../../../hooks/edfi/useEdFiConnectionForm.types'
import EdFiConnectionVerification from './EdFiConnectionVerification'

interface EdFiConnectionFormProps {
    formData: EdFiConnectionFormData
    mode: EdFiConnectionFormMode
    inOnboarding: boolean
    verificationStatus: EdFiConnectionVerificationStatus
    isverifying: boolean 
    disabledVerification: boolean
    isSaving: boolean 
    errors: FormDataErrors
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onVerifyConnection: () => void
}

const EdFiConnectionForm = ({ formData, errors, mode, inOnboarding, verificationStatus, isverifying, disabledVerification, isSaving, onInputChange, onVerifyConnection }: EdFiConnectionFormProps) => {  
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      { inOnboarding && <Flex flexDir='column'>
        <Text
          fontFamily='Poppins'
          fontSize='18px'
          fontWeight='700'
        >Credentials
        </Text>

        <Text
          fontFamily='Poppins'
          fontWeight='400'
          w='500px'
        >
          Note: These credentials will be used for both Data Health Check and Data Warehouse as base applications for Acme Service Center. 
          You will be able to connect other applications within the Tech Console later. When setting up your credentials, 
          be sure to use the "Read Only (All Resources)" claim set.
        </Text> 
      </Flex>}

      { !inOnboarding && mode === 'Edit' &&  <Field.Root mt='16px'>
        <CustomFormLabel 
          htmlFor='applicationName' 
          text='Application Name'
        />

        <CustomSelect
          options={[
            {
              value: 'Data Warehouse',
              text: 'Data Warehouse' 
            }, 
            {
              value: 'Data Health Check',
              text: 'Data Health Check' 
            }
          ]}
          disabled={true}
          id="applicationName"
          value={formData.connectionName ?? ''}
          onChange={() => console.log('Change application')}
        />
      </Field.Root> }

      <Field.Root mt='16px'>
        <CustomFormLabel 
          htmlFor='baseUrl' 
          text='Ed-Fi Base URL'
        />

        <CustomInput 
          disabled={mode === 'Edit'? true : false} 
          error={errors && errors['baseUrl'] && errors['baseUrl'].message}
          id='baseUrl'
          value={formData.baseUrl}
          onChange={onInputChange}
        />
      </Field.Root>

      <Field.Root mt='16px'>
        <CustomFormLabel 
          htmlFor='key' 
          text='Key'
        />

        <CustomInput 
          disabled={isSaving} 
          error={errors && errors['key'] && errors['key'].message}
          id='key'
          value={formData.key}
          onChange={onInputChange}
        />
      </Field.Root>

      <Field.Root mt='16px'>
        <CustomFormLabel 
          htmlFor='secret' 
          text='Secret'
        />

        <CustomInput 
          disabled={isSaving} 
          error={errors && errors['secret'] && errors['secret'].message} 
          id='secret' 
          type='password'
          value={formData.secret}
          onChange={onInputChange}
        />
      </Field.Root>

      <Flex
        mt='16px'
        w='full'
      >
        <Button
          alignSelf='flex-end'
          color='primaryBlue500'
          disabled={disabledVerification}
          loading={isSaving || isverifying}
          minW='25px'
          paddingX='16px'
          size='xs'
          variant="solid"
          w='auto'
          onClick={onVerifyConnection}
        >
          Verify Connection
        </Button>
      </Flex>

      <Flex
        bg='gray.300'
        h='1px'
        my='32px'
      />

      <EdFiConnectionVerification 
        inOnboarding={inOnboarding} 
        mode={mode}
        status={verificationStatus}
      />
    </Flex>
  )
}

export default EdFiConnectionForm