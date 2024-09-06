import { EdFiConnectionFormData } from "../../../hooks/edfi/useEdFiConnectionForm.types";
import { FieldError, FormDataErrors, ValidateFieldParams } from "../FormValidations.types";
import ValidationErrorsMapper from "./ValidationErrorsMapper";

export type EdFiConnectionValidatorFields = "baseUrl" | "key" | "secret"

export class EdFiAdminConnectionValidator {
    public static validateField({ data, field }: ValidateFieldParams<EdFiConnectionFormData, EdFiConnectionValidatorFields>): FieldError | null {
        if (field === 'key')
            return this.validateKey(data[field])
        if (field === "secret")
            return this.validateSecret(data.secret)
        if (field === 'baseUrl')
            return this.validateBaseUrl(data.baseUrl)

        return null
    }

    private static validateSecret(value: string): FieldError | null {
        let error: FieldError | null = null

        if (value.length === 0)
            error = { message: "Secret should not be empty" }

        if (value.length < 5)
            error = { message: "Secret length should be more than 4" }

        if (value.length > 150)
            error = { message: "Secret length should be less than 151" }
        
        return error
    }

    private static validateKey(value: any): FieldError | null {
        let error: FieldError | null = null

        if (value.length === 0)
            error = { message: "Key should not be empty" }

        if (value.length < 5)
            error = { message: "Key length should be more than 4" }

        if (value.length > 16)
            error = { message: "Key length should be less than 16" }
        
        return error
    }

    private static validHttpUrl(url: string): boolean {
       return false
    }

    private static validHttpsUrl(testUrl: string): boolean {
        try {
            const url = new URL(testUrl)
            if (url.protocol === "https:" && url.host !== "" && url.pathname !== "") {
                return true
            }

            return false
        }
        catch (e) {
            return false
        }
    }

    private static validateBaseUrl(value: string): FieldError | null {
        let error: FieldError | null = null

        if (value.length === 0)
            error = { message: "Base Url should not be empty" }
       
        if (!error) {
            const message = "Invalid url"
    
            const includesHttp = value.includes("http://")
            const includesHttps = value.includes("https://")
    
            if (!includesHttp && !includesHttps)
                error = { message }
            else if (includesHttp && !this.validHttpUrl(value))
                error = { message }
            else if (includesHttps && !this.validHttpsUrl(value))
                error = { message }
        }

        return error
    }
}