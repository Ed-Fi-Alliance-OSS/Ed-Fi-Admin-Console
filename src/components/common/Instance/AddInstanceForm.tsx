// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex
} from '@chakra-ui/react'
import { CustomFormHeader } from '@edfi/admin-console-shared-sdk'
import {
  Form,
  Formik
} from 'formik'
import * as Yup from 'yup'
import AppInput from '../../AppInput'

interface AddInstanceFormProps {
  name: string
  connectionString: string
  type: string
  onSaveChanges: (values: any) => void
}


const AddInstanceForm = ({ name, type, connectionString, onSaveChanges: onSaveChanges2 }: AddInstanceFormProps) => {
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    type: Yup.string(),
    connectionString: Yup.string().required('Connection String is required')
  })

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Formik
        initialValues={{
          name,
          type,
          connectionString 
        }}
        validationSchema={validationSchema}
        onSubmit={onSaveChanges2}
      >
        <>
          <CustomFormHeader text="Instance Details" />

          <Flex
            flexDir='column'
            ml='10px'
            mt='16px'
            w='full'
          >
            <Form>
              <AppInput
                required
                fieldName='name'
                label='Name'
              />
              
              <AppInput
                fieldName='type'
                label='Instance Type'
              />
              
              <AppInput
                required
                description='SQL Connection String for Ed-Fi ODS database'
                fieldName='connectionString'
                label='Connection String'
              />

              <Button
                color='primaryBlue600'
                mt='32px'
                size='lg'
                type='submit'
                variant="solid"
                w='250px'
              >
                Create Instance
              </Button>
            </Form>
          </Flex>
        </>
      </Formik>
    </Flex>
  )
}

export default AddInstanceForm