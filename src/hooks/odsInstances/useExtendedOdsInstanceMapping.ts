// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  ExtendedODSInstance, ODSInstance
} from '../../core/ODSInstance.types'
import useHttpService from '../http/useHttpService'
import useOdsInstanceEdFiStatus from './useOdsInstanceEdFiStatus'
import useOdsVersions from './useOdsVersions'

const useExtendedOdsInstanceMapping = () => {
  const { getSimpleAsync } = useHttpService()

  const {
    getEdFiVersionFromMetadata,
    getTSDSVersionFromMetadata
  } = useOdsVersions()

  const { getOdsInstanceEdFiStatusFromMetadata } = useOdsInstanceEdFiStatus({
    instance: null,
    edFiMetadata: null
  })

  const getInstanceEdFiMetadata = (instance: ODSInstance) => {
    // return instance.edfiMetadata
    return null
  }

  const mapToExtendedOdsInstance = async (instance: ODSInstance): Promise<ExtendedODSInstance> => {
    const edFiMetadata = await getInstanceEdFiMetadata(instance)

    return {
      name: instance.name,
      odsInstanceId: instance.odsInstanceId,
      instanceType: instance.instanceType,
      edFiVersion: getEdFiVersionFromMetadata(edFiMetadata),
      tsdsVersion: getTSDSVersionFromMetadata(edFiMetadata),
      edFiStatus: getOdsInstanceEdFiStatusFromMetadata(edFiMetadata)
    }
  }

  return { mapToExtendedOdsInstance }
}

export default useExtendedOdsInstanceMapping