// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text 
} from '@chakra-ui/react'
import ApplicationAPIEndpointsTabContent from './ApplicationAPIEndpointsTabContent'
import ApplicationAPIFormClientTabContent from './ApplicationAPIFormClientTabContent'
import { EdfiApplicationAuthData } from '../../../core/Edfi/EdfiApplications'
import { ODSInstance } from '../../../core/ODSInstance.types'

interface ApplicationAPIFormSectionProps {
    instance: ODSInstance | null
    applicationClientData: EdfiApplicationAuthData
    mode: 'add' | 'edit'
    isRegeneratingCredentials: boolean 
    onRegenerateCredentials: () => void
}

const ApplicationAPIFormSection = ({ instance, applicationClientData, mode, isRegeneratingCredentials, onRegenerateCredentials }: ApplicationAPIFormSectionProps) => {
  const showTabs = () => {
    if (mode === 'add') {
      if (applicationClientData.key && applicationClientData.secret) {
        return true
      }

      return false
    }

    if (mode === 'edit') {
      return true
    }
  }

  return (
    <Flex
      flexDir='column'
      w='full'
    > 
      {showTabs() && (
        <Flex
          flexDir="column"
          mt={mode === 'edit' ? '16px' : '0'}
          opacity={0}
          animation="fadeIn 0.5s forwards"
          sx={{
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
          }}
        >
          <Flex flexDir="column">
        <Text fontWeight="bold">API Client</Text>

        <ApplicationAPIFormClientTabContent
          clientData={applicationClientData}
          isRegeneratingCredentials={isRegeneratingCredentials}
          mode={mode}
          onRegenerateCredentials={onRegenerateCredentials}
        />

        <Text fontWeight="bold" mt="32px">
          API Endpoints
        </Text>

        <ApplicationAPIEndpointsTabContent instance={instance} />
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default ApplicationAPIFormSection