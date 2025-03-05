// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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