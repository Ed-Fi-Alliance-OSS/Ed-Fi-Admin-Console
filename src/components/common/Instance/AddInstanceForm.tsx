import {
  Button, Flex, FormControl
} from '@chakra-ui/react'
import {
  CustomFormHeader, CustomFormLabel, CustomInput, CustomSelect
} from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import { usePluginContext } from '../../../plugins/BasePlugin'

interface AddInstanceFormProps {
  name: string
  connectionString: string
  type
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSaveChanges: () => void
}


const AddInstanceForm = ({ instanceName, instanceDescription, schoolYear, schoolYearOptions, onInputChange, onSelectChange, onSaveChanges }: AddInstanceFormProps) => {
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
            htmlFor="instanceName"
            text="Instance Name"
          />

          <CustomInput
            id='instanceName'
            value={instanceName}
            onChange={onSelectChange}
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

      <Flex
        flexDir='column'
        mt='48px'
      >
        <CustomFormHeader text={getString('app.ODS_INSTANCES')} />

        <Flex
          flexDir='column'
          ml='10px'
          mt='16px'
          w='full'
        >
          <FormControl>
            <CustomFormLabel
              htmlFor='schoolYear'
              text='School Year'
            />

            <CustomSelect
              options={schoolYearOptions.map(year => ({
                value: year,
                text: year 
              }))}
              id='schoolYear'
              value={schoolYear}
              onChange={onSelectChange}
            />
          </FormControl>
        </Flex>
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