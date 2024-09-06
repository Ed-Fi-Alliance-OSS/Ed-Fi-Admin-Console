import { HttpServiceRequestError, HttpServiceResponse } from "../../HttpService/HttpService.response.types"

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
    id: string 
    educationServiceCenterReference: EducationServiceCenterReference
    localEducationAgencyId: number
    nameOfInstitution: string 
    shortNameOfInstitution: string
    webSite: string 
    localEducationAgencyCategoryDescriptor: string 
    addresses: EducationOrganizationAddress[]
    categories: EducationOrganizationCategory[]
    identificationCodes: IdentificationCode[]
    indicators: object[]
    institutionTelephones: InstitutionTelephone[]
    internationalAddresses: object[]
    accountabilities: object[]
    federalFunds: object[]
    _etag: object[]
    _lastModifiedDate: string
}

export type GetDescriptorsResult = Promise<HttpServiceResponse<Descriptor[]> | HttpServiceRequestError>
export type GetEducationOrganizationsResult = Promise<HttpServiceResponse<EducationOrganization[]> | HttpServiceRequestError>