// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import {
  EDXErrorPage, useConfig
} from '@edfi/admin-console-shared-sdk'

interface ErrorPageContainerProps {
    status: '404' | '403' | '500'
}

const ErrorPageContainer = ({ status }: ErrorPageContainerProps) => {
  const { config } = useConfig()
  return (
    <Flex 
      height='100vh'
      overflow='hidden'
      position='relative'
      width='100vw'
    >
      <EDXErrorPage 
        errorStatus={status}
        height="100vh"
        minHeight="100vh"
        minWidth="100vw"
        primaryButtonBackUrl={config.app.basePath || '/'}
        primaryButtonLabel="Back to Home"
        width="100vw"
      />
    </Flex>
  )
}

export default ErrorPageContainer