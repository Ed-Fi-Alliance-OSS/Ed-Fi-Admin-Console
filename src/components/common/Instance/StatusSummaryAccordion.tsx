// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Accordion,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'
import { InstanceEdfiStatus } from '../../../core/ODSInstance.types'
import ODSInstanceEdFiStatus from '../ODS/ODSInstanceEdFiStatus'
import InstanceServiceHealthBar from './InstanceServiceHealthBar'

interface ServiceHealth {
    name: string 
    uptimeDescription: string 
    uptimePercentage: number 
    updatedDate: string 
}

interface InstanceHealth {
    name: string 
    status: InstanceEdfiStatus
    healthList: Array<ServiceHealth>
}

interface StatusSummaryAccordionProps {
    instanceList: InstanceHealth[]
}

const StatusSummaryAccordion = ({ instanceList }: StatusSummaryAccordionProps) => {
  return (
    <Flex direction="column" width="full">
      {instanceList.map((instance, index) => (
        <Box 
          key={index}
          _notFirst={{ mt: '24px' }} 
          bg='white'
          border='1px'
          borderColor='gray.300'
          borderRadius='4px'
        >
          <Accordion.Root allowToggle>
            <Accordion.Item>
              <Flex 
                alignItems="center"
                height="64px"
              >
                <Accordion.ItemTrigger>
                  <Flex  _hover={{ bg: 'transparent' }} alignItems="center">
                    <Box ml="30px" mr="10px">
                      <Accordion.ItemIndicator />
                    </Box>
                    
                    <Text 
                      color='blue.600'
                      fontFamily='Poppins'
                      fontWeight='700'
                      fontSize='16px'
                    >
                      {instance.name}
                    </Text>
                    
                    <Flex ml='50px'>
                      <ODSInstanceEdFiStatus status={instance.status.operationStatus} />
                    </Flex>
                  </Flex>
                </Accordion.ItemTrigger>
              </Flex>
              
              <Accordion.ItemBody padding='45px 30px'>
                {instance.healthList.map((service, sindex) => (
                  <InstanceServiceHealthBar
                    key={sindex}
                    serviceHealth={service}
                  />
                ))}
              </Accordion.ItemBody>
            </Accordion.Item>
          </Accordion.Root>
        </Box>
      ))}
    </Flex>
  )
}

export default StatusSummaryAccordion
