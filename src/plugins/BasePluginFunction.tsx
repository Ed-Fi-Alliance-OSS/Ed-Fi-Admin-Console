export interface BasePluginFunction {
  'GetOrganisations': [string],
}

export type BasePluginFunctionNames = keyof BasePluginFunction