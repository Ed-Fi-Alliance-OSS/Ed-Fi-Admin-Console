import {
  Button,
  Flex, FormControl,
  Spinner
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomInput
} from '@edfi/admin-console-shared-sdk'
import {
  useEffect, useState
} from 'react'
import isUrl from 'validator/es/lib/isURL'
import useEDXToast from '../../../hooks/common/useEDXToast'
import useFormValidationErrors from '../../../hooks/validations/useFormValidationErrors'
import useTenantService from '../../../services/AdminActions/Tenant/TenantService'

export function TenantInstanceForm() {
  const { errors, handleAllErrors, handleSingleError } = useFormValidationErrors()
  const [ tenantInstanceData, setTenantInstanceData ] = useState({ edfiApiDiscoveryUrl: '' })
  const { getTenant, updateTenant } = useTenantService()
  const [ loading, setLoading ] = useState(false)
  const { successToast } = useEDXToast(1000)
  const TenantId = '1'

  useEffect(() => {
    setLoading(true)
    getTenant(TenantId).then((tenant) => {
      setLoading(false)
      setTenantInstanceData({ edfiApiDiscoveryUrl: tenant.document.edfiApiDiscoveryUrl })
    })
  }, [])

  function onSave() {
    console.log('the data is saving')
    console.log(tenantInstanceData)
    setLoading(true)
    updateTenant(TenantId, {
      document: { edfiApiDiscoveryUrl: tenantInstanceData.edfiApiDiscoveryUrl ?? '' },
      tenantId: TenantId
    }).then(() => {
      setLoading(false)
      successToast('Tenant Instance updated successfully')
    })
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
      {loading && <Spinner />}

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