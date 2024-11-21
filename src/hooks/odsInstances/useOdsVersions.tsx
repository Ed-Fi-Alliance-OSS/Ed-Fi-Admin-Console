import {
  Flex, Tag
} from '@chakra-ui/react'
import { EdFiMetadata } from '../useEdfiUrls.types'

const useOdsVersions = () => {
  const getEdFiVersionFromMetadata = (metadata: EdFiMetadata| null) => {
    if (!metadata) {
      return '-'
    }

    return <Tag
      colorScheme='blue'
      size='lg'
    >Suite {metadata.suite} v{metadata.version}
    </Tag>
  }

  const getTSDSVersionFromMetadata = (metadata: EdFiMetadata | null): React.JSX.Element | string => {
    if (!metadata) {
      return <Tag
        colorScheme='blue'
        fontFamily='Open Sans'
        size='lg'
      >Core
      </Tag>
    }

    if (!metadata.dataModels) {
      return <Tag
        colorScheme='blue'
        fontFamily='Open Sans'
        size='lg'
      >Core
      </Tag>
    }

    return <Flex gridGap={1}>{metadata.dataModels.map(dataModel => {
      return <Tag
        key={dataModel.name}
        colorScheme='blue'
        fontFamily='Open Sans'
        size='lg'
      >{dataModel.name} ({dataModel.version})
      </Tag>
    })}
    </Flex>
  }

  return {
    getEdFiVersionFromMetadata,
    getTSDSVersionFromMetadata
  }
}

export default useOdsVersions