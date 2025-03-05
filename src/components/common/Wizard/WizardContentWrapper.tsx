// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'

interface WizardContentWrapperProps {
    children: JSX.Element | JSX.Element[]
    minH?: string 
}

const WizardContentWrapper = ({ children, minH }: WizardContentWrapperProps) => {
  return (
    <Flex
      bg='white'
      flexDir='column'
      h='auto'
      minH={minH ?? '600px'}
      padding='32px'
      w='full'
    >
      {children}
    </Flex>
  )
}

export default WizardContentWrapper