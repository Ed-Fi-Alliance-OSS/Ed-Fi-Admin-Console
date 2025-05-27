// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Box, Flex, Tabs 
} from '@chakra-ui/react'
import {
  ReactNode, useState, useEffect 
} from 'react'

interface AdminConsoleTabsMenuProps {
    tabsList: string[]
    children: ReactNode[]
    actionControl?: ReactNode
    initialIndex?: number
    contentMt?: string 
    includeWrapper?: boolean
}

const AdminConsoleTabsMenu = ({ children, tabsList, initialIndex, contentMt, includeWrapper, actionControl }: AdminConsoleTabsMenuProps) => {
  // Initialize with the tab value at initialIndex or default to first tab
  const [ activeTabIndex, setActiveTabIndex ] = useState<number>(initialIndex ?? 0)
  
  // Update active tab if initialIndex changes
  useEffect(() => {
    if (initialIndex !== undefined) {
      setActiveTabIndex(initialIndex)
    }
  }, [ initialIndex ])
  
  // For Tabs.Root compatibility - use the tab name for values
  const activeTab = tabsList[activeTabIndex]

  return (
    <Tabs.Root 
      defaultValue={tabsList[initialIndex ?? 0]}
      position="relative" 
      value={activeTab}
      variant="plain" 
      w='full'
      onValueChange={(value) => {
        const newIndex = tabsList.indexOf(value)

        if (newIndex >= 0) {
          setActiveTabIndex(newIndex)
        }
      }}
    >
      <Flex
        justifyContent='space-between'
        w='full'
      >
        <Flex w='full'>
          <Flex role="tablist">
            {tabsList.map((tab, idx) => (              <Flex
                key={tab}
                _notFirst={{ marginLeft: '32px' }}
                aria-selected={idx === activeTabIndex}
                borderBottom={idx === activeTabIndex ? '2px solid' : 'none'}
                borderColor="blue.600"
                color={idx === activeTabIndex ? 'blue.600' : 'inherit'}
                cursor="pointer"
                fontFamily='Poppins'
                fontWeight='bold'
                padding='0'
                paddingBottom='5px'
                position="relative"
                role="tab"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation
                  setActiveTabIndex(idx);
                }}
              >
                {tab}
              </Flex>
            ))}
          </Flex>
        </Flex>

        {actionControl}
      </Flex>      {/* Remove or hide the default indicator since we're using direct borders */}
      <Tabs.Indicator>
        <Box 
          display="none" /* Hide the default indicator */
          bg="blue.600"
          borderRadius="1px"
          h="2px"
          mt="5px"
        />
      </Tabs.Indicator>

      {/* Tabs Content */}
      <Flex 
        minW="100%"
        mt={contentMt ?? '45px'}
        p='0'
        role="tabpanel"
        w='100%'
      >
        <Box minW="100%" w="full">
          {includeWrapper === false 
            ? children[activeTabIndex] 
            : <Flex w="full">{children[activeTabIndex]}</Flex>
          }
        </Box>
      </Flex>
    </Tabs.Root>
  )
}

export default AdminConsoleTabsMenu