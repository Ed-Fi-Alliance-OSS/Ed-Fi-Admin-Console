// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Badge
} from '@chakra-ui/react'
import { EdFiMetadata } from '../../../hooks/useEdfiUrls.types'

interface ODSInstanceTSDSVersionProps {
  dataModels?: EdFiMetadata['dataModels']
}

const ODSInstanceDataModelsLabel = ({ dataModels }: ODSInstanceTSDSVersionProps) => {
  return dataModels?.map((model, i) => <Flex key={JSON.stringify(model) + i}>
    <Badge
      colorScheme='blue'
      mb={1}
      mr={1}
      size='md'
    >
      {model.name} ({model.version})
    </Badge>

    <br />
  </Flex>)
}

export default ODSInstanceDataModelsLabel