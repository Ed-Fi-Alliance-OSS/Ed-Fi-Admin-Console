// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useState } from 'react'
import {
  FieldError, FormDataErrors 
} from '../../core/validation/FormValidations.types'

export interface HandleSingleErrorI {
    field: string 
    error: FieldError | null
}

const useFormValidationErrors = () => {
  const [ errors, setErrors ] = useState<FormDataErrors>({})

  const handleSingleError = ({ field, error }: HandleSingleErrorI) => {
    const allErrors = { ...errors }

    if (error) {
      allErrors[field] = error
    } else {
      delete allErrors[field]
    }

    setErrors(allErrors)
  }

  const handleAllErrors = (validationErrors: FormDataErrors) => {
    setErrors(validationErrors)
  }

  return {
    errors,
    setErrors,
    handleSingleError,
    handleAllErrors
  }
}

export default useFormValidationErrors