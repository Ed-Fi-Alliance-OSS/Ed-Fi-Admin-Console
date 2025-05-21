// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Badge
} from '@chakra-ui/react'
import { EdFiMetadata } from '../useEdfiUrls.types'

const useOdsVersions = () => {
  const getEdFiVersionFromMetadata = (metadata: EdFiMetadata| null) => {
    if (!metadata) {
      return '-'
    }

    return <Badge
      colorScheme='blue'
      size='lg'
    >Suite {metadata.suite} v{metadata.version}
    </Badge>
  }

  const getTSDSVersionFromMetadata = (metadata: EdFiMetadata | null): React.JSX.Element | string => {
    if (!metadata) {
      return <Badge
        colorScheme='blue'
        fontFamily='Poppins'
        size='lg'
      >Core
      </Badge>
    }

    if (!metadata.dataModels) {
      return <Badge
        colorScheme='blue'
        fontFamily='Poppins'
        size='lg'
      >Core
      </Badge>
    }

    return <Flex gridGap={1}>{metadata.dataModels.map(dataModel => {
      return <Badge
        key={dataModel.name}
        colorScheme='blue'
        fontFamily='Poppins'
        size='lg'
      >{dataModel.name} ({dataModel.version})
      </Badge>
    })}
    </Flex>
  }

  return {
    getEdFiVersionFromMetadata,
    getTSDSVersionFromMetadata
  }
}

export default useOdsVersions