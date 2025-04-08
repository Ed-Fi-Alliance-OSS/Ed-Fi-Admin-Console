// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  TEEAuthDataContext,
  Tenant,
  useApiService,
  useConfig,
  UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  isNaN, isNumber
} from 'lodash-es'
import {
  ChangeEvent,
  useContext,
  useEffect,
  useState
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import {
  EdfiApplication, EdfiApplicationAuthData
} from '../../../core/Edfi/EdfiApplications'
import { EdfiClaimSet } from '../../../core/Edfi/EdfiClaimsets'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import { usePluginContext } from '../../../plugins/BasePlugin'
import {
  CreateEdfiApplicationRequest, ResetEdfiApplicationCredentialsRequest, UpdateEdfiApplicationRequest
} from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests'
import useEDXToast from '../../common/useEDXToast'
import useTenantInfo from '../../useTenantInfo'
import { initialApplicationData } from './initialApplicationData'
import useApplicationFormValidation from './useApplicationFormValidation'

type UseApplicationFormMode = 'add' | 'edit'

interface UseApplicationFormProps {
  instanceId: number,
  instanceWorkerStatus: string,
  mode: UseApplicationFormMode
  editApplicationData?: EdfiApplication
  onFinishSave: () => void
}

const selectInitialFormData = (mode: UseApplicationFormMode, selectedTenant?: Tenant, editApplicationData?: EdfiApplication) => {
  if (mode === 'edit' && editApplicationData) {
    console.log('edit application data', editApplicationData)

    const educationorgIds: number[] = editApplicationData.educationOrganizationIds ?? []

    const initialData: UpdateEdfiApplicationRequest = {
      applicationName: editApplicationData.applicationName ?? '',
      vendorId: editApplicationData.vendorId ?? 0,
      claimSetName: editApplicationData.claimSetName ?? '',
      educationOrganizationIds: educationorgIds
    }

    console.log('initial data for edit', initialData)

    return initialData
  }

  const initialData: CreateEdfiApplicationRequest = {
    applicationName: initialApplicationData.applicationName,
    vendorId: initialApplicationData.vendorId,
    claimSetName: initialApplicationData.claimSetName,
    educationOrganizationIds: []
  }

  // if (selectedTenant) {
  //   const currentOrgId = selectedTenant.tenantId

  //   if (currentOrgId) {
  //     initialData.educationOrganizationIds.push(currentOrgId)
  //   }
  // }

  return initialData
}

const useApplicationForm = ({ mode, onFinishSave, editApplicationData, instanceId, instanceWorkerStatus }: UseApplicationFormProps) => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const { userProfile } = useContext(UserProfileContext)
  const adminConfig = useContext(adminConsoleContext)
  const { getCurrentTenant } = useTenantInfo()
  const [ applicationData, setApplicationData ] = useState<CreateEdfiApplicationRequest | UpdateEdfiApplicationRequest>(() => selectInitialFormData(mode, getCurrentTenant(), editApplicationData))
  const [ selectedApplicationId, setSelectedApplicationId ] = useState<number>(editApplicationData ? editApplicationData.id : 0)
  const [ vendorOptionsList, setVendorOptionsList ] = useState<EdfiVendor[]>([])
  const [ claimsOptionsList, setClaimsOptionsList ] = useState<EdfiClaimSet[]>([])
  const [ operationalContext, setOperationalContext ] = useState<string>('')
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const api = functionalities.ApiService?.(config, useApiService)

  const [ applicationAuthData, setApplicationAuthData ] = useState<EdfiApplicationAuthData>({
    id: editApplicationData ? editApplicationData.id : 0,
    secret: mode === 'edit' ? 'applicationSecret' : '',
    key: mode === 'edit' ? 'applicationKey' : ''
  })

  const [ isSaving, setIsSaving ] = useState(false)
  const [ hasTriedSubmit, setHasTriedSubmit ] = useState(false)
  const { errorToast, successToast } = useEDXToast()
  const { errors, validApplicationData, validateField } = useApplicationFormValidation()
  const [ selectedOrgId, setSelectedOrgId ] = useState(false)
  const [ isRegeneratingCredentials, setIsRegeneratingCredentials ] = useState(false)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const napplicationData = { ...applicationData }

    if (e.target.id === 'operationalContextURI') {
      setOperationalContext(e.target.value)
    }

    if (e.target.id === 'applicationName') {
      napplicationData.applicationName = e.target.value

      if (hasTriedSubmit) {
        validateField('applicationName', napplicationData)
      }

      setApplicationData(napplicationData)
    }
  }

  // console.log("user profile", userProfile)
  // console.log('application data', applicationData)
  const [ edOrgs, setEdorgs ] = useState<number[]>([])

  function transformText(text: string): number {
    const data = parseInt(text?.toString().toUpperCase().replace(/[^\d]/g, '') ?? 0)
    return (isNumber(data) && !isNaN(data)) ? data : 0
  }

  const onSelectVendor = (vendorId: number) => {
    console.log('onSelected vendor id', vendorId)
    const napplicationData = { ...applicationData }

    napplicationData.vendorId = vendorId

    if (hasTriedSubmit) {
      validateField('vendor', napplicationData)
    }

    setApplicationData(napplicationData)
  }

  const onSelectClaim = (claimName: string) => {
    const napplicationData = { ...applicationData }

    napplicationData.claimSetName = claimName

    if (hasTriedSubmit) {
      validateField('claimset', napplicationData)
    }

    setApplicationData(napplicationData)
  }

  const onRegenerateCredentials = async (applicationId: number) => {
    if (edxAppConfig && auth && auth.user && adminConfig) {
      const requestData: ResetEdfiApplicationCredentialsRequest = { applicationId: applicationId.toString() }

      console.log('request data credentials', requestData)
      setIsRegeneratingCredentials(true)
      try {
        const data = await api?.applications.resetPassword(applicationId.toString())

        if (data) {
          setApplicationAuthData(data)
        }
      } catch (e) {
        console.log('error', e)
        errorToast('Failed to regenerate application credentials.')
      } finally {
        setIsRegeneratingCredentials(false)
      }

      return



    }

    return null
  }

  const onSave = async () => {
    if (edxAppConfig && auth && auth.user && adminConfig) {
      console.log('data to send', applicationData)

      setIsSaving(true)
      
      if (mode === 'add') {
        if (validApplicationData(applicationData)) {
          try {
            
            if(instanceWorkerStatus != 'Completed'){
              setIsSaving(false);
              errorToast('Instance status requires to be completed before creating new applications.');
              return;
            }

            const result = await api?.applications.create({
              applicationName: applicationData.applicationName,
              vendorId: applicationData.vendorId,
              claimSetName: applicationData.claimSetName,
              educationOrganizationIds: edOrgs,
              odsInstanceIds: [ instanceId ]
            })

            console.log('result create application', result)

            if (result) {
              setApplicationAuthData(result)
              successToast('Added Application.')
            } else {
              errorToast('Failed to Add Application.')
            }
          } catch (e) {
            console.log('error', e)
            errorToast('Failed to add application.')
          }
        } else {
          setHasTriedSubmit(true)
        }
      } else {
        console.log('edit', validApplicationData(applicationData))

        if (validApplicationData(applicationData)) {
          console.log('valid application data edit')

          const currentTenant = getCurrentTenant()
          const educationOrganizationIds: number[] = [ ...edOrgs.map(g => parseInt(g.toString())) ]

          try {
            const result = await api?.applications.update(selectedApplicationId.toString(), {
              applicationName: applicationData.applicationName,
              claimSetName: applicationData.claimSetName,
              vendorId: applicationData.vendorId,
              educationOrganizationIds: educationOrganizationIds,
              odsInstanceIds: [ instanceId ]
            })

            console.log('result update application', result)

            if (result) {
              // setApplicationAuthData(result)
              console.log('result', result)
              successToast('Updated Application.')
            } else {
              console.log('result', result)
              errorToast('Failed to Update Application.')
            }
          } catch (e) {
            console.log('error', e)
            errorToast('Failed to Update Application.')

          }

        } else {
          setHasTriedSubmit(true)
        }

        onFinishSave()
      }

      setIsSaving(false)
    }
  }

  const fetchVendorsList = async () => {
    if (edxAppConfig && auth && auth.user && adminConfig) {
      const vendorsListData = await api?.vendors.getAll() ?? []
      const claimsetsListData = await api?.claimSets.getAll() ?? []

      console.log('claimsets list data', claimsetsListData)

      vendorsListData.unshift({
        id: 0,
        company: 'Select Option'
      })

      claimsetsListData.unshift({
        id: 0,
        name: 'Select Option',
        applicationsCount: 0,
        isSystemReserved: false
      })

      setVendorOptionsList(vendorsListData)
      setClaimsOptionsList(claimsetsListData)

    }
  }

  useEffect(() => {
    fetchVendorsList()
  }, [])

  return {
    applicationData,
    selectedApplicationId,
    vendorOptionsList,
    claimsOptionsList,
    operationalContext,
    applicationAuthData,
    isSaving,
    isRegeneratingCredentials,
    hasTriedSubmit,
    errors,
    // selectedOrgId,
    onRegenerateCredentials,
    onSelectVendor,
    onSelectClaim,
    onChangeInput,
    onSave,
    edOrgs,
    setEdorgs,
    transformText
  }
}

export default useApplicationForm