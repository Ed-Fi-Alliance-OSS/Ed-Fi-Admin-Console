// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ValidationError } from 'joi'
import { FieldError } from '../FormValidations.types'

export default class ValidationErrorsMapper {
  static map(validationError: ValidationError | undefined) {
    let error: FieldError | null = null

    if (validationError) {
      error = { message: validationError.message }
            
      return error
    }

    return null
  }
}