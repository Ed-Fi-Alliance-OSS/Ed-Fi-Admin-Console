import {
  Flex, Tag
} from '@chakra-ui/react'
import { EdFiMetadata } from '../../../hooks/useEdfiUrls.types'

interface ODSInstanceTSDSVersionProps {
  dataModels?: EdFiMetadata['dataModels']
}

const ODSInstanceDataModelsLabel = ({ dataModels }: ODSInstanceTSDSVersionProps) => {
  return dataModels?.map((model, i) => <Flex key={JSON.stringify(model) + i}>
    <Tag
      colorScheme='blue'
      mb={1}
      mr={1}
      size='md'
    >
      {model.name} ({model.version})
    </Tag>

    <br />
  </Flex>)
}

export default ODSInstanceDataModelsLabel