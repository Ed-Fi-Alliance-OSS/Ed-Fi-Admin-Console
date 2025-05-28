// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Table, TableCellProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ControlTableCellProps extends TableCellProps {
    children: ReactNode
}

const ControlTableCell = ({ children, ...rest }: ControlTableCellProps) => {
  return (
    <Table.Cell
      py="3"
      px="4"
      borderRight="1px"
      borderRightColor="gray.200"
      _last={{ borderRight: 'none' }}
      {...rest}
    >
      {children}
    </Table.Cell>
  )
}

export default ControlTableCell
