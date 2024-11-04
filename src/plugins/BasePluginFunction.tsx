export interface BasePluginFunction {
  "CustomA": [string, number],
  "CustomB": [number, number]
}

export type BasePluginFunctionNames = keyof BasePluginFunction