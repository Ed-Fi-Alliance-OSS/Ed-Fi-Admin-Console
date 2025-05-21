// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/system'

const ContentBlocker = () => {
  const mode = useColorMode()

  return (
    <Flex  
      bg={mode.colorMode === 'light'? '#f6f9fb' : 'blue.800'}
      h='100%' 
      opacity='0.5' 
      position='absolute' 
      w='100%' 
      zIndex='2'
    />
  )
}

export default ContentBlocker