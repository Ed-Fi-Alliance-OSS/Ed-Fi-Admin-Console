// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Box, Flex, Tabs } from '@chakra-ui/react'
import { useState } from 'react'

interface AdminConsoleTabsMenuProps {
    tabsList: string[]
    children: JSX.Element[]
    actionControl?: JSX.Element
    initialIndex?: number
    contentMt?: string 
    includeWrapper?: boolean
}

const AdminConsoleTabsMenu = ({ children, tabsList, initialIndex, contentMt, includeWrapper, actionControl }: AdminConsoleTabsMenuProps) => {
  const [index, setIndex] = useState(initialIndex ?? 0)

  return (
    <Box position="relative" w="full">
      <Tabs.Root 
        defaultIndex={index}
        variant="plain" 
        w='full' 
        onChange={(newIndex) => setIndex(newIndex)}
      >
        <Flex
          justifyContent='space-between'
          w='full'
        >
          <Flex w='full'>
            <Tabs.List>
              {tabsList.map((tab) => (
                <Tabs.Trigger>
                  <Flex key={tab}
                  _notFirst={{ marginLeft: '32px' }}
                  _selected={{ color: 'blue.600' }}
                  fontFamily='Poppins'
                  fontWeight='bold'
                  padding='0'>
                  {tab}
                  </Flex>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Flex>

          {actionControl}
        </Flex>

        <Tabs.Indicator>
          <Box style={{
            backgroundColor: "var(--chakra-colors-blue-600)",
            borderRadius: "1px",
            height: "2px",
            marginTop: "5px"
          }}/>
        </Tabs.Indicator>

        <Tabs.Content>
          {children.map((child, idx) => (
            <Tabs.Content>
              <Flex key={idx} style={{
                marginTop: contentMt ?? '45px',
                padding: '0',
                width: '100%'
              }}>
              {includeWrapper === false ? 
                child : 
                <Flex>
                  {child}
                </Flex>
              }
              </Flex>
            </Tabs.Content>
          ))}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}


export default AdminConsoleTabsMenu