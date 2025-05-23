// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdAdd } from 'react-icons/md'
import {
  Button, Flex, Text
} from '@chakra-ui/react'
import { VerifiedDomainInfo } from '../../../core/verifyDomain/VerifyDomain.types'
import DomainTag from '../DomainTag'
import DomainVerificationStatus from '../OnBoarding/DomainVerificationStatus'
import RefreshBtn from '../RefreshBtn'

interface DistrictSchoolSettingsFormProps {
    districtSchoolName: string 
    districtSchoolId: string 
    tsdsId: string 
    domainsInfo: VerifiedDomainInfo[]
    isRemovingDomain: boolean 
    onRemoveDomain: (domainName: string) => void
}

const DistrictSchoolSettingsForm = ({ districtSchoolName, districtSchoolId, tsdsId, domainsInfo, isRemovingDomain, onRemoveDomain }: DistrictSchoolSettingsFormProps) => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Text
        color='gray.700'
        fontFamily='Poppins'
        fontSize='md'
        fontWeight='400'
      >
        District/Charter School Name (Read-Only)
      </Text>

      <Text
        fontFamily='Poppins'
        fontSize='md'
        fontWeight='700'
      >
        {districtSchoolName}
      </Text>

      <Flex
        flexDir='column'
        mt='16px'
      >
        <Text
          color='gray.700'
          fontFamily='Poppins'
          fontSize='md'
          fontWeight='400'
        >
          District/Charter School ID (Read-Only)
        </Text>

        <Text
          fontFamily='Poppins'
          fontSize='md'
          fontWeight='700'
        >
          {districtSchoolId}
        </Text>
      </Flex>

      <Flex
        flexDir='column'
        mt='16px'
      >
        <Text
          color='gray.700'
          fontFamily='Poppins'
          fontSize='md'
          fontWeight='400'
        >
          TSDS ID (Read-Only)
        </Text>

        <Text
          fontFamily='Poppins'
          fontSize='md'
          fontWeight='700'
        >
          {tsdsId}
        </Text>
      </Flex>

      <Flex
        flexDir='column'
        mt='16px'
      >
        <Text
          fontFamily='Poppins'
          fontSize='md'
          fontWeight='700'
        >
          Your Domain(s)
        </Text>

        <Flex
          flexDir='column'
          mt='5px'
          w='full'
        >
          {domainsInfo.map(domain => 
            <Flex key={domain.domain}>
              <DomainTag domain={domain.domain} />

              <Flex mx='10px'>
                <DomainVerificationStatus 
                  isRemovingDomain={isRemovingDomain}
                  status={domain.status}
                  onRemoveDomain={onRemoveDomain}
                />
              </Flex>

              <RefreshBtn 
                id={domain.domain}
                onAction={() => console.log('refresh domain info for', domain.domain)}
              />
            </Flex>)}

          <Button
            aria-labelledby="add-btn"
            color='secondaryBlue600'
            maxW='30px'
            minWidth='30px'
            mt='5px'
            variant="solid"
            w='auto'
          >
            <span
              hidden
              id="add-btn"
            >Add
            </span>

            <MdAdd
              aria-hidden="true"
              focusable="false" 
              fontSize='10px'
            />
          </Button>   
        </Flex>
      </Flex>

      <Button
        color='primaryBlue600'
        maxW='200px'
        minW='150px'
        mt='32px'
        size='lg'
        value="solid"
      >
        Save Edits
      </Button>
    </Flex>        
  )
}

export default DistrictSchoolSettingsForm