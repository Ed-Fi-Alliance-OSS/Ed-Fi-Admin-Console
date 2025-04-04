import React, { useState } from "react";
import {
  Form,
  Formik
} from 'formik'
import { Button, Flex, Input, Box, Text } from "@chakra-ui/react";
import { CustomFormHeader, CustomSelect, useApiService, useConfig } from "@edfi/admin-console-shared-sdk";
import * as Yup from 'yup'
import AppInput from "../../AppInput";


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
  const [formData, setFormData] = useState<AddInstanceFormProps>({
    name,
    instanceType,
    odsInstanceContexts,
    odsInstanceDerivatives,
    onSaveChanges
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    instanceType: Yup.string().required('Instance Type is required'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: formData.name,
          instanceType: formData.instanceType,
          odsInstanceContexts: formData.odsInstanceContexts,
          odsInstanceDerivatives: formData.odsInstanceDerivatives,
          onSaveChanges,
        }}
        onSubmit={onSaveChanges}>
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
                <Text fontFamily='Poppins'
                  fontSize='14px'
                  fontWeight='700'
                  lineHeight='20px'>ODS Instance Contexts:</Text>
                {values.odsInstanceContexts.map((context, index) => (
                  <Flex key={index} mb="8px" alignItems="center">
                    <Input
                      placeholder="Context Key"
                      value={context.contextKey}
                      onChange={(e) =>
                        setFieldValue(
                          `odsInstanceContexts[${index}].contextKey`,
                          e.target.value
                        )
                      }
                      required
                      size='xs'
                    />
                    <Input
                      placeholder="Context Value"
                      value={context.contextValue}
                      onChange={(e) =>
                        setFieldValue(
                          `odsInstanceContexts[${index}].contextValue`,
                          e.target.value
                        )
                      }
                      required
                      size='xs'
                    />
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        const updatedContexts = values.odsInstanceContexts.filter(
                          (_, i) => i !== index
                        );
                        setFieldValue("odsInstanceContexts", updatedContexts);
                      }}
                    >
                      Remove
                    </Button>
                  </Flex>
                ))}
                <Button colorScheme="blue" onClick={() =>
                  setFieldValue("odsInstanceContexts", [
                    ...values.odsInstanceContexts,
                    { contextKey: "", contextValue: "" },
                  ])
                }>
                  Add Context
                </Button>
                <Box mb="16px">
                  <Text fontFamily='Poppins'
                    fontSize='14px'
                    fontWeight='700'
                    lineHeight='20px'>ODS Instance Derivatives:</Text>
                  {values.odsInstanceDerivatives.map((derivative, index) => (
                    <Flex key={index} mb="8px" flexDir="column">
                      <Flex alignItems="center">
                        <CustomSelect
                          options={[
                            { text: "ReadReplica", value: "ReadReplica" },
                            { text: "Snapshot", value: "Snapshot" },
                          ]}
                          disabled={false}
                          id={`derivative-${index}`}
                          value={derivative.derivativeType}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            setFieldValue(
                              `odsInstanceDerivatives[${index}].derivativeType`,
                              selectedValue
                            );
                          }}
                          placeholder="Select an option"
                          size="xs"
                          required
                        />
                        <Button
                          colorScheme="red"
                          ml="8px"
                          onClick={() => {
                            const updatedDerivatives =
                              values.odsInstanceDerivatives.filter(
                                (_, i) => i !== index
                              );
                            setFieldValue("odsInstanceDerivatives", updatedDerivatives);
                          }}
                        >
                          Remove
                        </Button>
                      </Flex>
                      {derivative.derivativeType === "" && (
                        <Text color="red.500" fontSize="xs" mt="4px">
                          Derivative Type is required
                        </Text>
                      )}
                    </Flex>

                  ))}
                  <Button colorScheme="blue" onClick={() => {
                    setFieldValue("odsInstanceDerivatives", [
                      ...values.odsInstanceDerivatives,
                      { derivativeType: "" },
                    ])
                  }
                  }>
                    Add Derivative
                  </Button>
                </Box>

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
        )}
      </Formik>
    </Flex>
  );
};

export default AddInstanceFormV2;