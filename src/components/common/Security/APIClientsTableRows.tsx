// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Table, Text 
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
          <Table.Cell w='917px'>
            {client}
          </Table.Cell>
        </ControlTableRow>)}
    </>
  )
}

export default APIClientsTableRows