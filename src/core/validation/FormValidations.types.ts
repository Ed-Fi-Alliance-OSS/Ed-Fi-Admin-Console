export interface FormDataErrors {
    [key: string]: FieldError
}

export interface FieldError {
    message: string
}

export type DataValidationResult = FieldError | null

export interface ValidateAllParams<TData> {
    data: TData
}

export interface ValidateFieldParams<TData, TField> {
    data: TData
    field: TField
}