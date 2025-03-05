// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Text } from '@chakra-ui/react'

interface ODSInstanceEdFiVersionProps {
    version?: string 
}

const ODSInstanceEdFiVersion = ({ version }: ODSInstanceEdFiVersionProps) => {
  return (
    <Text
      fontFamily='Poppins'
      fontWeight='400'
      size='md'
    >
      { version }
    </Text>
  )
}

export default ODSInstanceEdFiVersion