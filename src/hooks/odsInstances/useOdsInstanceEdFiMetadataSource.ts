// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import useExternalODSData from '../useExternalODSData'

export type InstanceEdFiMetadataSource = 'Starting Blocks' | 'Instance BaseUrl'

const useOdsInstanceEdFiMetadataSource = () => {
  const { externalODS } = useExternalODSData()

  const getEdFiMetadataSource = (): InstanceEdFiMetadataSource => {
    if (externalODS.isExternalODS) {
      return 'Instance BaseUrl'
    }

    return 'Starting Blocks'
  }

  return { getEdFiMetadataSource }
}

export default useOdsInstanceEdFiMetadataSource