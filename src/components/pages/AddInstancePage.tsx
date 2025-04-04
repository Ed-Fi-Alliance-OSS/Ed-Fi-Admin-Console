// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../../core/routes'
import useEDXToast from '../../hooks/common/useEDXToast'
import { usePluginContext } from '../../plugins/BasePlugin'
import BackToLink from '../common/BackToLink'
import AddInstanceForm from '../common/Instance/AddInstanceForm'
import TabContentWrapper from '../common/TabContentWrapper'
import TabHeading from '../common/TabHeading'
import AddInstanceFormV2, { AddInstanceFormProps } from '../common/Instance/AddInstanceFormV2'
import { CreateOdsInstanceRequest } from '../../services/ODSInstances/CreateODSInstanceService.request'
import ErrorList from '../common/ErrorList'
import useTenantInfo from '../../hooks/useTenantInfo'

const AddInstancePage = () => {
  const [ instanceName ] = useState('')
  const [ instanceType ] = useState('')
  const [ connectionString ] = useState('')
  const [errorMessages, setErrorMessages] = useState<Record<string, string[]> | null>(null);
  const { successToast } = useEDXToast()
  const nav = useNavigate()
  const { functionalities } = usePluginContext()
  const { config } = useConfig()
  const apiService = functionalities.ApiService?.(config, useApiService)
  const { getCurrentTenant } = useTenantInfo()
  const useNewInstanceForm = config?.app.useNewCreateInstanceForm ?? true; 
  const handleSaveChanges = async (data: AddInstanceFormProps) => {
    const instance: CreateOdsInstanceRequest = {
      name: data.name,
      instanceType: data.instanceType,
      odsInstanceContexts: data.odsInstanceContexts,
      odsInstanceDerivatives: data.odsInstanceDerivatives,
      tenantId: getCurrentTenant()?.tenantId || -1,
      tenantName: getCurrentTenant()?.document.name || '',
    };
    try {
      const currentTenant = getCurrentTenant();
      if (currentTenant) {
        // Create the instance using the API service
        await apiService?.instances.create({
          tenantId: currentTenant.tenantId,
          tenantName: currentTenant.document.name,
          name: instance.name,
          instanceType: instance.instanceType,
          odsInstanceContexts: instance.odsInstanceContexts,
          odsInstanceDerivatives: instance.odsInstanceDerivatives,
        });
        successToast(`Instance created successfully, Instance: ${instance.name}, Type: ${instance.instanceType}, Connection String: ${instance.tenantName}`)
        setErrorMessages(null);
        nav(-1);
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrorMessages(error.response.data.errors);
      } else {
        setErrorMessages({
          General: ["An unexpected error occurred. Please try again."],
        });
      }
    }
  };

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <BackToLink
        text='Back to Tech Console Home'
        url={routes.home.url}
      />

      <Flex
        mt='16px'
        w='full'
      >
        <TabContentWrapper>
          <Flex w='150px'>
            <TabHeading text="Create Instance" />
          </Flex>

          <Flex
            maxW='1000px'
            mt='16px'
            mx='auto'
            w='full'
            flexDir='column'
          >
            <Flex w='full' justifyContent='space-between'>
              <Flex flex='1.5' mr='8px'>
              { useNewInstanceForm ? (
                <AddInstanceFormV2
                  name=""
                  instanceType=""
                  odsInstanceContexts={[]}
                  odsInstanceDerivatives={[]}
                  onSaveChanges={handleSaveChanges}
                />
              ) : (
                <AddInstanceForm
              connectionString={connectionString}
              name={instanceName}
              type={instanceType}
              onSaveChanges={handleSaveChanges} 
            />
              ) }
              </Flex>
              <Flex flex='0.6' ml='8px'>
                {errorMessages ? <ErrorList errors={errorMessages} /> : <></>}
              </Flex>
            </Flex>
          </Flex>
        </TabContentWrapper>
      </Flex>
    </Flex>
  )
}

export default AddInstancePage