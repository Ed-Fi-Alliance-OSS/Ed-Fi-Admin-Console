import {
  Button, Flex, FormControl
} from '@chakra-ui/react'
import {
  CustomFormHeader, CustomFormLabel, CustomInput
} from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import { usePluginContext } from '../../../plugins/BasePlugin'

interface AddInstanceFormProps {
  name: string
  connectionString: string
  type: string
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSaveChanges: () => void
}


const AddInstanceForm = ({ name, type, connectionString, onInputChange, onSaveChanges }: AddInstanceFormProps) => {
  const { getString } = usePluginContext()

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <CustomFormHeader text="Instance Details" />

      <Flex
        flexDir='column'
        ml='10px'
        mt='16px'
        w='full'
      >
        <FormControl>
          <CustomFormLabel
            htmlFor="name"
            text="Instance Name"
          />

          <CustomInput
            id='name'
            value={name}
            onChange={onInputChange}
          />
        </FormControl>

        <FormControl mt='16px'>
          <CustomFormLabel
            htmlFor="type"
            text="Instance Type"
          />

          <CustomInput
            id="type"
            value={type}
            onChange={onInputChange}
          />
        </FormControl>

        <FormControl mt='16px'>
          <CustomFormLabel
            htmlFor="connectionString"
            text="Connection String"
          />

          <CustomInput
            id="connectionString"
            value={connectionString}
            onChange={onInputChange}
          />
        </FormControl>
      </Flex>

      <Button
        mt='32px'
        size='lg'
        variant='primaryBlue600'
        w='250px'
        onClick={onSaveChanges}
      >
        Create Instance
      </Button>
    </Flex>
  )
}

export default AddInstanceForm