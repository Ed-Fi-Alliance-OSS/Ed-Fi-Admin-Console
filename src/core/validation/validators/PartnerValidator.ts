// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { EdfiVendor } from '../../Edfi/EdfiVendors'
import {
  FieldError, FormDataErrors, ValidateFieldParams
} from '../FormValidations.types'
import partnerNameSchema from '../schemas/Vendors/nameSchema'
import namespacePrefixesSchema from '../schemas/Vendors/namespacePrefixesSchema'
import ValidationErrorsMapper from './ValidationErrorsMapper'

export type PartnerValidatorFields = 'partnerName' | 'contactEmailAddress' | 'namespacePrefixes' | 'company';

export class PartnerValidator {
  public static validateField({ data, field }: ValidateFieldParams<EdfiVendor, PartnerValidatorFields>): FieldError | null {
    if (field === 'partnerName') {
      return this.validateName(data.contactName ?? '')
    } else if (field === 'namespacePrefixes') {
      return this.validateNamespacePrefixes(data.namespacePrefixes)
    } else if (field === 'company') {
      return this.validateCompany(data.company ?? '')
    } else if (field === 'contactEmailAddress') {
      return this.validateContactEmail(data.contactEmailAddress ?? '')
    }

    return null
  }

  public static validateAll() : FormDataErrors | null {
    return { 'field': { message: '' } }
  }

  private static validateName(value: string): FieldError | null {
    const { error } = partnerNameSchema.validate(value)

    return ValidationErrorsMapper.map(error)
  }

  private static validateNamespacePrefixes(value: any) : FieldError | null {
    const { error } = namespacePrefixesSchema.validate(value)

    if (error) {
      return ValidationErrorsMapper.map(error)
    }

    return this.validateNamespacePrefixUrl(value)
  }

  private static validateNamespacePrefixUrl(value: string) : FieldError | null {
    if (value.length == 0) {
      return null
    }

    const urlsList = value.split(',')

    for (const url of urlsList) {
      if (!this.isValidUrl(url)) {
        return { message: `Invalid url: ${url}` }
      }
    }

    return null
  }

  private static validateCompany(value: string): FieldError | null {
    if (!value.trim()) {
      return { message: 'Company is required.' }
    }

    return null
  }

  private static validateContactEmail(value: string): FieldError | null {
    if (!value.trim()) {
      return { message: 'Contact Email is required.' }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(value)) {
      return { message: 'Invalid email format.' }
    }

    return null
  }

  private static isValidUrl (value: string): boolean {
    const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/
    const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
    const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/

    if (typeof value !== 'string') {
      return false
    }
      
    const match = value.match(protocolAndDomainRE)

    if (!match) {
      return false
    }
      
    const everythingAfterProtocol = match[1]

    if (!everythingAfterProtocol) {
      return false
    }
      
    if (localhostDomainRE.test(everythingAfterProtocol) ||
            nonLocalhostDomainRE.test(everythingAfterProtocol)) {
      return true
    }
      
    return false
  }
}