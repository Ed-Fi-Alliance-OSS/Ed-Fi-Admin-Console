// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
    <Accordion w='full'>
      {instanceList.map((instance, index) => 
        <AccordionItem 
          key={index} 
          _notFirst={{ mt: '24px' }} 
          bg='white'
          border='1px'
          borderColor='gray.300'
          borderRadius='4px'
        >
          <AccordionButton
            alignItems='center'
            display='flex'
            h='64px'
          >
            <AccordionIcon
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
          </AccordionButton>

          <AccordionPanel padding='45px 30px'>
            {instance.healthList.map((service, sindex) => 
              <InstanceServiceHealthBar
                key={sindex}
                serviceHealth={service}
              />)}
          </AccordionPanel>
        </AccordionItem>)}
    </Accordion>
  )
}

export default StatusSummaryAccordion