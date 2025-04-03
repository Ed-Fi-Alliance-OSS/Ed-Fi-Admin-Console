import React, { useState } from "react";
import { Button, Flex, Input, Box, Text } from "@chakra-ui/react";
import { useApiService, useConfig } from "@edfi/admin-console-shared-sdk";
import { usePluginContext } from "../../../plugins/BasePlugin";


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
})=> {
  const [formData, setFormData] = useState<AddInstanceFormProps>({
    name,
    instanceType,
    odsInstanceContexts,
    odsInstanceDerivatives,
    onSaveChanges: () => {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddContext = () => {
    setFormData((prevData) => ({
      ...prevData,
      odsInstanceContexts: [
        ...prevData.odsInstanceContexts,
        { contextKey: "", contextValue: "" },
      ],
    }));
  };

  const handleContextChange = (index, field, value) => {
    const updatedContexts = [...formData.odsInstanceContexts];
    updatedContexts[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      odsInstanceContexts: updatedContexts,
    }));
  };

  const handleRemoveContext = (index) => {
    const updatedContexts = formData.odsInstanceContexts.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      odsInstanceContexts: updatedContexts,
    }));
  };

  const handleAddDerivative = () => {
    setFormData((prevData) => ({
      ...prevData,
      odsInstanceDerivatives: [
        ...prevData.odsInstanceDerivatives,
        { derivativeType: "" },
      ],
    }));
  };

  const handleDerivativeChange = (index, field, value) => {
    const updatedDerivatives = [...formData.odsInstanceDerivatives];
    updatedDerivatives[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      odsInstanceDerivatives: updatedDerivatives,
    }));
  };

  const handleRemoveDerivative = (index) => {
    const updatedDerivatives = formData.odsInstanceDerivatives.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      odsInstanceDerivatives: updatedDerivatives,
    }));
  };

  const { config } = useConfig();
  const { functionalities } = usePluginContext();
  const apiService = functionalities.ApiService?.(config, useApiService);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveChanges(formData); 
  };
  return (
    <form onSubmit={handleSubmit} className="add-instance-form">
      <Box mb="16px">
        <Text fontWeight="bold">Name:</Text>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Box>
      <Box mb="16px">
        <Text fontWeight="bold">Instance Type:</Text>
        <Input
          type="text"
          name="instanceType"
          value={formData.instanceType}
          onChange={handleChange}
        />
      </Box>

      <Box mb="16px">
        <Text fontWeight="bold">ODS Instance Contexts:</Text>
        {formData.odsInstanceContexts.map((context, index) => (
          <Flex key={index} mb="8px" alignItems="center">
            <Input
              placeholder="Context Key"
              value={context.contextKey}
              onChange={(e) =>
                handleContextChange(index, "contextKey", e.target.value)
              }
              mr="8px"
            />
            <Input
              placeholder="Context Value"
              value={context.contextValue}
              onChange={(e) =>
                handleContextChange(index, "contextValue", e.target.value)
              }
              mr="8px"
            />
            <Button
              colorScheme="red"
              onClick={() => handleRemoveContext(index)}
            >
              Remove
            </Button>
          </Flex>
        ))}
        <Button colorScheme="blue" onClick={handleAddContext}>
          Add Context
        </Button>
      </Box>

      <Box mb="16px">
        <Text fontWeight="bold">ODS Instance Derivatives:</Text>
        {formData.odsInstanceDerivatives.map((derivative, index) => (
          <Flex key={index} mb="8px" alignItems="center">
            <Input
              placeholder="Derivative Type"
              value={derivative.derivativeType}
              onChange={(e) =>
                handleDerivativeChange(index, "derivativeType", e.target.value)
              }
              mr="8px"
            />
            <Button
              colorScheme="red"
              onClick={() => handleRemoveDerivative(index)}
            >
              Remove
            </Button>
          </Flex>
        ))}
        <Button colorScheme="blue" onClick={handleAddDerivative}>
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
    </form>
  );
};

export default AddInstanceFormV2;