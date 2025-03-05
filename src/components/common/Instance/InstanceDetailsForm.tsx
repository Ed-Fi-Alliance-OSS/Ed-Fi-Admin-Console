// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, FormControl
} from '@chakra-ui/react'
import {
  CustomFormHeader, CustomFormLabel, CustomInput, CustomSelect, UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import { usePluginContext } from '../../../plugins/BasePlugin'

interface InstanceDetailsFormProps {
    mode: 'edit' | 'add'
    instance?: ODSInstance
}

const getInstanceName = (tenants: any[], currentTenantId: string) => {
  const tenant = tenants.find(tenant => tenant.tenantId === currentTenantId)

  if (tenant) {
    return tenant.organizationName
  }

  return 'Instance'
}

const { getString } = usePluginContext()

const InstanceDetailsForm = ({ mode, instance }: InstanceDetailsFormProps) => {
  const { userProfile } = useContext(UserProfileContext)

  return (
    <Flex
      flexDir='column'
      maxW='750px'
      w='full'
    >
      <CustomFormHeader text="Instance Details" />

      <Flex
        flexDir='column'
        paddingLeft='16px'
        w='full'
      >
        <FormControl mt='16px'>
          <CustomFormLabel 
            htmlFor="instanceName" 
            text="Instance Name"
          />

          <CustomInput
            disabled={true}
            id='instanceName'
            value={instance?.name ?? ''}
            onChange={() => null}
          />
        </FormControl>

        <FormControl mt='16px'>
          <CustomFormLabel 
            htmlFor="instanceDescription" 
            text="Description"
          />

          <CustomInput
            disabled={true}
            id='instanceDescription'
            value=''
            onChange={() => null}
          />
        </FormControl>
      </Flex>

      <Flex
        mt='52px'
        w='full'
      >
        <CustomFormHeader text={getString('app.ODS_INSTANCES')} />
      </Flex>

      <Flex paddingLeft='16px'>
        <FormControl mt='16px'>
          <CustomFormLabel 
            htmlFor="schoolYear" 
            text="School Year"
          />

          <CustomSelect 
            options={[
              {
                value: '2023',
                text: '2023' 
              }
            ]}
            disabled={true}
            value='2023'
            onChange={() => null}
          />
        </FormControl>
      </Flex>

      <Button 
        disabled={true}
        mt='33px'
        size='lg'
        variant='primaryBlue600'
        w={mode === 'add'? '242px' : '189px'}
      >
        {mode === 'add'? 'Create Instance' : 'Save Edits'}
      </Button>
    </Flex>
  )
}

export default InstanceDetailsForm