// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Accordion,
  Flex,
  Text
} from '@chakra-ui/react'
import {
  DomainStatus, Tenant
} from '../../../core/Tenant.types'

interface DistrictSchoolsAccordionProps {
    district: Tenant
    isRemovingDomain: boolean
    onRemoveDomain: (domainName: string) => void
    onShowAddDomainForm: () => void
}

const getStatusColor = (status: DomainStatus) => {
  if (status === 'Verified') {
    return 'green.600' 
  }

  if (status === 'Unverified') {
    return 'orange.400' 
  }

  if (status === 'Rejected') {
    return 'red.800' 
  }

  if (status === 'Error') {
    return 'red.800' 
  }
        
  return 'gray.500'
}

const getBorderColor = (status: DomainStatus) => {
  if (status === 'Verified') {
    return 'green.400' 
  }

  if (status === 'Unverified') {
    return 'orange.300' 
  }

  if (status === 'Rejected') {
    return 'red.400' 
  }

  if (status === 'Error') {
    return 'red.400' 
  }
    
  return 'gray.300'
}  

const DistrictSchoolsAccordion = ({ district, isRemovingDomain, onRemoveDomain, onShowAddDomainForm }: DistrictSchoolsAccordionProps) => {
  return (
    <Accordion.Root   
      p='0' 
      w='full'
    >
      <Accordion.Item>
        <Flex
          alignItems='center'
          w='full'
        >
          <Accordion.ItemTrigger>
            <Flex
              border='none'
              display='flex'
              justifyContent='space-between'
              w='191px'
            >
              <Accordion.ItemIndicator
                aria-hidden="true"
              />
              <Flex>  </Flex>
              <Text 
                color='blue.600'
                fontFamily='Poppins'
                fontWeight='700'
                ml='10px'
              >
                orgname
                {/* {district.organizationName} */}
              </Text>
            </Flex>

            <Flex w='231px'>
              <Text
                color='gray.700'
                fontFamily='Poppins'
                fontWeight='300'
              >
                {/* {district.organizationIdentifier} */}
                org id
              </Text>
            </Flex>

            <Flex
              flexDir='column'
              w='273px'
            >
              <Flex
                flexDir='column'
                mt='5px'
                w='full'
                zIndex='2'
              >
                Domain
              </Flex>
            </Flex>

            <Flex w='150px'>
              <Text
                color='gray.700'
                fontFamily='Poppins'
                fontWeight='300'
              >
                org length
              </Text>
            </Flex>
          </Accordion.ItemTrigger>
        </Flex>

        <Accordion.ItemBody
          mt='24px'
          w='full'
        >
          <Flex
            flexDir='column'
            px='16px'
            w='full'
          >
            {/* <DistrictSchoolsDataTable schools={district.organizations} /> */}
          </Flex>
        </Accordion.ItemBody>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export default DistrictSchoolsAccordion