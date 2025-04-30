// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import {
  useContext, useEffect, useState
} from 'react'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import { useTenantContext } from '../../context/tenantContext'
import { ODSInstance } from '../../core/ODSInstance.types'
import { usePluginContext } from '../../plugins/BasePlugin'
import useControlTable from '../controlTable/useControlTable'
import useConfirmSetDefaultModal from './useConfirmSetDefaultModal'
import { UpdatingIsDefaultStatus } from './useOdsInstanceTable.types'
import useSetUpWizardModal from './useSetUpWizardModal'
import useValidateSetAsDefault from './useValidateSetAsDefault'

const useOdsInstanceTable = () => {
  const adminConfig = useContext(adminConsoleContext)

  const {
    paginatedData,
    setPaginatedData,
    isFetchingData,
    setIsFetchingData,
    orderBy,
    onSortAsc,
    onSortDesc,
  } = useControlTable<ODSInstance, any>({
    initialOrder: 'year',
    initialPageSize: 100
  })

  const [ selectedInstance, setSelectedInstance ] = useState<ODSInstance | null>(null)

  const [ updatingIsDefault, setUpdatingIsDefault ] = useState<UpdatingIsDefaultStatus>({
    instanceId: null,
    loading: false
  })

  const {
    showConfirmSetDefaultModal,
    onShowConfirmSetDefaultModal,
    onCloseConfirmSetDefaultModal
  } = useConfirmSetDefaultModal()

  const {
    showSetUpWizardModal,
    onShowSetUpWizardModal,
    onCloseSetUpWizardModal
  } = useSetUpWizardModal()


  const {
    canSetAsDefault
  } = useValidateSetAsDefault()

  const { selectedTenant } = useTenantContext()
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const apiService = functionalities.ApiService?.(config, useApiService)

  const fetchInstancesList = async () => {
    if (!adminConfig) {
      return
    }

    if(!selectedTenant) {
      return
    }

    setIsFetchingData(true)
    const instancesResp = await apiService?.instances.getAll()
    const instanceRespNoDeleted = instancesResp.filter(element => element.status !== "Deleted")
    setPaginatedData({
      pageIndex: 0,
      pageSize: 100,
      count: 100,
      data: instanceRespNoDeleted
    })

    setIsFetchingData(false)
  }

  const onOpenSetDefaultModal = (instanceId: number) => {
    const instanceById = paginatedData.data.find(i => i.id == instanceId)

    if (!instanceById) {
      return
    }

    setSelectedInstance({ ...instanceById })
    onShowConfirmSetDefaultModal()
  }

  const onFetchInstancesData = async () => {
    await fetchInstancesList();
  }

  const onOpenSetUpModal = (instanceId: number) => {
    const instanceById = paginatedData.data.find(i => i.id == instanceId)

    if (!instanceById) {
      return
    }

    setSelectedInstance({ ...instanceById })
    onShowSetUpWizardModal()
  }

  useEffect(() => {
    fetchInstancesList()
  }, [ selectedTenant ])

  return {
    paginatedData,
    selectedInstance,
    orderBy,
    onSortAsc,
    onSortDesc,
    isFetchingData,
    updatingIsDefault,
    showConfirmSetDefaultModal,
    onOpenSetDefaultModal,
    onCloseConfirmSetDefaultModal,
    showSetUpWizardModal,
    onShowSetUpWizardModal,
    onCloseSetUpWizardModal,
    onOpenSetUpModal,
    onSetIsDefault: () => {},
    onFetchInstancesData
  }
}

export default useOdsInstanceTable