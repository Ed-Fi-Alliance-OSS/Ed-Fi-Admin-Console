// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useLocation } from 'react-router-dom'

const useOdsInstanceParamId = () => {
  const location = useLocation()

  const getInstanceIdFromPathName = () => {
    const pathnameSplits = location.pathname.split('/')

    if (pathnameSplits.length > 1) {
      return pathnameSplits[2]
    }

    return 'unknown'
  }

  return { getInstanceIdFromPathName }
}

export default useOdsInstanceParamId