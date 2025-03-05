// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Heading } from '@chakra-ui/react'

interface TabHeadingProps {
    text: string
}

const TabHeading = ({ text }: TabHeadingProps) => {
  return (
    <Heading
      fontFamily='Poppins'
      fontSize='32px'
      fontWeight='700'
      lineHeight='42px'
    >
      {text}
    </Heading>
  )
}

export default TabHeading