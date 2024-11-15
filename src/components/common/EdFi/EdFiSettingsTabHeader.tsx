import { Flex } from '@chakra-ui/react'
import TabHeading from '../TabHeading'

const EdFiSettingsTabHeader = () => {
  return (
    <Flex flexDir='column' justifyContent='space-between' w='20%'>
      <TabHeading text='Applications' />
    </Flex>
  )
}

export default EdFiSettingsTabHeader