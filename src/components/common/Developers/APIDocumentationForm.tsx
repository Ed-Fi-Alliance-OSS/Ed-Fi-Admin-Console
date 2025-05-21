// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Field 
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import {
  CustomFormLabel, CustomSelect 
} from '@edfi/admin-console-shared-sdk'

interface APIDocumentationFormProps {
    documentationOptions: string[]
    selectedDocumentation: string
    onSelectDocumentation: (e: ChangeEvent<HTMLSelectElement>) => void
}

const APIDocumentationForm = ({ selectedDocumentation, documentationOptions, onSelectDocumentation }: APIDocumentationFormProps) => {
  return (
    <Flex
      flexDir='column'
      w='733px'
    >
      <Field.Root>
        <CustomFormLabel 
          htmlFor="apiClient"
          text="Select Documentation to Load"
        />

        <CustomSelect
          options={documentationOptions.map(option => ({
            value: option,
            text: option 
          }))}
          value={selectedDocumentation}
          onChange={onSelectDocumentation}
        />
      </Field.Root>
    </Flex>
  )
}

export default APIDocumentationForm