// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import useCreateUserFormValidation from '../../../hooks/adminActions/users/useCreateUserFormValidation'

export function useTenantForm() {
  const { validateInputChange, validFormData, errors, resetErrors } = useCreateUserFormValidation()
  return {
    validateInputChange,
    validFormData,
    errors,
    resetErrors
  }
}