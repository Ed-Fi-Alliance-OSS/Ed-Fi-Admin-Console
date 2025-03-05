// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Td } from '@chakra-ui/react'

interface ManageUsersTableDataProps {
    children: JSX.Element | JSX.Element[]
    width: string 
}

const ManageUsersTableData = ({ children, width }: ManageUsersTableDataProps) => {
  return (
    <Td 
      minW='50px' 
      paddingLeft='16px' 
      paddingRight='16px'
      w={width}
    >
      {children}
    </Td>
  )
}

export default ManageUsersTableData