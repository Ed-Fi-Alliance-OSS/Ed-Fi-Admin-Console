// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export interface EdFiMetadata {
  version: string
  suite: string
  build: string
  apiMode: string
  dataModels: EdFiDataModel[]
  urls: EdFiUrls
}

export interface EdFiDataModel {
  name: string
  version: string
}

export interface EdFiUrls {
  dependencies: string
  openApiMetadata: string
  oauth: string
  dataManagementApi: string
  xsdMetadata: string
  changeQueries: string
  composites: string
  identity: string
}