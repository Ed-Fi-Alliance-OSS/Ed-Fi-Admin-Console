// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import CommonTooltip from '../CommonTooltip'

interface VerifyDomainTableProps {
    headerName: string 
    tooltipMessage: string 
}

const VerifyDomainTableHeader = ({ headerName, tooltipMessage }: VerifyDomainTableProps) => {
  return (
    <Flex alignItems='center'>
      <Text
        fontFamily='Poppins'
        mr='5px'
      >{ headerName }
      </Text>

      <CommonTooltip
        bg="blue.600"
        iconColor="black"
        label={tooltipMessage}
        size='14px'
      />
    </Flex>
  )
}

export default VerifyDomainTableHeader