import { Button, Flex, FormControl } from '@chakra-ui/react'
import { CustomFormHeader, CustomFormLabel, CustomInput, CustomSelect, UserProfileContext, useTenantSelectPopover } from '@edfi/admin-console-shared-sdk'
import { ChangeEvent, useContext } from 'react'
import { usePluginContext } from '../../../plugins/BasePlugin'
interface AddInstanceFormProps {
  instanceName: string
  instanceDescription: string
  schoolYear: string
  schoolYearOptions: string[]
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void
  onSaveChanges: () => void
}


const AddInstanceForm = ({ instanceName, instanceDescription, schoolYear, schoolYearOptions, onInputChange, onSelectChange, onSaveChanges }: AddInstanceFormProps) => {
  const { getString } = usePluginContext()
  const { userProfile } = useContext(UserProfileContext)
  const {topItemsList} = useTenantSelectPopover({
    onChangeTenantId: () => { },
    userProfile: userProfile,
  })

  return (
    <Flex flexDir='column' w='full'>
      <CustomFormHeader text="Instance Details" />
      <Flex flexDir='column' mt='16px' ml='10px' w='full'>
        <FormControl>
          <CustomFormLabel
            text="Instance Name"
            htmlFor="instanceName" />
          <CustomSelect
            id='instanceName'
            value={instanceName}
            // pass tenants here
            options={topItemsList.map(tenant => ({ value: tenant.organizationIdentifier, text: tenant.organizationName }))}
            onChange={onSelectChange} />
        </FormControl>
        <FormControl mt='16px'>
          <CustomFormLabel
            text="Description"
            htmlFor="instanceDescription" />
          <CustomInput
            id="instanceDescription"
            value={instanceDescription}
            onChange={onInputChange} />
        </FormControl>
      </Flex>

      <Flex flexDir='column' mt='48px'>
        <CustomFormHeader text={getString('app.ODS_INSTANCES')} />
        <Flex flexDir='column' mt='16px' ml='10px' w='full'>
          <FormControl>
            <CustomFormLabel
              text='School Year'
              htmlFor='schoolYear' />
            <CustomSelect
              id='schoolYear'
              value={schoolYear}
              options={schoolYearOptions.map(year => ({ value: year, text: year }))}
              onChange={onSelectChange} />
          </FormControl>
        </Flex>
      </Flex>
      <Button
        onClick={onSaveChanges}
        mt='32px'
        variant='primaryBlue600'
        size='lg'
        w='250px'>
        Create Instance
      </Button>
    </Flex>
  )
}

export default AddInstanceForm