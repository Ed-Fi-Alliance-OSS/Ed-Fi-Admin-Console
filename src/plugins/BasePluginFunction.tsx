// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  EdxAppConfig,
  useApiService
} from '@edfi/admin-console-shared-sdk'
import { IApiServices } from './test-plugin/functions/ApiService'

export interface BasePluginFunction {
  'ApiService': (config: EdxAppConfig, apiService: typeof useApiService) => IApiServices,
}

export type BasePluginFunctionNames = keyof BasePluginFunction