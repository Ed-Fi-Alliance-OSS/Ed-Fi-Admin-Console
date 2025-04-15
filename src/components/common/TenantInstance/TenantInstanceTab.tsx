// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, FormControl,
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

export function TenantInstanceForm() {
  const { errors, handleAllErrors, handleSingleError } = useFormValidationErrors()
  const [ tenantInstanceData, setTenantInstanceData ] = useState<Tenant>()
  const { getTenantById } = useTenantService()
  const [ loading, setLoading ] = useState(false)
  const { successToast } = useEDXToast(1000)
  const TenantId = '1'

  useEffect(() => {
    setLoading(true)
    getTenantById(TenantId).then((tenant) => {
      setLoading(false)
      setTenantInstanceData(tenant)
    })
  }, [])

  function onSave() {
    // console.log('the data is saving')
    // console.log(tenantInstanceData)
    // setLoading(true)
    // updateTenant(TenantId, {
    //   document: { edfiApiDiscoveryUrl: tenantInstanceData.edfiApiDiscoveryUrl ?? '' },
    //   tenantId: TenantId
    // }).then(() => {
    //   setLoading(false)
    //   successToast('Tenant Instance updated successfully')
    // })
  }

  function onInputChange(val) {
  //   if(!isUrl) {
  //     handleSingleError({
  //       field: 'edfiApiDiscoveryUrl',
  //       error: { message: 'Please enter a valid URL' } 
  //     })
  //   }

  //   setTenantInstanceData({ })
  }

  return (
    <Flex
      flexDir="column"
      w="full"
    >
      {loading && <Spinner />}

      <FormControl>
        <CustomFormLabel 
          htmlFor='name' 
          text='Tenant Name'
        />

        <CustomInput 
          readOnly
          error={errors && errors['name'] && errors['name'].message}
          id='name'
          value={tenantInstanceData?.document.name}
          onChange={() => {}}
        />

        <Flex
          flexDir='column'
          mt={4}
        >
          <CustomFormLabel 
            htmlFor='edfiApiDiscoveryUrl'
            text='Ed-Fi Base URL'
          />

          <CustomInput 
            readOnly
            error={errors && errors['edfiApiDiscoveryUrl'] && errors['edfiApiDiscoveryUrl'].message}
            id='edfiApiDiscoveryUrl'
            value={tenantInstanceData?.document.edfiApiDiscoveryUrl}
            onChange={() => {}}
          />
        </Flex>
      </FormControl>
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