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
        fontSize='sm'
        fontWeight='700'
        padding='10px 50px'
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
          <Accordion.Item>
            <Flex
              alignItems='center'
              border='1px'
              borderColor='gray.300'
              w='full'
            >
              <Accordion.ItemTrigger>
                <Flex
                  border='none'
                  w='full'
                >
                  <Accordion.ItemIndicator />
                  <Flex aria-hidden="true">
                    <Text
                      color='blue.600'
                      fontFamily='Poppins'
                      fontWeight='700'
                      ml='10px'
                    >
                      {permissionInfo.name}
                    </Text>
                  </Flex>
                </Flex>
              </Accordion.ItemTrigger>
            </Flex>

            <Accordion.ItemIndicator>
              <Flex
                flexDir='column'
                px='50px'
                w='full'
              >
                <Text
                  color='blue.600'
                  fontFamily='Poppins'
                  fontSize='lg'
                  fontWeight='700'
                  mb='16px'
                >
                  Resources
                </Text>

                <PermissionsAccordionTable resourceInfo={{
                  systemDescriptors: { name: permissionInfo.name },
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