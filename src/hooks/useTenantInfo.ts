// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Tenant
} from '@edfi/admin-console-shared-sdk'
import { useTenantContext } from '../context/tenantContext'

const useTenantInfo = () => {
  const { selectedTenant } = useTenantContext()

  const getCurrentTenant = (): Tenant | undefined => {
    if (selectedTenant) {
      return selectedTenant
    }
  }

  return { getCurrentTenant }
}

export default useTenantInfo