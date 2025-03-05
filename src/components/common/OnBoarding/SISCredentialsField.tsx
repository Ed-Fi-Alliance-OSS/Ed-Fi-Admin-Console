// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, FormControl
} from '@chakra-ui/react'
import {
  CopyTextBtn,
  CustomFormLabel,
  CustomInput
} from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'

interface SISCredentialsFieldProps {
    credentialsKey: string 
    credentialsSecret: string 
    isLoadingCredentials: boolean
    regenerateCredentialsDisabled: boolean
    onChangeCredentials: (e: ChangeEvent<HTMLInputElement>) => void
    onRegenerateCredentials: () => void
}

const SISCredentialsField = ({ credentialsKey, credentialsSecret, isLoadingCredentials, regenerateCredentialsDisabled, onChangeCredentials, onRegenerateCredentials }: SISCredentialsFieldProps) => {
  return (
    <Flex
      flexDir='column'
      mt='10px'
    >
      <FormControl>   
        <CustomFormLabel
          htmlFor="key"
          text="Key"
        />

        <Flex justifyContent='space-between'>
          <CustomInput
            disabled
            id="key"
            value={credentialsKey}
            onChange={onChangeCredentials}
          />

          <Flex ml='10px'>
            <CopyTextBtn 
              value={credentialsKey}
              withoutBorder={true}
            />
          </Flex>
        </Flex>
      </FormControl>

      <FormControl mt='16px'>
        <CustomFormLabel
          htmlFor="secret"
          text="Secret"
        />

        <Flex justifyContent='space-between'>
          <CustomInput
            disabled
            id="secret"
            type="password"
            value={credentialsSecret}
            onChange={onChangeCredentials}
          />

          <Flex ml='10px'>
            <CopyTextBtn 
              value={credentialsSecret}
              withoutBorder={true}
            />
          </Flex>
        </Flex>
      </FormControl>

      <Flex
        justifyContent='flex-start'
        w='full'
      >
        <Button
          color='blue.500'
          fontFamily='Poppins'
          fontSize='16px'
          fontWeight='700'
          isDisabled={regenerateCredentialsDisabled}
          mt='10px'
          padding='0'
          textAlign='start'
          w='auto'
          onClick={onRegenerateCredentials}
        >
          {isLoadingCredentials? 'Loading credentials...' : 'Click here to regenerate credentials.'}
        </Button>
      </Flex>
    </Flex>
  )
}

export default SISCredentialsField