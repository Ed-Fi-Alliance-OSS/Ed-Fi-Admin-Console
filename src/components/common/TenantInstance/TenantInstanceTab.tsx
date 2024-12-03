import {
  Button,
  Flex, FormControl
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomInput
} from '@edfi/admin-console-shared-sdk'
import { useState } from 'react'
import isUrl from 'validator/es/lib/isURL'
import useFormValidationErrors from '../../../hooks/validations/useFormValidationErrors'

export function TenantInstanceForm() {
  const { errors, handleAllErrors, handleSingleError } = useFormValidationErrors()
  const [ tenantInstanceData, setTenantInstanceData ] = useState({ edfiApiDiscoveryUrl: '' })

  function onSave() {
    console.log('the data is saving')
    console.log(tenantInstanceData)
  }

  function onInputChange(val) {
    if(!isUrl) {
      handleSingleError({
        field: 'edfiApiDiscoveryUrl',
        error: { message: 'Please enter a valid URL' } 
      })
    }

    setTenantInstanceData({ edfiApiDiscoveryUrl: val.target.value })
  }

  return (
    <Flex
      flexDir="column"
      w="full"
    >
      <FormControl>
        <CustomFormLabel 
          htmlFor='edfiApiDiscoveryUrl' 
          text='Edfi Api Discovery URL'
        />

        <CustomInput 
          error={errors && errors['edfiApiDiscoveryUrl'] && errors['edfiApiDiscoveryUrl'].message}
          id='edfiApiDiscoveryUrl'
          value={tenantInstanceData.edfiApiDiscoveryUrl}
          onChange={onInputChange}
        />
      </FormControl>

      <Button
        maxW='200px'
        minW='150px'
        mt='32px'
        size='lg'
        variant='primaryBlue600'
        onClick={onSave}
      >
        Save
      </Button>
    </Flex>
  )
}

export function TenantInstanceTab() {
  const [ isSaving, setIsSaving ] = useState(false)

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <TenantInstanceForm />
    </Flex>
  )
}

export default TenantInstanceTab