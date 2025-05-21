// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex,
  Tabs
} from '@chakra-ui/react'
import { useState } from 'react'
import TabContentWrapper from './TabContentWrapper'

interface AdminConsoleTabsMenuProps {
    tabsList: string[]
    children: JSX.Element[]
    actionControl?: JSX.Element
    initialIndex?: number
    contentMt?: string 
    includeWrapper?: boolean
}

const AdminConsoleTabsMenu = ({ children, tabsList, initialIndex, contentMt, includeWrapper, actionControl }: AdminConsoleTabsMenuProps) => {
  const [ index, setIndex ] = useState(initialIndex? initialIndex : 0)

  return (
    <Tabs.Root 
      lazyMount
      index={index}
      position="relative"
      variant="plain" 
      w='full' 
      onChange={(nindex) => setIndex(nindex)}
    >
      <Flex
        justifyContent='space-between'
        w='full'
      >
        <Flex w='full'>
          <Tabs.List>
            {tabsList.map(tab => 
              <Tabs.Tab
                key={tab}
                _notFirst={{ ml: '32px' }}
                _selected={{ color: 'blue.600' }}
                fontFamily='Poppins'
                fontWeight='bold'
                padding='0'
              >
                {tab}
              </Tabs.Tab>
            )}
          </Tabs.List>
        </Flex>

        { actionControl }
      </Flex>

      <Tabs.Indicator
        bg="blue.600"
        borderRadius="1px"
        height="2px"
        mt="5px"
      />

      <Tabs.Content padding='0'>
        {children.map((child, index) => 
          <Tabs.Content
            key={index}
            mt={contentMt? contentMt : '45px'}
            padding='0'
            w='full'
          >
            {includeWrapper === false? 
              child  : 
              <Tabs.Content>
                {child}
              </Tabs.Content> }
          </Tabs.Content>)}
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default AdminConsoleTabsMenu