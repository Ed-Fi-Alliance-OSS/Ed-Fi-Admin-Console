// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { WarningIcon } from '@chakra-ui/icons'
import {
  Flex, Text
} from '@chakra-ui/react'
import { EdFiConnectionVerificationStatus } from '../../../hooks/edfi/useEdFiConnectionForm.types'

interface EdFiConnectionVerificationErrorProps {
    status: EdFiConnectionVerificationStatus 
}

interface VerificationErrorMessagesData {
    authenticationFailed: string 
    baseUrlUnresolved: string 
    credentialError: string 
}

const errorMessages: VerificationErrorMessagesData = {
  authenticationFailed: 'Connection made, but credentials are invalid. Please check Key and Secret for typos and re-verify.',
  baseUrlUnresolved: 'Ed-Fi API Base URL was unresolved or is invalid. Check for mistakes and re-verify.',
  credentialError: 'Connection made, but permissions may not be correct to grant access. Try different credentials and re-verify or talk to your Administrator to change permissions.'
}

const getErrorMessage = (status: EdFiConnectionVerificationStatus) => {
  if (status === 'Authentication Failed') {
    return errorMessages.authenticationFailed
  }

  if (status === 'URL Error') {
    return errorMessages.baseUrlUnresolved
  }

  if (status === 'Credential Error') {
    return errorMessages.credentialError
  }

  return 'Unknown Error'
}

const EdFiConnectionVerificationError = ({ status }: EdFiConnectionVerificationErrorProps) => {
  if (status === 'Authentication Failed' || status === 'Credential Error' || status === 'URL Error') {
    return (
      <Flex 
        bg='red.100'
        flexDir='column'
        p='16px 24px'
        w='full'
      >
        <Flex alignItems='center'>
          <WarningIcon color='red.600' />

          <Text
            fontFamily='Poppins'
            fontSize='16px'
            fontWeight="600"
            ml='12px'
          >
            ERROR
          </Text>
        </Flex>

        <Text 
          color='gray.800' 
          fontFamily='Poppins' 
          ml='28px' 
          mt='6px'
        >
          {getErrorMessage(status)}
        </Text>
      </Flex>
    )
  }

  return (
    <></>
  )
}

export default EdFiConnectionVerificationError