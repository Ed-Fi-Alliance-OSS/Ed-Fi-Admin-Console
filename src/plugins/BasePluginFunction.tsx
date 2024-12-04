import {
  EdxAppConfig,
  useApiService
} from '@edfi/admin-console-shared-sdk'

export interface BasePluginFunction {
  'ApiService': [EdxAppConfig, typeof useApiService],
}

export type BasePluginFunctionNames = keyof BasePluginFunction