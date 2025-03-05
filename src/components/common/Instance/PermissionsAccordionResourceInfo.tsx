// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex, Text
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
    <Accordion w='full'>
      <AccordionItem
        border='none'
        w='full'
      >
        <Flex
          alignItems='center'
          w='full'
        >
          <AccordionButton
            border='none'
            px='0'
            w='full'
          >
            <Flex
              justifyContent='space-between'
              w='full'
            >
              <Flex w='full'>
                <AccordionIcon
                  aria-hidden="true"
                  focusable="false"
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
          </AccordionButton>
        </Flex>

        <AccordionPanel
          border='none'
          pl='30px'
        >
          {resourceInfoData.name}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default PermissionsAccordionResourceInfo