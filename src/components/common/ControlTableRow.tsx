// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Table } from '@chakra-ui/react'

interface ControlTableRowProps {
    children: JSX.Element | JSX.Element[]
    removeBorders?: boolean
}

const ControlTableRow = ({ children, removeBorders }: ControlTableRowProps) => {
  return (
    <Table.Row 
      _notLast={{
        borderBottom: removeBorders? '0px' : '2px',
        borderBottomColor: 'gray.200',
        borderBottomStyle: 'solid'
      }}
      borderTop={removeBorders? '0px' : '1px'} 
      borderTopColor='gray.300'
      position='relative'
      w='full'
      bg='white'
      _even={{ bg: 'gray.50' }}
      _hover={{ 
        bg: 'blue.50',
        boxShadow: 'sm',
        transition: 'all 0.2s'
      }}
      transition="all 0.2s"
    >
      {children}
    </Table.Row>
  )
}

export default ControlTableRow