// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Table } from '@chakra-ui/react'
import { EdFiAdminConnection } from '../../../core/EdFiAdmin/EdFiAdmin.types'
import { EdFiSettingsConnectionsTableItem } from '../../../hooks/adminActions/externalods/useEdFiSettingsConnectionsTable.types'
import ControlTableRow from '../ControlTableRow'
import EdFiConnectionStatus from './EdFiConnectionStatus'
import EdFiSettingsConnectionsControlBtn from './EdFiSettingsConnectionsControlBtn'

interface EdFiSettingsConnectionTableRowsProps {
    connections: EdFiAdminConnection[]
    connectionStatusList: EdFiSettingsConnectionsTableItem[]
    isLoadingConnectionStatus: boolean 
    onShowConnectionModal: (connectionId?: string | undefined) => void
}

const EdFiSettingsConnectionTableRows = ({ connections, connectionStatusList, isLoadingConnectionStatus, onShowConnectionModal }: EdFiSettingsConnectionTableRowsProps) => {
  const selecteItemsStatus = (index: number, loading: boolean) => {
    if (loading) {
      return 'Loading'
    }

    if (connectionStatusList.length > 0 && !loading) {
      return connectionStatusList[index].status
    }

    return 'Unknown'
  }   

  return (
    <>
      {connections.map((connection, index) => 
        <ControlTableRow key={index}>
          <Table.Cell
            color='gray.800'
            fontFamily='Poppins'
            fontWeight='400'
            pl='15px'
            w='600px'
          >{connection.connectionName}
          </Table.Cell>

          <Table.Cell pl='15px'>
            <EdFiConnectionStatus status={selecteItemsStatus(index, isLoadingConnectionStatus)} />
          </Table.Cell>

          <Table.Cell>
            <EdFiSettingsConnectionsControlBtn
              isDeleting={{
                id: '',
                deleting: false 
              }}
              connectionId={connection.id}
              isDisabled={false}
              onEdit={onShowConnectionModal}
            />
          </Table.Cell>
        </ControlTableRow>)}
    </>
  )
}

export default EdFiSettingsConnectionTableRows