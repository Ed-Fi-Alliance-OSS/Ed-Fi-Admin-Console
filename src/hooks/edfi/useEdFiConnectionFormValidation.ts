// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { FormDataErrors } from '../../core/validation/FormValidations.types'
import { EdFiAdminConnectionValidator } from '../../core/validation/validators/EdFiAdminConnectionValidator'
import useFormValidationErrors from '../validations/useFormValidationErrors'
import { EdFiConnectionFormData } from './useEdFiConnectionForm.types'

const useEdFiConnectionFormValidation = () => {
  const { errors, setErrors, handleSingleError } = useFormValidationErrors()
  const resetErrors = () => setErrors({})

  const validateInputChange = (field: any, data: EdFiConnectionFormData) => {
    handleSingleError({ 
      field, 
      error: EdFiAdminConnectionValidator.validateField({
        data,
        field 
      }) 
    })
  }

  const validFormData = (data: EdFiConnectionFormData) => {
    const baseUrlError = EdFiAdminConnectionValidator.validateField({
      data,
      field: 'baseUrl' 
    })

    const keyError = EdFiAdminConnectionValidator.validateField({
      data,
      field: 'key' 
    })

    const secretError = EdFiAdminConnectionValidator.validateField({
      data,
      field: 'secret' 
    })

    const formDataErrors: FormDataErrors = {}

    if (baseUrlError) {
      formDataErrors['baseUrl'] = baseUrlError
    }

    if (keyError) {
      formDataErrors['key'] = keyError
    }

    if (secretError) {
      formDataErrors['secret'] = secretError
    }

    setErrors(formDataErrors)

    if (Object.keys(formDataErrors).length === 0) {
      return true
    }

    return false
  }
    
  const isValidFormData = (data: EdFiConnectionFormData) => {
    const baseUrlError = EdFiAdminConnectionValidator.validateField({
      data,
      field: 'baseUrl' 
    })

    const keyError = EdFiAdminConnectionValidator.validateField({
      data,
      field: 'key' 
    })

    const secretError = EdFiAdminConnectionValidator.validateField({
      data,
      field: 'secret' 
    })

    const formDataErrors: FormDataErrors = {}

    if (baseUrlError) {
      formDataErrors['baseUrl'] = baseUrlError
    }

    if (keyError) {
      formDataErrors['key'] = keyError
    }

    if (secretError) {
      formDataErrors['secret'] = secretError
    }

    if (Object.keys(formDataErrors).length === 0) {
      return true
    }

    return false
  }

  return {
    errors,
    resetErrors,
    validateInputChange,
    isValidFormData,
    validFormData
  }
}

export default useEdFiConnectionFormValidation