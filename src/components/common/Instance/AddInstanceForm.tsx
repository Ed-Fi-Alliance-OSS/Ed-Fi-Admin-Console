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
                mt='32px'
                size='lg'
                type='submit'
                variant='primaryBlue600'
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