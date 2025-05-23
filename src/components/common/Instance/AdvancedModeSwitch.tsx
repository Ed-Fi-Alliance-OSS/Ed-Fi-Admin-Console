// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import { CustomSwitch } from '@edfi/admin-console-shared-sdk'


interface AdvancedModeSwitchProps {
    checked: boolean
}

const AdvancedModeSwitch = ({ checked }: AdvancedModeSwitchProps) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='flex-end'
    >
      <CustomSwitch
        id="advancedMode"
        isChecked={checked}
      />

      <Text 
        fontFamily='Poppins'
        fontSize='2m'
        fontWeight='700'
        ml='15px'
      >
        Advanced Mode
      </Text>
    </Flex>
  )
}

export default AdvancedModeSwitch