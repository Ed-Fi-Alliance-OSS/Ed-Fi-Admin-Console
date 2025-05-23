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
import { useState } from 'react'
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
  // Track expanded items
  const [ expandedItems, setExpandedItems ] = useState<Record<number, boolean>>({})
  
  const toggleAccordion = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

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
        >            <Flex 
            alignItems="center"
            cursor="pointer"
            height="64px"
            onClick={() => toggleAccordion(index)}
          >
            <Flex _hover={{ bg: 'transparent' }} alignItems="center">
            <Box ml="30px" mr="10px">
                {/* Accordion icon */}
                <Box 
                transform={`rotate(${expandedItems[index] ? '180deg' : '0deg'})`}
                transition="transform 0.2s"
              >
                <svg fill="none" height="6" viewBox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="#2E72D2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
              </Box>
              </Box>
              
            <Text 
                color='blue.600'
                fontFamily='Poppins'
                fontSize='16px'
                fontWeight='700'
              >
                {instance.name}
              </Text>
              
            <Flex ml='50px'>
                <ODSInstanceEdFiStatus status={instance.status.operationStatus} />
              </Flex>
          </Flex>
          </Flex>
          
          <Box 
            display={expandedItems[index] ? 'block' : 'none'} 
            padding='45px 30px'
            transition="all 0.2s"
          >
            {instance.healthList.map((service, sindex) => (
              <InstanceServiceHealthBar
                key={sindex}
                serviceHealth={service}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Flex>
  )
}

export default StatusSummaryAccordion
