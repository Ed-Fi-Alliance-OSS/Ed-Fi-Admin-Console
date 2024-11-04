import { Button, Flex, FormControl } from '@chakra-ui/react'
import { UserProfileContext } from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import { CustomFormLabel, CustomSelect, CustomFormHeader, CustomInput } from '@edfi/admin-console-shared-sdk'

interface InstanceDetailsFormProps {
    mode: 'edit' | 'add'
    instance?: ODSInstance
}

const getInstanceName = (tenants: any[], currentTenantId: string) => {
  const tenant = tenants.find(tenant => tenant.tenantId === currentTenantId)

  if (tenant)
    return tenant.organizationName

  return 'Instance'
}

const InstanceDetailsForm = ({ mode, instance }: InstanceDetailsFormProps) => {
  const {userProfile} = useContext(UserProfileContext)

  return (
    <Flex flexDir='column' w='full' maxW='750px'>
      <CustomFormHeader text="Instance Details" />
      <Flex flexDir='column' paddingLeft='16px' w='full'>
        <FormControl mt='16px'>
          <CustomFormLabel 
            text="Instance Name" 
            htmlFor="instanceName" />
          <CustomInput
            id='instanceName'
            disabled={true}
            value={userProfile? `${getInstanceName(userProfile.tenants, userProfile.tenantId)} ${instance?.instanceName}` : `Instance ${instance?.instanceName}`}
            onChange={() => null} />
        </FormControl>

        <FormControl mt='16px'>
          <CustomFormLabel 
            text="Description" 
            htmlFor="instanceDescription" />
          <CustomInput
            id='instanceDescription'
            disabled={true}
            value=''
            onChange={() => null} />
        </FormControl>
      </Flex>

      <Flex mt='52px' w='full'>
        <CustomFormHeader text="School Years" />
      </Flex>
      <Flex paddingLeft='16px'>
        <FormControl mt='16px'>
          <CustomFormLabel 
            text="School Year" 
            htmlFor="schoolYear" />
          <CustomSelect 
            options={[{ value: '2023', text: '2023' }]}
            value='2023'
            disabled={true}
            onChange={() => null} />
        </FormControl>
      </Flex>

      <Button 
        variant='primaryBlue600'
        size='lg'
        disabled={true}
        mt='33px'
        w={mode === 'add'? '242px' : '189px'}>
        {mode === 'add'? 'Create Instance' : 'Save Edits'}
      </Button>
    </Flex>
  )
}

export default InstanceDetailsForm