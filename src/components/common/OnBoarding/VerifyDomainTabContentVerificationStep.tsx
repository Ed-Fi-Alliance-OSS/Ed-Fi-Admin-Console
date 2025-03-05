// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { DomainData } from '../../../hooks/adminActions/dns/useVerifyDomain'
import VerifyDomainList from './VerifyDomainList'

interface VerifyDomainTabContentVerificationStepProps {
    domainsList: DomainData[]
    isCheckingDomainStatus: boolean 
    selectedDomain: string | null
    isRemovingDomain: boolean
    onVerifyDomain: (domainName: DomainData) => Promise<void>
    onSelectDomain: (e: ChangeEvent<HTMLInputElement>) => void
    onRemoveDomain: (domainName: string) => void
}

const VerifyDomainTabContentVerificationStep = ({ domainsList, isCheckingDomainStatus, isRemovingDomain, selectedDomain, onSelectDomain, onRemoveDomain, onVerifyDomain }: VerifyDomainTabContentVerificationStepProps) => {
  return (
    <>
      <Flex
        alignItems='center'
        bg='gray.100'
        padding='8px 16px'
        w='750px'
      >
        <Text
          borderRadius='4px'
          display='flex'
          fontFamily='Poppins'
          fontSize='18px'
          fontWeight='700'
          size='md'
        >
          Step 3: Come Back and Check for Verification  
        </Text>

        <Text
          fontFamily='Poppins'
          fontSize='16px'
          fontWeight='400'
          ml='10px'
        >   
          (This can take up to 24 hours)
        </Text>
      </Flex>

      <Flex mt='8px'>
        <VerifyDomainList
          domainsList={domainsList}
          isCheckingDomainStatus={isCheckingDomainStatus}
          isRemovingDomain={isRemovingDomain}
          selectedDomain={selectedDomain}
          showCheck={false}
          showDomainStatus={true}
          onRemoveDomain={onRemoveDomain}
          onSelectDomain={onSelectDomain}
          onVerifyDomain={onVerifyDomain}
        />
      </Flex>
    </>
  )
}

export default VerifyDomainTabContentVerificationStep