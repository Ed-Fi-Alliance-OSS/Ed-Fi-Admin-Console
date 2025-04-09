// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { isValidElement } from 'react'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import {
  PartnerValidator, PartnerValidatorFields
} from '../../../core/validation/validators/PartnerValidator'
import useFormValidationErrors from '../../validations/useFormValidationErrors'

const usePartnerFormValidation = () => {
  const { errors, setErrors, handleSingleError } = useFormValidationErrors()

  const validateInputChange = (field: PartnerValidatorFields, data: EdfiVendor) => {
    handleSingleError({ 
      field, 
      error: PartnerValidator.validateField({
        data,
        field 
      }) 
    })
  }

  const validPartnerData = (data: EdfiVendor) => {
    const nameError = PartnerValidator.validateField({
      data,
      field: 'partnerName' 
    })

    const namespacePrefixes = PartnerValidator.validateField({
      data,
      field: 'namespacePrefixes' 
    })

    const formDataErrors: FormDataErrors = {}

    if (nameError) {
      formDataErrors['partnerName'] = nameError
    }

    if (namespacePrefixes) {
      formDataErrors['namespacePrefixes'] = namespacePrefixes
    }

    setErrors(formDataErrors)

    return {
      isValid: Object.keys(formDataErrors).length === 0,
      errors: formDataErrors
    }
  }

  return {
    validateInputChange,
    validPartnerData,
    errors
  }
}

export default usePartnerFormValidation