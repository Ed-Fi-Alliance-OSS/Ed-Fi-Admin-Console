// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { BasePlugin } from '../BasePlugin'
import { MockApiService } from './functions/MockApiService'

export default {
  name: 'test-plugin',
  strings: { 'app': { 'ODS_INSTANCES': 'Instances', } },
  register: (registry) => {
    registry.registerFunctionality('ApiService', MockApiService)
  },
} as BasePlugin