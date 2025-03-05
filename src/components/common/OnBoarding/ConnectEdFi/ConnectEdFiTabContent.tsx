// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { FormDataErrors } from '../../../../core/validation/FormValidations.types'
import {
  EdFiConnectionFormData, EdFiConnectionFormMode, EdFiConnectionVerificationStatus
} from '../../../../hooks/edfi/useEdFiConnectionForm.types'
import EdFiConnectionForm from '../../EdFi/EdFiConnectionForm'
import OnBoardingTabContentWrapper from '../OnBoardingTabContentWrapper'

interface ConnectEdFiTabContentProps {
    formData: EdFiConnectionFormData
    mode: EdFiConnectionFormMode
    verificationStatus: EdFiConnectionVerificationStatus
    disabledVerification: boolean 
    isVerifying: boolean 
    isSaving: boolean 
    errors: FormDataErrors
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onVerifyConnection: () => void
}

const ConnectEdFiTabContent = ({ formData, mode, verificationStatus, isVerifying, disabledVerification, isSaving, errors, onInputChange, onVerifyConnection }: ConnectEdFiTabContentProps) => {
  return (
    <OnBoardingTabContentWrapper>
      <Text
        fontFamily='Poppins'
        fontWeight='400'
        textAlign='justify'
        w='720px'
      >
        Now that your domain is verified, we need more information to connect to an Ed-Fi Operational
        Data Store. Fill out the fields below with the credentials for the externally hosted Ed-Fi instance
        and submit them to test the connection. The status must be "Connected" to continue to the next step.
      </Text>

      <Flex
        mt='32px'
        w='45%'
      >
        <EdFiConnectionForm
          disabledVerification={disabledVerification}
          errors={errors}
          formData={formData}
          inOnboarding={true}
          isSaving={isSaving}
          isverifying={isVerifying}
          mode={mode}
          verificationStatus={verificationStatus}
          onInputChange={onInputChange}
          onVerifyConnection={onVerifyConnection}
        />
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default ConnectEdFiTabContent