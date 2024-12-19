import { Td } from '@chakra-ui/react'
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
          <Td
            color='gray.800'
            fontFamily='Poppins'
            fontWeight='400'
            pl='15px'
            w='600px'
          >{connection.connectionName}
          </Td>

          <Td pl='15px'>
            <EdFiConnectionStatus status={selecteItemsStatus(index, isLoadingConnectionStatus)} />
          </Td>

          <Td>
            <EdFiSettingsConnectionsControlBtn
              isDeleting={{
                id: '',
                deleting: false 
              }}
              connectionId={connection.id}
              isDisabled={false}
              onEdit={onShowConnectionModal}
            />
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default EdFiSettingsConnectionTableRows