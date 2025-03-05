// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Td, Text 
} from '@chakra-ui/react'
import ControlTableRow from '../ControlTableRow'

interface APIClientsTableRowsProps {
    apiClientList: string[]
}

const APIClientsTableRows = ({ apiClientList }: APIClientsTableRowsProps) => {
  return (
    <>
      {apiClientList.map((client, index) => 
        <ControlTableRow key={index}>
          <Td w='917px'>
            {client}
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default APIClientsTableRows