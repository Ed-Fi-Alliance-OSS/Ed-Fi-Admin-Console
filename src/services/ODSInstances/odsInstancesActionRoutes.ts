// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

// const odsInstancePrefix = (tenantId: string) =>  `tenants/${tenantId}/edfiadmin/odsinstances`
const odsInstancePrefix = (tenantId: string) =>  'adminconsole/odsinstances'

const odsInstancesActionRoutes = {
  getInstancesList: (tenantId: string) => `${odsInstancePrefix(tenantId)}`,
  putInstanceIsDefault: (tenantId: string, instanceId: string) => `${odsInstancePrefix(tenantId)}/${instanceId}/default`,
  deleteInstance: (tenantId: string, instanceId: string) => `${odsInstancePrefix(tenantId)}/${instanceId}`,
  postInstanceOnboardingStep: (tenantId: string, instanceId: string) => `${odsInstancePrefix(tenantId)}/${instanceId}/onboardingsteps`,
  putInstanceOnboardingStep: (tenantId: string, instanceId: string, step: number) => `${odsInstancePrefix(tenantId)}/${instanceId}/onboardingsteps/${step}`
}

export default odsInstancesActionRoutes