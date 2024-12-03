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