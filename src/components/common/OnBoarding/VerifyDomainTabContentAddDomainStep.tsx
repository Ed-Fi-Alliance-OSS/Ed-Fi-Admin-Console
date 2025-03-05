// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import CreateDomainForm from './CreateDomainForm'

interface VerifyDomainTabContentAddDomainStepProps {
    domainName: string 
    isSaving: boolean 
    errors: FormDataErrors
    isValidData: () => boolean 
    onAddDomain: (domainName: string) => void
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const VerifyDomainTabContentAddDomainStep = ({ domainName, errors, isValidData, isSaving, onAddDomain, onInputChange }: VerifyDomainTabContentAddDomainStepProps) => {
  return (
    <>
      <Flex
        bg='gray.100'
        padding='8px 16px'
        w='750px'
      >
        <Text
          borderRadius='4px'
          display='inline-block'
          fontFamily='Poppins'
          fontSize='18px'
          fontWeight='700'
          size='md'
        >
          Step 1: Add a Domain
          <Text
            as="span"
            fontFamily='Poppins'
            fontSize='16px'
            fontWeight='400'
            ml='5px'
          >   
            (This should be the domain associated with your district without “https://” or “www”. Just input the domain itself—for example “grandbend.edu”.) 
          </Text>
        </Text>
      </Flex>

      <Flex
        flexDir='column'
        mt='8px'
        w='300px'
      >
        <CreateDomainForm 
          domainName={domainName}
          errors={errors}
          isSaving={isSaving}
          isValidData={isValidData}
          onAddDomain={onAddDomain}
          onInputChange={onInputChange}
        />
      </Flex>
    </>
  )
}

export default VerifyDomainTabContentAddDomainStep