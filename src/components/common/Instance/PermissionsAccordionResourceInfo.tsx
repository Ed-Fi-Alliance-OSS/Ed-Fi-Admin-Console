// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Accordion, Flex, Text
} from '@chakra-ui/react'

interface ResourceInfoData {
    name: string 
    read?: boolean 
    create?: boolean 
    update?: boolean 
    delete?: boolean
}

interface ResourceInfo {
    types: ResourceInfoData 
    systemDescriptors: ResourceInfoData 
    educationOrganizations: ResourceInfoData
}

interface PermissionsAccordionResourceInfoProps {
    resourceInfoData: ResourceInfoData
}

const PermissionsAccordionResourceInfo = ({ resourceInfoData }: PermissionsAccordionResourceInfoProps) => {
  return (
    <Accordion.Root w='full'>
      <Accordion.Item>
        <Flex
          alignItems='center'
          border='none'
          w='full'
        >
          <Accordion.ItemTrigger>
            <Flex
              border='none'
              justifyContent='space-between'
              px='0'
              w='full'
            >
              <Flex w='full'>
                <Accordion.ItemIndicator
                  aria-hidden="true"
                />

                <Text 
                  color='blue.600'
                  fontFamily='Poppins'
                  fontWeight='700'
                  ml='10px'
                >
                  {resourceInfoData.name}
                </Text>
              </Flex>
            </Flex>
          </Accordion.ItemTrigger>
        </Flex>

        <Accordion.ItemIndicator>
          <Flex
            border='none'
            pl='30px'
          >
            {resourceInfoData.name}
          </Flex>
        </Accordion.ItemIndicator>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export default PermissionsAccordionResourceInfo