// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import React from 'react'
import {
  Box, Text, List, 
} from '@chakra-ui/react'

interface ErrorListProps {
  errors: Record<string, string[]>;
}

const ErrorList: React.FC<ErrorListProps> = ({ errors }) => {
  return (
    <Box bg="red.50" borderColor="red.500" borderRadius="md" borderWidth="1px" mt="16px" p="16px">
      <Text color="red.600" fontWeight="bold" mb="8px">
        Validation Errors:
      </Text>
      <List.Root as="ol">
        {Object.entries(errors).map(([ field, messages ]) => (
          <List.Item key={field}>
            <Text fontWeight="bold">{field}:</Text>
            <List.Root>
              {messages.map((message, index) => (
                <List.Item key={index}>{message}</List.Item>
              ))}
            </List.Root>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  )
}

export default ErrorList