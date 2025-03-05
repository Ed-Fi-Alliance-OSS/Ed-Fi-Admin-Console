// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { EdFiConnectionFormData } from './useEdFiConnectionForm.types'

const initialFormData: EdFiConnectionFormData = {
  connectionId: null,
  baseUrl: '',
  key: '',
  secret: ''
}

export const getInitialConnectionFormData = (initialData?: EdFiConnectionFormData) => {
  if (!initialData) {
    return { ...initialFormData }
  }

  const connectionData: EdFiConnectionFormData = {
    connectionId: initialData.connectionId,
    baseUrl: initialData.baseUrl,
    key: initialData.key,
    secret: initialData.secret,
    connectionName: initialData.connectionName
  }

  return connectionData
}