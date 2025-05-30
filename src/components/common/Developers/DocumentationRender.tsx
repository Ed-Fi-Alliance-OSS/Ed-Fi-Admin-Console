// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { DocumentationOption } from '../../../hooks/useDevelopersDocumentations'

interface DocumentationRenderProps {
    documentationUrl: string | null
    selectedDocumentation: DocumentationOption
}

const DocumentationRender = ({ documentationUrl, selectedDocumentation }: DocumentationRenderProps) => {
  return (
    <>
      {selectedDocumentation !== 'Select Source' && documentationUrl && 
      <Flex 
        css={{
          '&': {
            ml: '0px',
            width: 'full' 
          } 
        }}
        className="special-flex"
      >
        <SwaggerUI url={documentationUrl} />
      </Flex>}
    </>
  )
}

export default DocumentationRender