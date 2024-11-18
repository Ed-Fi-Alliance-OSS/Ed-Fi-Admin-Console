import { Tag } from '@chakra-ui/react'
import { EdFiMetadata } from '../../../hooks/useEdfiUrls.types'

interface ODSInstanceTSDSVersionProps {
  dataModels: EdFiMetadata['dataModels']
}

const ODSInstanceDataModelsLabel = ({ dataModels }: ODSInstanceTSDSVersionProps) => {
  return dataModels.map(model => <>
    <Tag
      mb={1}
      colorScheme='blue'
      mr={1}
      size='md'>
      {model.name} ({model.version})
    </Tag>
    <br/>
  </>)
}

export default ODSInstanceDataModelsLabel