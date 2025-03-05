// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useContext } from 'react'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import {
  ExtendedODSInstance, ODSInstance
} from '../../core/ODSInstance.types'
import useOdsInstanceService from '../../services/ODSInstances/OdsInstanceService'
import { GetOdsInstancesListRequest } from '../../services/ODSInstances/OdsInstanceService.requests'
import useOdsInstanceYear from './useOdsInstanceYear'

const useValidateSetAsDefault = () => {
  const adminConfig = useContext(adminConsoleContext)

  const {
    getOdsInstancesList
  } = useOdsInstanceService()

  const {
    getInstanceYear
  } = useOdsInstanceYear()

  const canSetAsDefault = (instance: ExtendedODSInstance | ODSInstance, instancesList: ODSInstance[]): boolean => {
    const currentDefault = findCurrentDefaultInstance(instancesList)

    return validateSetAsDefault(currentDefault, instance)
  }

  const canSetAsDefaultAsync = async (instance: ExtendedODSInstance | ODSInstance): Promise<boolean> => {
    const instancesList = await getInstancesList()

    if (!instancesList) {
      return false
    }

    const currentDefault = findCurrentDefaultInstance(instancesList)

    return validateSetAsDefault(currentDefault, instance)
  }

  const validateSetAsDefault = (currentDefault: ODSInstance | null, newDefault: ODSInstance | ExtendedODSInstance): boolean => {
    if (!currentDefault) {
      return true
    }

    if (currentDefault.odsInstanceId == newDefault.odsInstanceId) {
      return false
    }

    const currentDefaultYear = getInstanceYear(currentDefault)
    const newDefaultYear = getInstanceYear(newDefault)

    if (!currentDefaultYear) {
      return true
    }

    if (!newDefaultYear) {
      return false
    }

    if (currentDefaultYear >= newDefaultYear) {
      return false
    } 

    return true
  }

  const getInstancesList = async (): Promise<ODSInstance[] | null> => {
    if (!adminConfig) {
      return null
    }

    const request: GetOdsInstancesListRequest = {
      pageIndex: 0,
      pageSize: 10
    }

    const response = await getOdsInstancesList(
      adminConfig.actionParams, 
      request
    )

    if (response.type == 'Error') {
      return null
    }

    return response.data
  }

  const findCurrentDefaultInstance = (instanceList: ODSInstance[]): ODSInstance | null => {
    const currentDefault = instanceList.length > 0 ? instanceList[0] : null

    if (!currentDefault) {
      return null
    }

    return currentDefault
  }

  return {
    canSetAsDefault,
    canSetAsDefaultAsync
  }
}

export default useValidateSetAsDefault