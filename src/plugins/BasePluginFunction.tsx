import {
  EdxAppConfig,
  useApiService
} from '@edfi/admin-console-shared-sdk'
import { IApiServices } from './test-plugin/functions/MockApiService'

export interface BasePluginFunction {
  'ApiService': (config: EdxAppConfig, apiService: typeof useApiService) => IApiServices,
}

export type BasePluginFunctionNames = keyof BasePluginFunction