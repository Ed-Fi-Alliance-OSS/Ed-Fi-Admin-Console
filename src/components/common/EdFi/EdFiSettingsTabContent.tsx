import { Flex } from '@chakra-ui/react'
import EdFiSettingsConnectionsTable from './EdFiSettingsConnectionsTable'
import EdFiSettingsTabHeader from './EdFiSettingsTabHeader'
import EdFiSettingsWarningBanner from './EdFiSettingsWarningBanner'

const EdFiSettingsTabContent = () => {
  return (
    <Flex flexDir='column' w='full'>
      <EdFiSettingsTabHeader />
      <EdFiSettingsWarningBanner />
      <Flex mt='16px'w="full">
        <EdFiSettingsConnectionsTable />
      </Flex>
    </Flex>
  )
}

export default EdFiSettingsTabContent