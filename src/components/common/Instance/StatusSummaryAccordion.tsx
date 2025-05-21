// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Accordion,
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
    <Accordion.Root w='full'>
      {instanceList.map((instance, index) => 
        <Accordion.Item 
          key={index} 
          _notFirst={{ mt: '24px' }} 
          bg='white'
          border='1px'
          borderColor='gray.300'
          borderRadius='4px'
        >
          <Accordion.ItemTrigger
            alignItems='center'
            display='flex'
            h='64px'
          >
            <Accordion.ItemIndicator
              aria-hidden="true"
              focusable="false"
              ml='30px'
            />

            <Text 
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              ml='10px'
              size='16px'
            >
              {instance.name}
            </Text>

            <Flex ml='50px'>
              <ODSInstanceEdFiStatus status={instance.status} />
            </Flex>
          </Accordion.ItemTrigger>

          <AccordionPanel padding='45px 30px'>
            {instance.healthList.map((service, sindex) => 
              <InstanceServiceHealthBar
                key={sindex}
                serviceHealth={service}
              />)}
          </AccordionPanel>
        </Accordion.Item>)}
    </Accordion.Root>
  )
}

export default StatusSummaryAccordion