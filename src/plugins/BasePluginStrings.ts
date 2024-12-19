type PossibleValues = string | boolean | number | null | undefined;
export type StringsShape = Record<string, Record<string, PossibleValues> | PossibleValues>;
export const BasePluginStrings = {
  app: { 'ODS_INSTANCES': 'Instances', },
  api: { edfi: 'https://ed-fi.org' }
} as const

// type NestedKeys<T> = { [K in keyof T]: T[K] extends Record<string, any> ? `${K & string}.${NestedKeys<T[K]> & string}` : `${K & string}`}[keyof T];
type NestedKeysTwoLevels<T> = {
  [K in keyof T]: T[K] extends Record<string, any> // Check if the value is an object
    ? `${K & string}.${keyof T[K] & string}` // Concatenate only one level deeper
    : `${K & string}`
}[keyof T];
export type BasePluginStringsKeys = NestedKeysTwoLevels<typeof BasePluginStrings>
// export type GetStringType = <T extends keyof typeof StringsShape, J extends keyof typeof StringsShape[T]>(key: T, subKey: J) => string