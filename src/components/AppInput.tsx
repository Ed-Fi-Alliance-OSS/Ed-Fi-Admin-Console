import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel, Input
} from '@chakra-ui/react'
import { Field } from 'formik'

interface AppInputProps {
  fieldName: string
  label: string
  required?: boolean
  description?: string
  // validateField: (value: any) => string | boolean | undefined
}

export default function AppInput({ required, label, fieldName, description }: AppInputProps) {
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
          size='xs'
        />

        {!form.errors[fieldName] && description && <FormHelperText
        >{description}
        </FormHelperText>}

        <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
}