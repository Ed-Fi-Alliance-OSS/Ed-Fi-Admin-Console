// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Accordion, Flex, Text
} from '@chakra-ui/react'
import usePermissionsAccordion from '../../../hooks/adminActions/ods/usePermissionsAccordion'
import AccordionItemSkeleton from '../AccordionItemSkeleton'
import PermissionsAccordionTable from './PermissionsAccordionTable'

const PermissionsAccordion = () => {
  const { permissions } = usePermissionsAccordion()

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Text
        border='1px'
        borderColor='gray.300'
        fontFamily='Poppins'
        fontWeight='700'
        padding='10px 50px'
        fontSize='sm'
      >
        Claim Set
      </Text>

      <Accordion.Root   
        border='1px'
        borderColor='gray.300'
        p='0'
        w='full'
      >
        {permissions.map((permissionInfo, index) => 
          <Accordion.Item   
            key={index}
            border='1px' 
            borderColor='gray.300'
          >
            <Flex
              alignItems='center'
              w='full'
            >
              <Accordion.ItemTrigger
                border='none'
                w='full'
              >
                <Accordion.ItemIndicator
                  aria-hidden="true"
                  focusable="false"
                />

                <Text 
                  color='blue.600'
                  fontFamily='Poppins'
                  fontWeight='700'
                  ml='10px'
                >
                  {permissionInfo.name}
                </Text>
              </Accordion.ItemTrigger>
            </Flex>

            <Accordion.ItemIndicator
              px='50px'
              w='full'
            >
              <Flex
                flexDir='column'
                w='full'
              >
                <Text
                  color='blue.600'
                  fontFamily='Poppins'
                  fontWeight='700'
                  mb='16px'
                  fontSize='lg'
                >
                  Resources
                </Text>

                <PermissionsAccordionTable resourceInfo={{ 
                  systemDescriptors: { name: permissionInfo.name  }, 
                  types: { name: 'Types' },
                  educationOrganizations: { name: 'Education Organizations' }
                }}
                />
              </Flex>
            </Accordion.ItemIndicator>
          </Accordion.Item>)}

        <AccordionItemSkeleton itemsCount={permissions.length} />
      </Accordion.Root>
    </Flex>
  )
}

export default PermissionsAccordion