// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  ExtendedODSInstance, ODSInstance 
} from '../../core/ODSInstance.types'

const useOdsInstanceHostingType = () => {
  const getHostingType = (instance: ExtendedODSInstance | ODSInstance | null) => {
    if (!instance) {
      return 'Unknown'
    }

    if (instance.provider == 'TexasEducationExchange') {
      return 'Exchange'
    }

    if (instance.provider == 'External') {
      return 'External'
    }

    return 'EdGraph'
  }

  return { getHostingType }
}

export default useOdsInstanceHostingType