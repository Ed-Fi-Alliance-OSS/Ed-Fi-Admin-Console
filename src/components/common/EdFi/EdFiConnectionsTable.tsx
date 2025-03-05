// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ControlTable from '../ControlTable'

interface EdFiConnectionsTableProps {
    headers: JSX.Element[]
    rows: JSX.Element
    itemsCount: number
    loading: boolean 
    pagination: JSX.Element
}

const EdFiConnectionsTable = ({ headers, itemsCount, rows, loading, pagination }: EdFiConnectionsTableProps) => {
  return (
    <ControlTable 
      headers={headers}
      itemsCount={itemsCount}
      loading={loading}
      pagination={pagination}
      rows={rows}
      thPadding="16px"
    />
  )
}

export default EdFiConnectionsTable