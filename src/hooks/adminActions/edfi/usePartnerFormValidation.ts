import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import {
  PartnerValidator, PartnerValidatorFields 
} from '../../../core/validation/validators/PartnerValidator'
import { CreateEdfiVendorRequest } from '../../../services/AdminActions/Edfi/Vendors/EdfiVendorsService.requests'
import useFormValidationErrors from '../../validations/useFormValidationErrors'

const usePartnerFormValidation = () => {
  const { errors, setErrors, handleSingleError } = useFormValidationErrors()

  const validateInputChange = (field: PartnerValidatorFields, data: CreateEdfiVendorRequest) => {
    handleSingleError({ 
      field, 
      error: PartnerValidator.validateField({
        data,
        field 
      }) 
    })
  }

  const validPartnerData = (data: CreateEdfiVendorRequest) => {
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

    if (Object.keys(formDataErrors).length === 0) {
      return true
    }

    return false
  }

  return {
    validateInputChange,
    validPartnerData,
    errors
  }
}

export default usePartnerFormValidation