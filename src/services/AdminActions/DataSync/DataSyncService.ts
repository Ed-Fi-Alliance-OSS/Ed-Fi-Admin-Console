// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ActionParams } from '../adminAction.types'
import adminActionRoutes from '../tenantActionRoutes'
import useHttpService from '../../../hooks/http/useHttpService'
import { CreateConnectionResult } from './DataSync.results'
import { CreatedConnectionResponse } from './DataSynct.response'
import { CreateConnectionRequest } from './DataSync.requests'

const useDataSyncService = () => {
  const { postAsync } = useHttpService()

  const createConnection = async (actionParams: ActionParams, data: CreateConnectionRequest): CreateConnectionResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.createConnection(actionParams.tenantId)}`
    
    const result = await postAsync<CreatedConnectionResponse, CreateConnectionRequest>({ 
      actionName: 'Create Connection',
      access_token: actionParams.token,
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  return { createConnection }
}

export default useDataSyncService