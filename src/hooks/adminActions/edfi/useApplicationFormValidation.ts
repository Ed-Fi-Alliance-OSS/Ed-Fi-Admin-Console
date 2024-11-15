import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import { ApplicationValidator, ApplicationValidatorFields } from '../../../core/validation/validators/ApplicationValidator'
import { CreateEdfiApplicationRequest, UpdateEdfiApplicationRequest } from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests'
import useFormValidationErrors from '../../validations/useFormValidationErrors'

const useApplicationFormValidation = () => {
  const { errors, setErrors, handleSingleError } = useFormValidationErrors()

  const validateField = (field: ApplicationValidatorFields, data: CreateEdfiApplicationRequest | UpdateEdfiApplicationRequest) => {
    handleSingleError({ 
      field, 
      error: ApplicationValidator.validateField({ data, field }) 
    })
  }

  const validApplicationData = (data: CreateEdfiApplicationRequest | UpdateEdfiApplicationRequest) => {
    const nameError = ApplicationValidator.validateField({ data, field: 'applicationName' })
    const claimsetError = ApplicationValidator.validateField({ data, field: 'claimset' })
    const vendorError = ApplicationValidator.validateField({ data, field: 'vendor' })
    // const operationalContextURIError = ApplicationValidator.validateField({ data, field: "operationalContextURI" })
        
    const formDataErrors: FormDataErrors = {}

    if (nameError) formDataErrors['applicationName'] = nameError
    if (claimsetError) formDataErrors['claimset'] = claimsetError
    if (vendorError) formDataErrors['vendor'] = vendorError
    // if (operationalContextURIError) formDataErrors["operationalContextURI"] = operationalContextURIError

    setErrors(formDataErrors)

    if (Object.keys(formDataErrors).length === 0)
      return true

    return false
  }

  return {
    validateField,
    validApplicationData,
    errors
  }
}

export default useApplicationFormValidation