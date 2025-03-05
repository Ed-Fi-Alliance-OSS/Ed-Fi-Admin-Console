// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  InstanceEdfiStatus, InstanceOperationStatus, ODSInstance
} from '../../core/ODSInstance.types'
import { EdFiMetadata } from '../useEdfiUrls.types'

interface UseOdsInstanceEdFiStatusProps {
  instance: ODSInstance | null
  edFiMetadata: EdFiMetadata | null
}

const useOdsInstanceEdFiStatus = ({ edFiMetadata }: UseOdsInstanceEdFiStatusProps) => {
  const getOperationStatus = (): InstanceOperationStatus => {
    if (!edFiMetadata) {
      return 'Offline'
    }

    return 'Operational'
  }

  const getOdsInstanceEdFiStatus = (): InstanceOperationStatus => {
    return getOperationStatus()
  }



  const getOdsInstanceEdFiStatusFromMetadata = (edFiMetadata: EdFiMetadata | null): InstanceEdfiStatus => {
    if (!edFiMetadata) {
      return { operationStatus: 'Offline' }
    }

    return { operationStatus: 'Operational' }
  }

  return {
    getOdsInstanceEdFiStatus,
    getOdsInstanceEdFiStatusFromMetadata
  }
}

export default useOdsInstanceEdFiStatus