// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ODSInstance } from '../../core/ODSInstance.types'
import useOdsInstanceYear from './useOdsInstanceYear'

const useOdsInstanceDisplayYear = () => {
  const { getInstanceYear } = useOdsInstanceYear()

  const getDisplayYear = (instance: ODSInstance | null | undefined) => {
    if (!instance) {
      return 'Empty'
    }

    const instanceYear = getInstanceYear(instance)

    if (!instanceYear) {
      return 'Empty'
    }

    return `${parseInt(instanceYear.toString()) - 1} - ${instanceYear}`
  }

  const getDisplayYearFromString = (year: string) => {
    const intYear = parseInt(year)

    return `${intYear - 1} - ${intYear}`
  }

  return {
    getDisplayYear,
    getDisplayYearFromString
  }
}

export default useOdsInstanceDisplayYear