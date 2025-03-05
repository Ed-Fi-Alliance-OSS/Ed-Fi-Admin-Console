// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useParams } from 'react-router-dom'

const useOdsInstanceIdParam = () => {
  const params = useParams()

  const getInstanceIdFromPath = (): string => {
    return params?.odsInstanceId || '0'
  }

  return { getInstanceIdFromPath }
}

export default useOdsInstanceIdParam