import { useContext } from 'react'
import {
  ExtendedODSInstance, ODSInstance 
} from '../../core/ODSInstance.types'
import useOdsInstanceService from '../../services/ODSInstances/OdsInstanceService'
import { GetOdsInstancesListRequest } from '../../services/ODSInstances/OdsInstanceService.requests'
import { adminConsoleContext } from '../../context/adminConsoleContext'
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

    if (currentDefault.instanceId == newDefault.instanceId) {
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

    return response.data.data
  }

  const findCurrentDefaultInstance = (instanceList: ODSInstance[]): ODSInstance | null => {
    const currentDefault = instanceList
      .find(instance => instance.isDefault == true)

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