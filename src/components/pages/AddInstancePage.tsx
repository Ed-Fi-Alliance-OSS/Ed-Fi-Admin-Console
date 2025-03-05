// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import {
  ODSInstance,
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMockData } from '../../context/mockDataContext'
import routes from '../../core/routes'
import useEDXToast from '../../hooks/common/useEDXToast'
import { usePluginContext } from '../../plugins/BasePlugin'
import BackToLink from '../common/BackToLink'
import AddInstanceForm from '../common/Instance/AddInstanceForm'
import TabContentWrapper from '../common/TabContentWrapper'
import TabHeading from '../common/TabHeading'

const AddInstancePage = () => {
  const mock = useMockData()
  const [ instanceName, setInstanceName ] = useState('')
  const [ instanceType, setInstanceType ] = useState('')
  const [ connectionString, setConnectionString ] = useState('')
  const { successToast } = useEDXToast()
  const nav = useNavigate()
  const { functionalities } = usePluginContext()
  const { config } = useConfig()
  const apiService = functionalities.ApiService?.(config, useApiService)

  const handleSaveChanges = async (instance: ODSInstance) => {
    await apiService?.instances.create({
      name: instance.name,
      instanceType: instance.instanceType,
      connectionString: instance.connectionString ?? ''
    })

    successToast(`Instance created successfully, Instance: ${instanceName}, Type: ${instanceType}, Connection String: ${connectionString}`)

    nav(-1)
  }

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
            <AddInstanceForm
              connectionString={connectionString}
              name={instanceName}
              type={instanceType}
              onSaveChanges={handleSaveChanges} 
            />
          </Flex>
        </TabContentWrapper>
      </Flex>
    </Flex>
  )
}

export default AddInstancePage