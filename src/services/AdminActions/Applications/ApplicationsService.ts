// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import axios, { AxiosError } from 'axios'
import { ActionParams } from '../adminAction.types'
import adminActionRoutes from '../tenantActionRoutes'
import { GetTenantApplicationsResponse } from './ApplicationsService.responses'
import { GetApplicationsResult } from './ApplicationsService.results'
import { includeAuthorization } from '@edfi/admin-console-shared-sdk'

const getApplicationsList = async (actionParams: ActionParams): GetApplicationsResult => {
  const baseUrl = actionParams.edxApiUrl
  const queryParams = `pageIndex=${0}&pageSize=${100}`
  const endpointUrl = `${baseUrl}/${adminActionRoutes.getApplicationsList(actionParams.tenantId)}?${queryParams}`

  console.log('get tenants applications list request to: ', endpointUrl)
  const authorizationToken = await includeAuthorization(actionParams.token, actionParams.config.api)

  try {
    const res = await axios.get(endpointUrl, authorizationToken)
    const applicationsList: GetTenantApplicationsResponse = res.data

    return applicationsList
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message)
    }else {
      console.error('Error for Get: Applications List', error)
    }
        
    return null
  }
}

export {
  getApplicationsList
}