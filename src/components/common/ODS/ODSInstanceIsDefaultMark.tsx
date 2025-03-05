// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { CheckCircleIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'

interface ODSInstanceIsDefaultMarkProps {
    isDefault: boolean 
    w?: string 
}

const ODSInstanceIsDefaultMark = ({ isDefault, w }: ODSInstanceIsDefaultMarkProps) => {
  return (
    <Flex
      justifyContent='center'
      w={w? w : 'full'}
    >
      { isDefault && <CheckCircleIcon 
        color='blue.600'
        fontSize='20px'
      /> }
    </Flex>
  )
}

export default ODSInstanceIsDefaultMark