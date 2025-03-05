// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useConfig } from '@edfi/admin-console-shared-sdk'
import useHttpService from '../../../hooks/http/useHttpService'
import { ActionParams } from '../adminAction.types'
import { GetPermissionsResult } from './PermissionsService.result'

const usePermissionsService = () => {
  const { getAsync } = useHttpService()
  const { config } = useConfig()

  const checkPermissions = async (actionParams: ActionParams) : GetPermissionsResult => {
    return {
      type: 'Response',
      data: []
    }
  }

  return { checkPermissions }
}

export default usePermissionsService