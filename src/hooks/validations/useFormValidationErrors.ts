import { useState } from "react"
import { FieldError, FormDataErrors } from "../../core/validation/FormValidations.types"

export interface HandleSingleErrorI {
    field: string 
    error: FieldError | null
}

const useFormValidationErrors = () => {
    const [errors, setErrors] = useState<FormDataErrors>({})

    const handleSingleError = ({field, error}: HandleSingleErrorI) => {
        const allErrors = {...errors}

        if (error)
            allErrors[field] = error
        else 
            delete allErrors[field]

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