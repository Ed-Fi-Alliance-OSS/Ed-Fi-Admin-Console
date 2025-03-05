// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'

interface TabContentWrapperProps {
    children: JSX.Element[] | JSX.Element
}

const TabContentWrapper = ({ children }: TabContentWrapperProps) => {
  return (
    <Flex 
      bg='white'
      borderRadius='4px'
      padding='38px 45px'
      w='full'
    >
      {children}
    </Flex>
  )
}

export default TabContentWrapper