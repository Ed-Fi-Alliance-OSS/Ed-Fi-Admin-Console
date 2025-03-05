// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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