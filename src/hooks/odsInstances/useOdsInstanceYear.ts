// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ODSInstance } from '../../core/ODSInstance.types'

const useOdsInstanceYear = () => {
  const getInstanceYear = (instance: ODSInstance | null | undefined) => {
    if (!instance) {
      return null
    }

    console.log(instance)

    return instance.document?.odsInstanceContexts?.find(context => context.contextKey === 'schoolYearFromRoute')?.contextValue ?? new Date().getFullYear()
  }

  return { getInstanceYear }
}

export default useOdsInstanceYear