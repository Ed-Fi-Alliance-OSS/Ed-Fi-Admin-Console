// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel, Input
} from '@chakra-ui/react'
import { Field } from 'formik'
import { ChangeEvent } from 'react'

interface AppInputProps {
  fieldName: string
  label: string
  required?: boolean
  description?: string,
  placeholder?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  // validateField: (value: any) => string | boolean | undefined
}

export default function AppInput({ required, label, fieldName, description, placeholder, onChange }: AppInputProps) {
  return <Field name={fieldName}>
    {({ field, form }) => (
      <FormControl
        isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        mb={4}
      >
        <FormLabel
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='700'
          htmlFor={fieldName}
          lineHeight='20px'
        >
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </FormLabel>

        <Input
          {...field}
          id={fieldName}
          placeholder={placeholder}
          size='xs'
        />

        {!form.errors[fieldName] && description && <FormHelperText >{description}
        </FormHelperText>}

        <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
}