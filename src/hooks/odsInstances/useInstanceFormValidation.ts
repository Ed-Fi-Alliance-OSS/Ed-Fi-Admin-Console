// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ODSInstance } from '@edfi/admin-console-shared-sdk'

export interface InstanceFormErrors {
  name: string
  instanceType: string
  connectionString: string
}

export function useInstanceFormValidation() {

  const validateField = <T extends keyof ODSInstance>(field: T) => (value: ODSInstance[T]) => {


    if (field == 'name' && !value) {
      return 'Name is required'
    }

    if (field == 'instanceType' && !value) {
      return 'Instance Type is required'
    }

    if (field == 'connectionString') {
      return 'Connection String is required'
    }

  }

  return { validateField, }

}