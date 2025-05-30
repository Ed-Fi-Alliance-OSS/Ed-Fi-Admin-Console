// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import {
  CompleteFormErrorMessage, UserProfile, UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  useContext, useEffect
} from 'react'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useApplicationForm from '../../../hooks/adminActions/edfi/useApplicationForm'
import useTenantInfo from '../../../hooks/useTenantInfo'
import MultiInput from '../../MultiInput'
import ApplicationAPIFormSection from './ApplicationAPIFormSection'
import ApplicationDetailsFormSection from './ApplicationDetailsFormSection'
import EdFiModalForm from './EdFiModalForm'

interface ApplicationFormProps {
    instance: ODSInstance | null

    mode: 'add' | 'edit'
    editApplicationData?: EdfiApplication
    onFinishSave: () => void
}

const ApplicationForm = ({ instance, mode, editApplicationData, onFinishSave }: ApplicationFormProps) => {
  const {
    applicationData,
    vendorOptionsList,
    claimsOptionsList,
    operationalContext,
    applicationAuthData,
    isSaving,
    isRegeneratingCredentials,
    hasTriedSubmit,
    errors,
    onRegenerateCredentials,
    onChangeInput,
    onSelectClaim,
    onSelectVendor,
    onSave,
    transformText,
    setEdorgs,
    edOrgs
  } = useApplicationForm({ 
    instanceId: instance?.id ?? 0,
    instanceWorkerStatus: instance?.status ?? '',
    mode, 
    editApplicationData, 
    onFinishSave 
  })

  const { getCurrentTenant } = useTenantInfo()
  const { userProfile } = useContext(UserProfileContext)

  const getCurrentTenantOrgName = (profile: UserProfile | null) => {
    if (profile) {
      const tenant = getCurrentTenant()

      if (tenant) {
        return tenant.document.name
      }

      return 'Loading...'
    }

    return 'Loading...'
  }

  const showApplicationAPIData = () => applicationAuthData.key && applicationAuthData.secret

  useEffect(() => {
    if(applicationData.educationOrganizationIds && applicationData.educationOrganizationIds.length > 0){
      // Initialize edOrgs with values from applicationData
      setEdorgs(applicationData.educationOrganizationIds as number[])
    }
  }, [ applicationData ])

  // setEdorgs
  function isNumberKey(evt) {
    if(evt.target.value) {
      evt.target.value = evt.target.value.replace(/[^0-9]/g, '')
    }
  }

  const handleSave = () => {
    if (!isSaving && !showApplicationAPIData()) {
      onSave()
    } else if(showApplicationAPIData()) {
      onFinishSave()
    }
  }

  return (
    <EdFiModalForm
      content={<Flex w='full'>
        <Flex
          flexDir='column'
          w='full'
        >
          { Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage /> }

          <ApplicationDetailsFormSection
            applicationData={applicationData}
            claimSetOptions={claimsOptionsList}
            errors={errors}
            mode={mode}
            operationalContext={operationalContext}
            vendorOptions={vendorOptionsList}
            onInputChange={onChangeInput}
            onSelectClaimSet={onSelectClaim}
            onSelectVendor={onSelectVendor}
          />          <Flex
            mt='32px'
            w='full'
          >
            <MultiInput
              disabled={mode === 'edit'}
              filterInput={isNumberKey}
              label='EdOrgs'
              transformText={transformText}
              values={edOrgs}
              onChange={setEdorgs}
            />
          </Flex>

          <Flex
            mt={showApplicationAPIData()? '32px' : '0px'}
            w='full'
          >
            <ApplicationAPIFormSection 
              applicationClientData={applicationAuthData}
              instance={instance}
              isRegeneratingCredentials={isRegeneratingCredentials}
              mode={mode}
              onRegenerateCredentials={() => onRegenerateCredentials(editApplicationData? editApplicationData.id : 0)}
            />
          </Flex>
        </Flex>
      </Flex>}
      actionText={mode === 'add' && showApplicationAPIData() ? 'Close' : 'Save'}
      headerText={mode === 'add'? 'Add Application' : 'Edit Application'}
      isSaving={isSaving}
      onClose={onFinishSave}
      onSave={handleSave}
    />
  )
}

export default ApplicationForm