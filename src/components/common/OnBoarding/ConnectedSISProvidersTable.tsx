import { Text } from '@chakra-ui/react'
import { SISProviderInfo } from '../../../core/sisProviders/SISProviders.types'
import ControlTable from '../ControlTable'
import ConnectedSISProvidersTableRows from './ConnectedSISProvidersTableRows'

const headers = [
  <Text>Source Provider</Text>,
  <Text>Source Type</Text>,
  <Text>Status</Text>
]

interface ConnectedSISProvidersTableProps {
    connectedSISProvidersList: SISProviderInfo[]
}

const ConnectedSISProvidersTable = ({ connectedSISProvidersList }: ConnectedSISProvidersTableProps) => {
  return (
    <ControlTable
      headers={headers}
      itemsCount={connectedSISProvidersList.length}
      loading={false}
      rows={<ConnectedSISProvidersTableRows connectedSISProvidersList={connectedSISProvidersList} />}
      thPadding='auto'
    />
  )
}

export default ConnectedSISProvidersTable