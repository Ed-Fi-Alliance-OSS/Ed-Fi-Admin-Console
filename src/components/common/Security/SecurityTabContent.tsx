import { Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
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
        mt='10px' 
        ml='160px' 
        w='full'>
        <Tabs
          position="relative" 
          variant="unstyled"
          w='full'>
          <TabList>
            {tabs.map((tab, index) => 
              <Tab 
                key={index}
                fontFamily='Open sans'
                fontWeight='bold'
                padding='0'
                _selected={{ color: 'blue.600' }}
                _notFirst={{ ml: '32px' }}>{tab}</Tab>
            )}
          </TabList>
          <TabIndicator
            mt="5px"
            height="2px"
            bg="blue.600"
            borderRadius="1px" />
          <TabPanels>
            {panels.map((panel, index) => 
              <TabPanel 
                padding='0' 
                key={index}
                mt='45px'
                w='full'>
                {panel}
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  )
}

export default SecurityTabContent