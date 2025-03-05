// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'

interface OnBoardingTabContentWrapperProps {
    children: JSX.Element | JSX.Element[]
}

const OnBoardingTabContentWrapper = ({ children }: OnBoardingTabContentWrapperProps) => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      {children}
    </Flex>
  )
}

export default OnBoardingTabContentWrapper