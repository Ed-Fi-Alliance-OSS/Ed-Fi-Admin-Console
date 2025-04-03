// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import {
  ODSInstance,
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMockData } from '../../context/mockDataContext'
import routes from '../../core/routes'
import useEDXToast from '../../hooks/common/useEDXToast'
import { usePluginContext } from '../../plugins/BasePlugin'
import BackToLink from '../common/BackToLink'
import AddInstanceForm from '../common/Instance/AddInstanceForm'
import TabContentWrapper from '../common/TabContentWrapper'
import TabHeading from '../common/TabHeading'
import AddInstanceFormV2 from '../common/Instance/AddInstanceFormV2'
import { CreateOdsInstanceRequest } from '../../services/ODSInstances/CreateODSInstanceService.request'
import ErrorList from '../common/ErrorList'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import useTenantInfo from '../../hooks/useTenantInfo'

const AddInstancePage = () => {
  const mock = useMockData()
  const [errorMessages, setErrorMessages] = useState<Record<string, string[]> | null>(null); 
  const [ instanceName, setInstanceName ] = useState('')
  const [ instanceType, setInstanceType ] = useState('')
  const [ odsInstanceContexts, setOdsInstanceContexts ] = useState([] as ODSInstance[])
  const [ odsInstanceDerivatives, setOdsInstanceDerivatives ] = useState([] as ODSInstance[])
  const { successToast } = useEDXToast()
  const nav = useNavigate()
  const { functionalities } = usePluginContext()
  const { config } = useConfig()
  const apiService = functionalities.ApiService?.(config, useApiService)
  const { getCurrentTenant } = useTenantInfo()
  
  const handleSaveChanges = async (instance: CreateOdsInstanceRequest) => {
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
          <Flex w='200px'>
            <TabHeading text="Create Instance" />
          </Flex>

          <Flex
            maxW='800px'
            mt='16px'
            mx='auto'
            w='full'
          >
            <AddInstanceFormV2 
              name=""
              instanceType=""
              odsInstanceContexts={[]}
              odsInstanceDerivatives={[]}
              onSaveChanges={handleSaveChanges}
            />
          </Flex>

          {errorMessages ? <ErrorList errors={errorMessages} /> : <></>}
        </TabContentWrapper>
      </Flex>
    </Flex>
  )
}

export default AddInstancePage