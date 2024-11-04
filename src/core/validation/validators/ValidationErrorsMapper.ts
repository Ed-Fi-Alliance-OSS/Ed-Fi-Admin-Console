import { ValidationError } from 'joi'
import { FieldError } from '../FormValidations.types'

export default class ValidationErrorsMapper {
  static map(validationError: ValidationError | undefined) {
    let error: FieldError | null = null
    if (validationError) {
      error = {message: validationError.message}
            
      return error
    }

    return null
  }
}