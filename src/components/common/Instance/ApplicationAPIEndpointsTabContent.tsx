// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Field
} from '@chakra-ui/react'
import {
  CopyTextBtn,
  CustomFormLabel,
  CustomInput
} from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { useTenantContext } from '../../../context/tenantContext'
import { ODSInstance } from '../../../core/ODSInstance.types'

interface ApplicationAPIEndpointsTabContentProps {
    instance: ODSInstance | null
}

const ApplicationAPIEndpointsTabContent = ({ instance }: ApplicationAPIEndpointsTabContentProps) => {
  // const { edfiInfo } = useEdfiUrls()
  const { edfiMetadata, selectedTenant } = useTenantContext()
  const adminConfig = useContext(adminConsoleContext)

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Field.Root>
        <CustomFormLabel 
          htmlFor="baseUrl" 
          text="Base URL"
        />

        <Flex w='full'>
          <CustomInput
            id="baseUrl"
            value={selectedTenant?.document.edfiApiDiscoveryUrl ? selectedTenant?.document.edfiApiDiscoveryUrl : ''}
            onChange={() => null}
          />

          <Flex ml='8px'>
            <CopyTextBtn value={selectedTenant?.document.edfiApiDiscoveryUrl ? selectedTenant?.document.edfiApiDiscoveryUrl : ''} />
          </Flex>
        </Flex>
      </Field.Root>

      <Field.Root mt={4}>
        <CustomFormLabel 
          htmlFor="dataManagementApi" 
          text="Resources URL"
        />

        <Flex w='full'>
          <CustomInput
            id="dataManagementApi"
            value={edfiMetadata?.urls ? edfiMetadata.urls.dataManagementApi : ''}
            onChange={() => null}
          />

          <Flex ml='8px'>
            <CopyTextBtn value={edfiMetadata?.urls ? edfiMetadata.urls.dataManagementApi : ''} />
          </Flex>
        </Flex>
      </Field.Root>

      <Field.Root mt={4}>
        <CustomFormLabel 
          htmlFor="authenticationUrl" 
          text="Authorization URL"
        />

        <Flex w='full'>
          <CustomInput
            id="authenticationUrl"
            value={edfiMetadata?.urls? edfiMetadata.urls.oauth : ''}
            onChange={() => null}
          />

          <Flex ml='8px'>
            <CopyTextBtn value={edfiMetadata?.urls? edfiMetadata.urls.oauth : ''} />
          </Flex>
        </Flex>
      </Field.Root>

      <Flex
        bg='gray.300'
        h='1px'
        mt='16px'
        w='full'
      />

    </Flex>
  )
}

export default ApplicationAPIEndpointsTabContent