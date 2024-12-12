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