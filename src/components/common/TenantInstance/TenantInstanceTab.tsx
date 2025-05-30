// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Field,
  Spinner
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomInput,
  Tenant
} from '@edfi/admin-console-shared-sdk'
import {
  useEffect, useState
} from 'react'
import useEDXToast from '../../../hooks/common/useEDXToast'
import useFormValidationErrors from '../../../hooks/validations/useFormValidationErrors'
import useTenantService from '../../../services/AdminActions/Tenant/TenantService'
import useTenantInfo from '../../../hooks/useTenantInfo'

export function TenantInstanceForm() {
  const { errors, handleAllErrors, handleSingleError } = useFormValidationErrors()
  const [ tenantInstanceData, setTenantInstanceData ] = useState<Tenant>()
  const { getTenantById } = useTenantService()
  const [ loading, setLoading ] = useState(false)
  const { successToast, errorToast } = useEDXToast(1000)
  const { getCurrentTenant } = useTenantInfo()
  const tenantId = getCurrentTenant()?.tenantId?.toString() ?? '1' //it defaults to `'1'` as the fallback value since tenants start at 1 by default.
  
  useEffect(() => {
    setLoading(true)
    getTenantById(tenantId)
      .then((tenant) => {
        setLoading(false)
        setTenantInstanceData(tenant)
      })
      .catch((error) => {
        setLoading(false)
        errorToast(`Error fetching tenant data: ${error.message}`)
      })
  }, [ tenantId ])

  return (
    
    <Flex
      flexDir="column"
      w="full"
    >
      {loading && <Spinner />}      <Field.Root>
        <CustomFormLabel
          htmlFor='name'
          text='Tenant Name'
        />

        <Flex width="400px">  
          <CustomInput
            readOnly
            error={errors && errors['name'] && errors['name'].message}
            id='name'
            value={tenantInstanceData?.document.name || ''}
            onChange={() => { }}
          />
        </Flex>

        <Flex
          flexDir='column'
          mt={4}
        >
          <CustomFormLabel
            htmlFor='edfiApiDiscoveryUrl'
            text='Ed-Fi Base URL'
          />

          <Flex width="400px">
            <CustomInput
              readOnly
              error={errors && errors['edfiApiDiscoveryUrl'] && errors['edfiApiDiscoveryUrl'].message}
              id='edfiApiDiscoveryUrl'
              value={tenantInstanceData?.document.edfiApiDiscoveryUrl || ''}
              onChange={() => { }}
            />
          </Flex>
        </Flex>
      </Field.Root>
    </Flex>
  )
}

export function TenantInstanceTab() {
  const [ isSaving, setIsSaving ] = useState(false)

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <TenantInstanceForm />
    </Flex>
  )
}

export default TenantInstanceTab