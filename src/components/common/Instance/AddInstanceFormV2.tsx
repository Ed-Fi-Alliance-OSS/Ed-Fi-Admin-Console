import React, { useState } from 'react'
import {
  Form,
  Formik
} from 'formik'
import {
  Button, Flex, Input, Box, Text 
} from '@chakra-ui/react'
import {
  CustomFormHeader, CustomSelect 
} from '@edfi/admin-console-shared-sdk'
import * as Yup from 'yup'
import AppInput from '../../AppInput'

export interface AddInstanceFormProps {
  name: string;
  instanceType: string;
  odsInstanceContexts: {
    contextKey: string;
    contextValue: string;
  }[];
  odsInstanceDerivatives: {
    derivativeType: string;
  }[];
  onSaveChanges: (data: AddInstanceFormProps) => void;
}

const AddInstanceFormV2: React.FC<AddInstanceFormProps> = ({
  name,
  instanceType,
  odsInstanceContexts,
  odsInstanceDerivatives,
  onSaveChanges,
}) => {
  const [ formData, setFormData ] = useState<AddInstanceFormProps>({
    name,
    instanceType,
    odsInstanceContexts,
    odsInstanceDerivatives,
    onSaveChanges
  })

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    instanceType: Yup.string().required('Instance Type is required'),
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Formik
        initialValues={{
          name: formData.name,
          instanceType: formData.instanceType,
          odsInstanceContexts: formData.odsInstanceContexts,
          odsInstanceDerivatives: formData.odsInstanceDerivatives,
          onSaveChanges,
        }}
        validationSchema={validationSchema}
        onSubmit={onSaveChanges}
      >
        {({ values, setFieldValue }) => (
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
                  onChange={handleChange}
                />

                <AppInput
                  required
                  fieldName='instanceType'
                  label='Instance Type'
                  onChange={handleChange}
                />

                <Text
                  fontFamily='Poppins'
                  fontSize='14px'
                  fontWeight='700'
                  lineHeight='20px'
                >ODS Instance Contexts:                
                </Text>                {values.odsInstanceContexts.map((context, index) => (
                  <Flex key={`context-${index}`} alignItems="center" mb="8px">
                    <Input
                      required
                      placeholder="Context Key"
                      size='xs'
                      value={context.contextKey}
                      onChange={(e) =>
                        setFieldValue(
                          `odsInstanceContexts[${index}].contextKey`,
                          e.target.value
                        )
                      }
                    />

                    <Input
                      required
                      placeholder="Context Value"
                      size='xs'
                      value={context.contextValue}
                      onChange={(e) =>
                        setFieldValue(
                          `odsInstanceContexts[${index}].contextValue`,
                          e.target.value
                        )
                      }
                    />

                    <Button
                      _hover={{
                        bg: 'red.700',
                        borderColor: 'red.700',
                        boxShadow: '0 0 0 3px rgba(255, 43, 43, 0.5)' 
                      }}
                      bg='red.600'
                      border='1px'
                      borderColor='red.600'
                      boxShadow='0 0 0 1px rgba(59, 130, 246, 0.3)'
                      color='white'
                      colorScheme="red"
                      fontFamily='Poppins'
                      fontSize='12px'
                      fontWeight='600'
                      lineHeight='1.2'
                      ml='8px'
                      padding='10px'
                      type='button'
                      onClick={() => {
                        const updatedContexts = values.odsInstanceContexts.filter((_, i) => i !== index)

                        setFieldValue('odsInstanceContexts', updatedContexts)
                      }}
                    >
                      Remove
                    </Button>
                  </Flex>
                ))}

                <Button
                  _hover={{
                    bg: 'blue.700',
                    borderColor: 'blue.700',
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' 
                  }}
                  bg='blue.600'
                  border='1px'
                  borderColor='blue.600'
                  boxShadow='0 0 0 1px rgba(59, 130, 246, 0.3)'
                  color='white'
                  colorScheme="blue"
                  fontFamily='Poppins'
                  fontSize='14px'
                  fontWeight='600'
                  lineHeight='1.2'
                  ml='16px'
                  padding='10px'
                  type='button'
                  onClick={() =>
                    setFieldValue('odsInstanceContexts', [
                      ...values.odsInstanceContexts,
                      {
                        contextKey: '',
                        contextValue: '' 
                      },
                    ])
                  }
                >
                  Add Context
                </Button>

                <Box mb="16px">
                  <Text
                    fontFamily='Poppins'
                    fontSize='14px'
                    fontWeight='700'
                    lineHeight='20px'
                  >ODS Instance Derivatives:                  
                  </Text>                  {values.odsInstanceDerivatives.map((derivative, index) => (
                    <Flex key={`derivative-${index}`} flexDir="column" mb="8px">
                      <Flex alignItems="center">                        <CustomSelect
                        options={[
                          {
                            text: 'ReadReplica',
                            value: 'ReadReplica' 
                          },
                          {
                            text: 'Snapshot',
                            value: 'Snapshot' 
                          },
                        ]}
                        disabled={false}
                        id={`derivative-${index}`}
                        placeholder="Select an option"
                        value={derivative.derivativeType}
                        onChange={(e) => {
                          const selectedValue = e.target.value

                          setFieldValue(
                            `odsInstanceDerivatives[${index}].derivativeType`,
                            selectedValue
                          )
                        }}
                      />

                        <Button
                        _hover={{
                          bg: 'red.700',
                          borderColor: 'red.700',
                          boxShadow: '0 0 0 3px rgba(255, 43, 43, 0.5)' 
                        }}
                        bg='red.600'
                        border='1px'
                        borderColor='red.600'
                        boxShadow='0 0 0 1px rgba(59, 130, 246, 0.3)'
                        color='white'
                        colorScheme="red"
                        fontFamily='Poppins'
                        fontSize='12px'
                        fontWeight='600'
                        lineHeight='1.2'
                        ml="8px"
                        padding='10px'
                        type='button'
                        onClick={() => {
                          const updatedDerivatives =
                              values.odsInstanceDerivatives.filter((_, i) => i !== index)

                          setFieldValue('odsInstanceDerivatives', updatedDerivatives)
                        }}
                      >
                        Remove
                      </Button>
                      </Flex>

                      {derivative.derivativeType === '' && (
                        <Text color="red.500" fontSize="xs" mt="4px">
                          Derivative Type is required
                        </Text>
                      )}
                    </Flex>

                  ))}

                  <Button
                    _hover={{
                      bg: 'blue.700',
                      borderColor: 'blue.700',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' 
                    }}
                    bg='blue.600'
                    border='1px'
                    borderColor='blue.600'
                    boxShadow='0 0 0 1px rgba(59, 130, 246, 0.3)'
                    color='white'
                    colorScheme="blue"
                    fontFamily='Poppins'
                    fontSize='14px'
                    fontWeight='600'
                    lineHeight='1.2'
                    ml='16px'
                    padding='10px'
                    type='button'
                    onClick={() => {
                      setFieldValue('odsInstanceDerivatives', [
                        ...values.odsInstanceDerivatives,
                        { derivativeType: '' },
                      ])
                    }} 
                  >
                    Add Derivative
                  </Button>
                </Box>

                <Button
                  _hover={{
                    bg: 'blue.700',
                    borderColor: 'blue.700',
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' 
                  }}
                  bg='blue.600'
                  border='1px'
                  borderColor='blue.600'
                  boxShadow='0 0 0 1px rgba(59, 130, 246, 0.3)'
                  color='white'
                  fontFamily='Poppins'
                  fontSize='14px'
                  fontWeight='600'
                  lineHeight='1.2'
                  ml='16px'
                  mt='32px'
                  padding='10px'
                  size='lg'
                  type='submit'
                  variant='solid'
                  w='250px'
                >
                  Create Instance
                </Button>
              </Form>
            </Flex>

          </>
        )}
      </Formik>
    </Flex>
  )
}

export default AddInstanceFormV2