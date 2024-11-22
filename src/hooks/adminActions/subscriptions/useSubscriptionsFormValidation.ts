import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import { SubscriptionValidator } from '../../../core/validation/validators/SubscriptionValidator'
import useFormValidationErrors from '../../validations/useFormValidationErrors'
import { SubscriptionFormData } from './useSubscriptionsForm.types'

const useSubscriptionsFormValidation = () => {
  const { errors, setErrors, handleSingleError } = useFormValidationErrors()
  const resetErrors = () => setErrors({})

  const validateHasSelectedApplication = (data: SubscriptionFormData) => {
    handleSingleError({ 
      field: 'selectApplication', 
      error:  SubscriptionValidator.validateField({
        data,
        field: 'selectApplication' 
      })
    })
  }

  const validateGracePeriod = (data: SubscriptionFormData) => {
    handleSingleError({ 
      field: 'gracePeriod', 
      error:  SubscriptionValidator.validateField({
        data,
        field: 'gracePeriod' 
      })
    })
  }

  const validateNumberOfLicenses = (data: SubscriptionFormData) => {
    handleSingleError({ 
      field: 'numberOfLicenses', 
      error:  SubscriptionValidator.validateField({
        data,
        field: 'numberOfLicenses' 
      })
    })
  }

  const validateSubscriptionDuration = (data: SubscriptionFormData) => {
    handleSingleError({ 
      field: 'subscriptionDuration', 
      error:  SubscriptionValidator.validateField({
        data,
        field: 'subscriptionDuration' 
      })
    })
  }

  const validFormData = (data: SubscriptionFormData) => {
    console.log('validate form data')
    const selectedApplicationError = SubscriptionValidator.validateField({
      data,
      field: 'selectApplication' 
    })

    const gracePeriodError = SubscriptionValidator.validateField({
      data,
      field: 'gracePeriod' 
    })

    const numberOfLicensesError = SubscriptionValidator.validateField({
      data,
      field: 'numberOfLicenses' 
    })

    const subscriptionDurationError = SubscriptionValidator.validateField({
      data,
      field: 'subscriptionDuration' 
    })

    const formDataErrors: FormDataErrors = {}

    if (selectedApplicationError) {
      formDataErrors['selectApplication'] = selectedApplicationError
    }

    if (gracePeriodError) {
      formDataErrors['gracePeriod'] = gracePeriodError
    }

    if (subscriptionDurationError) {
      formDataErrors['subscriptionDuration'] = subscriptionDurationError
    }

    if (numberOfLicensesError) {
      formDataErrors['numberOfLicenses'] = numberOfLicensesError
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
    validFormData,
    validateHasSelectedApplication,
    validateGracePeriod,
    validateNumberOfLicenses,
    validateSubscriptionDuration
  }
}

export default useSubscriptionsFormValidation