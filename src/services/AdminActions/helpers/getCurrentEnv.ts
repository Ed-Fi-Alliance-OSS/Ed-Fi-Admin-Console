// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { EdxAppConfig } from '@edfi/admin-console-shared-sdk'
import { AdminActionsAPISource } from '../sourceEndpoint'

const getCurrentEnv = (config: EdxAppConfig): AdminActionsAPISource => {
  if (config.auth.postLogoutRedirectUri) {
    if (config.auth.postLogoutRedirectUri.includes('localhost')) {
      return 'local'
    }
    
    if (config.auth.postLogoutRedirectUri.includes('dev')) {
      return 'dev'
    }

    return 'prod'
  }

  return 'local'
}

export default getCurrentEnv