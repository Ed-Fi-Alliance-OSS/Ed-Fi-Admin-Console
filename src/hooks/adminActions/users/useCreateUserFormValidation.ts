// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import {
  UserValidator, UserValidatorFields 
} from '../../../core/validation/validators/UserValidator'
import useFormValidationErrors from '../../validations/useFormValidationErrors'
import { CreateUserFormData } from './useCreateUserForm.types'

const useCreateUserFormValidation = () => {
  const { errors, setErrors, handleSingleError } = useFormValidationErrors()
  const resetErrors = () => setErrors({})

  const validateInputChange = (field: UserValidatorFields, data: CreateUserFormData) => {
    handleSingleError({ 
      field, 
      error: UserValidator.validateField({
        data,
        field 
      }) 
    })
  }

  const validFormData = (data: CreateUserFormData) => {
    const firstNameError = UserValidator.validateField({
      data,
      field: 'firstName' 
    })

    const lastNameError = UserValidator.validateField({
      data,
      field: 'lastName' 
    })

    const emailError = UserValidator.validateField({
      data,
      field: 'email' 
    })

    const formDataErrors: FormDataErrors = {}

    if (firstNameError) {
      formDataErrors['firstName'] = firstNameError
    }

    if (lastNameError) {
      formDataErrors['lastName'] = lastNameError
    }

    if (emailError) {
      formDataErrors['email'] = emailError
    }

    setErrors(formDataErrors)

    if (Object.keys(formDataErrors).length === 0) {
      return true
    }

    return false
  }

  return {
    errors,
    resetErrors,
    validateInputChange,
    validFormData
  }
}

export default useCreateUserFormValidation