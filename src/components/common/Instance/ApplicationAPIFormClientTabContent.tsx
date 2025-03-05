// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Alert, AlertIcon, Flex, FormControl, Text
} from '@chakra-ui/react'
import {
  CopyTextBtn, CustomFormLabel, CustomInput
} from '@edfi/admin-console-shared-sdk'
import { EdfiApplicationAuthData } from '../../../core/Edfi/EdfiApplications'
import RefreshBtn from '../RefreshBtn'

interface ApplicationAPIFormClientTabContentProps {
    clientData: EdfiApplicationAuthData
    mode: 'add' | 'edit'
    isRegeneratingCredentials: boolean 
    onRegenerateCredentials: () => void
}

const ApplicationAPIFormClientTabContent = ({ clientData, mode, isRegeneratingCredentials, onRegenerateCredentials }: ApplicationAPIFormClientTabContentProps) => {
  const getKeyFieldType = () => {
    if (mode === 'add') {
      return 'text'
    }

    if (mode === 'edit') {
      if (clientData.key === 'applicationKey') {
        return 'password'
      }
            
      return 'text'
    }
  }

  return (
    <Flex
      flexDir='column'
      mt='0px'
      w='full'
    >
      {clientData.key !== 'applicationKey' && <Alert
        fontFamily='Poppins'
        fontSize='12px'
        mt='10px'
        padding='10px'
        status="info"
      >
        <AlertIcon />
        Be sure to make note of the Key and Secret values. You will not be able to obtain these later without regenerating the values.
      </Alert>}

      <FormControl mt='12px'>
        <CustomFormLabel 
          htmlFor="apiClientKey" 
          text="Key"
        />

        <Flex>
          <CustomInput
            disabled={true}
            id="apiClientKey"
            type={getKeyFieldType()}
            value={clientData.key}
            onChange={() => null}
          />

          { clientData.key !== 'applicationKey' && <CopyTextBtn value={clientData.key} /> }
        </Flex>
      </FormControl>

      <FormControl mt='16px'> 
        <CustomFormLabel 
          htmlFor="apiClientSecret" 
          text="Secret"
        />

        <Flex>
          <CustomInput
            disabled={true}
            id="apiClientSecret"
            type="password"
            value={clientData.secret}
            onChange={() => null}
          />

          { clientData.secret !== 'applicationSecret' && <CopyTextBtn value={clientData.secret} /> }
        </Flex>
      </FormControl>

      { mode === 'edit' && <Flex flexDir='column'>
        <Flex>
          <Text 
            color='blue.700'
            mr='5px'
          >
            Regenerate credentials
          </Text>

          <RefreshBtn 
            id="credential"
            isRefreshing={isRegeneratingCredentials}
            onAction={onRegenerateCredentials}
          />
        </Flex>

        <Alert
          fontFamily='Poppins'
          fontSize='12px'
          mt='10px'
          padding='10px'
          status='warning'
        >
          <AlertIcon />
          Regenerating credentials will cause applications that used the previous values to not function.
        </Alert>
      </Flex>}
    </Flex>
  )
}

export default ApplicationAPIFormClientTabContent