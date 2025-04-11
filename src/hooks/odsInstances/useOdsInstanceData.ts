// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  useContext,
  useEffect,
  useState
} from 'react'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import { ODSInstance } from '../../core/ODSInstance.types'
import useOdsInstanceService from '../../services/ODSInstances/OdsInstanceService'
import { UpdateOdsInstanceIsDefaultRequest } from '../../services/ODSInstances/OdsInstanceService.requests'
import useEDXToast from '../common/useEDXToast'
import useConfirmSetDefaultModal from './useConfirmSetDefaultModal'
import useSetUpWizardModal from './useSetUpWizardModal'

interface useOdsInstanceDataProps {
    instanceId: string | null
}

const useOdsInstanceData = ({ instanceId }: useOdsInstanceDataProps) => {
  const adminConfig = useContext(adminConsoleContext)
  const [ instance, setInstance ] = useState<ODSInstance | null>(null)
  const [ fetchingData, setIsFetchingData ] = useState(false)
  const [ updatingInstance, setIsUpdatingInstance ] = useState(false)

  const {
    getOdsInstancesList,
    getOdsInstanceById,
    updateInstanceIsDefault
  } = useOdsInstanceService()

  const { 
    showConfirmSetDefaultModal,
    onCloseConfirmSetDefaultModal,
    onShowConfirmSetDefaultModal
  } = useConfirmSetDefaultModal()

  const {
    showSetUpWizardModal,
    onShowSetUpWizardModal,
    onCloseSetUpWizardModal
  } = useSetUpWizardModal()

  const {
    errorToast
  } = useEDXToast(7000)

  const fetchInstanceById = async (instanceId: string) => {
    if (!adminConfig) {
      return
    } 

    setIsFetchingData(true)
    const response = await getOdsInstanceById(instanceId)

    setInstance(response)
    setIsFetchingData(false)
        
  }

  // const fetchInstanceByYear = async () => {
  //   if (!adminConfig) {
  //     return
  //   } 

  //   setIsFetchingData(true)
  //   const request: GetOdsInstancesListRequest = {
  //     pageIndex: 0,
  //     pageSize: 1,
  //     filter: `databases.ods.any(year == ${instanceId})`
  //   }

  //   const response = await getOdsInstancesList(
  //     adminConfig.actionParams, 
  //     request
  //   )

  //   setIsFetchingData(false)
        
  //   if (response.type == 'Error') {
  //     return
  //   } 
        
  //   if (response.data.length == 0) {
  //     return
  //   } 
        
  //   console.log('Instance by year', response.data[0])

  //   setInstance(response.data[0])
  // }

  const onSetIsDefault = async (instanceId: string, isDefault: boolean, validate: boolean) => {
    if (!adminConfig) {
      return
    } 

    const request: UpdateOdsInstanceIsDefaultRequest = {
      tenantId: adminConfig.actionParams.tenantId,
      instanceId,
      isDefault,
      validate
    }

    setIsUpdatingInstance(true)

    const response = await updateInstanceIsDefault(
      adminConfig.actionParams,
      request
    )
            
            
    if (response.type == 'Error') {
      setIsUpdatingInstance(false)
                
      onCloseConfirmSetDefaultModal()

      errorToast('Failed to set instance as default.')
                
      return 
    }
            
    await fetchInstanceById(instanceId)
            
    setIsUpdatingInstance(false)
    onCloseConfirmSetDefaultModal()
  }

  useEffect(() => {
    console.log('instance year', instanceId)

    if (!instanceId) {
      return
    } 

    if (instanceId == 'unknown') {
      return
    } 

    fetchInstanceById(instanceId)
  }, [])

  return {
    instance,
    fetchingData,
    updatingInstance,
    showConfirmSetDefaultModal,
    showSetUpWizardModal,
    onShowSetUpWizardModal,
    onCloseSetUpWizardModal,
    onSetIsDefault,
    onCloseConfirmSetDefaultModal,
    onShowConfirmSetDefaultModal
  }
}

export default useOdsInstanceData
