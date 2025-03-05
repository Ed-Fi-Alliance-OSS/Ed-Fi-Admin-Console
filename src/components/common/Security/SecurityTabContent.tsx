// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs
} from '@chakra-ui/react'
import TabHeading from '../TabHeading'
import APIClientsTab from './APIClientsTab'
import IdentityProvidersTab from './IdentityProvidersTab'

const tabs = [
  'Identity Providers',
  'API Clients'
]

const panels = [
  <IdentityProvidersTab />,
  <APIClientsTab />
]

const SecurityTabContent = () => {
  return (
    <Flex w='full'>
      <TabHeading text="Security" />

      <Flex 
        className="s-container"
        ml='160px' 
        mt='10px' 
        w='full'
      >
        <Tabs
          position="relative" 
          variant="unstyled"
          w='full'
        >
          <TabList>
            {tabs.map((tab, index) => 
              <Tab 
                key={index}
                _notFirst={{ ml: '32px' }}
                _selected={{ color: 'blue.600' }}
                fontFamily='Poppins'
                fontWeight='bold'
                padding='0'
              >{tab}
              </Tab>)}
          </TabList>

          <TabIndicator
            bg="blue.600"
            borderRadius="1px"
            height="2px"
            mt="5px"
          />

          <TabPanels>
            {panels.map((panel, index) => 
              <TabPanel 
                key={index} 
                mt='45px'
                padding='0'
                w='full'
              >
                {panel}
              </TabPanel>)}
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  )
}

export default SecurityTabContent