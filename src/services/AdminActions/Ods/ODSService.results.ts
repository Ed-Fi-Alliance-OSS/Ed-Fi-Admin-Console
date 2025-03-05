// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  HttpServiceRequestError, HttpServiceResponse
} from '../../HttpService/HttpService.response.types'

export interface Descriptor {
    namespace: string
}

export interface Link {
    rel: string 
    ref: string
}

export interface EducationOrganizationAddress {
    addressTypeDescriptor: string 
    city: string  
    postalCode: string  
    stateAbbreviationDescriptor: string 
    streetNumberName: string  
    nameOfCounty: string  
    periods: object[] 
}

export interface EducationOrganizationCategory {
    educationOrganizationCategoryDescriptor: string 
}

export interface EducationServiceCenterReference {
    educationServiceCenterId: number
    link: Link
}

export interface IdentificationCode {
    educationOrganizationIdentificationSystemDescriptor: string
    identificationCode: string
}

export interface InstitutionTelephone {
    institutionTelephoneNumberTypeDescriptor: string
    telephoneNumber: string
}

export interface EducationOrganization {
  odsInstanceId: string
  name: string
  instanceType?: string
}

export type GetDescriptorsResult = Promise<HttpServiceResponse<Descriptor[]> | HttpServiceRequestError>
export type GetEducationOrganizationsResult = Promise<HttpServiceResponse<EducationOrganization[]> | HttpServiceRequestError>