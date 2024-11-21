import {
  CreateEdfiApplicationRequest, UpdateEdfiApplicationRequest 
} from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests'
import {
  FieldError, FormDataErrors, ValidateFieldParams 
} from '../FormValidations.types'
import claimsetSchema from '../schemas/Applications/claimsetSchema'
import applicationNameSchema from '../schemas/Applications/nameSchema'
import operationalContextURISchema from '../schemas/Applications/operationalContextURISchema'
import vendorIdSchema from '../schemas/Applications/vendorIdSchema'
import ValidationErrorsMapper from './ValidationErrorsMapper'

export type ApplicationValidatorFields = 'applicationName' | 'vendor' | 'claimset' | 'operationalContextURI'

export class ApplicationValidator {
  public static validateField({ data, field }: ValidateFieldParams<CreateEdfiApplicationRequest | UpdateEdfiApplicationRequest, ApplicationValidatorFields>): FieldError | null {
    if (field === 'applicationName') {
      return this.validateName(data.applicationName)
    } else if (field === 'claimset') {
      return this.validateClaimset(data.claimSetName)
    } else if (field === 'vendor') {
      return this.validateVendor(data.vendorId)
    } else if (field === 'operationalContextURI') {
      return this.validateOperationalContextURI('')
    }

    return null
  }

  public static validateAll() : FormDataErrors | null {
    return { 'field': { message: '' } }
  }

  private static validateName(value: any): FieldError | null {
    const { error } = applicationNameSchema.validate(value)

    if (error) {
      return ValidationErrorsMapper.map(error)
    }

    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        
    if (format.test(value)) {
      return { message: 'Invalid application name' }
    }

    return null
  }

  private static validateClaimset(value: any) : FieldError | null {
    const { error } = claimsetSchema.validate(value)

    if (!error && value === 'Select Option') {
      return { message: 'Select a Claim Set' }
    }
        
    return ValidationErrorsMapper.map(error)
  }
    
  private static validateVendor(value: any) : FieldError | null {
    const { error } = vendorIdSchema.validate(value)

    if (!error && value === 0) {
      return { message: 'Select a Vendor' }
    }

    return ValidationErrorsMapper.map(error)
  }

  private static validateOperationalContextURI(value: any) : FieldError | null {
    const { error } = operationalContextURISchema.validate(value)

    return ValidationErrorsMapper.map(error)
  }
}