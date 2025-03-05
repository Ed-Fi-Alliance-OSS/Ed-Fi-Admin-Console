// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  TEEAuthDataContext, UserProfileContext 
} from '@edfi/admin-console-shared-sdk'
import {
  ChangeEvent, useContext, useState 
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { Tenant } from '../../../core/Tenant.types'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import { PostDomainRequest } from '../../../services/AdminActions/Domains/DomainService.request'
import useDomainsService from '../../../services/AdminActions/Domains/DomainsService'
import useTenantService from '../../../services/AdminActions/Tenant/TenantService'
import { UpdateTenantRequest } from '../../../services/AdminActions/Tenant/TenantService.requests'
import useEDXToast from '../../common/useEDXToast'

interface UseAddDomainFormProps {
    districtData: Tenant
    onAfterSave: () => void
}

const useAddDomainForm = ({ districtData, onAfterSave }: UseAddDomainFormProps) => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const { updateTenant } = useTenantService()
  const { userProfile } = useContext(UserProfileContext)
  const [ domainName, setDomainName ] = useState('')
  const adminConfig = useContext(adminConsoleContext)
  const { createDomain } = useDomainsService()
  const [ isSavingChanges, setIsSavingChanges ] = useState(false)
  const [ hasTriedSubmit, setHasTriedSubmit ] = useState(false)
  const { successToast, errorToast } = useEDXToast()
  const [ errors, setErrors ] = useState<FormDataErrors>({})

  const isValidDomainName = (value: string) => {
    const nerrors = { ...errors }

    if (value === '') {
      nerrors['domainName'] = { message: 'Domain should not be empty.' }
    }

    if (domainName.length > 63) {
      nerrors['domainName'] = { message: 'Domain should not have more than 63 characters' }
    }
            
    const regex = new RegExp(/^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/)

    if (regex.test(domainName) == false) {
      nerrors['domainName']  = { message: 'Only alpha-numeric characters allowed when adding a domain' }
    }
        
    setErrors(nerrors)

    if (Object.keys(nerrors).length === 0) {
      return true
    }

    return false
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (hasTriedSubmit) {
      const nerrors = { ...errors }

      if (e.target.value === '') {
        nerrors['domainName'] = { message: 'Domain should not be empty.' }
      }else {
        delete nerrors['domainName']
      }

      setErrors(nerrors)
    }

    setDomainName(e.target.value)
  }

  const onSave = async () => {
    if (edxAppConfig && auth && auth.user && userProfile && adminConfig) {
      console.log('save')
            
      if (isValidDomainName(domainName)) {
        console.log('is valid domain name', isValidDomainName)

        const request: PostDomainRequest = {
          tenantId: userProfile.tenantId,
          domainName,
          domainStatus: 'Unknown'
        }
    
        setIsSavingChanges(true)
    
        const result = await createDomain(adminConfig.actionParams, request)
    
        if (result) {
          successToast('Added Domain')
        } else {
          errorToast('Failed to Add Domain')
        }
    
        setIsSavingChanges(false)
        onAfterSave()
      } else {
        setHasTriedSubmit(true)
      }
    }
  }

  return {
    domainName,
    hasTriedSubmit,
    errors,
    isSavingChanges,
    onInputChange,
    onSave
  }
}

export default useAddDomainForm