// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  forOwn, merge, pickBy, set,
} from 'lodash-es'

export const mergeEnvVars = (defaultConf) => {
  const combinedConfig = merge(defaultConf, {})
  const envVars = pickBy(process.env, (_, a) => a?.startsWith('EG_') && a?.includes('__'))

  forOwn(envVars, (v, k) => {
    set(combinedConfig, k?.replace('EG_', '').replace(/__/gm, '.'), v)
  })

  return combinedConfig
}