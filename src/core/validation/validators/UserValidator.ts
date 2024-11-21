import { CreateUserFormData } from '../../../hooks/adminActions/users/useCreateUserForm.types'
import {
  FieldError, FormDataErrors, ValidateFieldParams 
} from '../FormValidations.types'
import { emailSchema } from '../schemas/Users/emailSchema'
import {
  firstNameSchema, lastNameSchema 
} from '../schemas/Users/nameSchema'
import ValidationErrorsMapper from './ValidationErrorsMapper'

export type UserValidatorFields = 'firstName' | 'lastName' | 'email'

export class UserValidator {
  public static validateField({ data, field }: ValidateFieldParams<CreateUserFormData, UserValidatorFields>): FieldError | null {
    if (field === 'firstName' || field === 'lastName') {
      return this.validateName(field, data[field])
    } else if (field === 'email') {
      return this.validateEmail(data.email)
    }

    return null
  }

  public static validateAll() : FormDataErrors | null {
    return { 'field': { message: '' } }
  }

  private static validateName(field: 'firstName' | 'lastName', value: any): FieldError | null {
    const { error } = field === 'firstName'? firstNameSchema.validate(value) : lastNameSchema.validate(value)

    return ValidationErrorsMapper.map(error)
  }

  private static validateEmail(value: any) : FieldError | null {
    const { error } = emailSchema.validate(value)

    return ValidationErrorsMapper.map(error)
  }
}