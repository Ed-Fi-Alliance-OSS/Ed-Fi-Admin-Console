import { Button, Flex, Text, FormControl } from '@chakra-ui/react'
import { Tenant } from '../../../core/Tenant.types'
import useAddDomainForm from '../../../hooks/adminActions/districtSchools/useAddDomainForm'
import { CustomFormLabel, CustomFormHeader, CompleteFormErrorMessage, CustomInput } from '@edfi/admin-console-shared-sdk'
import VerifyDomainTable from '../OnBoarding/VerifyDomainTable'
import { CloseIcon } from '@chakra-ui/icons'

interface AddDomainFormProps {
    districtData: Tenant
    onAfterSave: () => void
}

const AddDomainForm = ({ districtData, onAfterSave }: AddDomainFormProps) => {
  const { domainName, onInputChange, hasTriedSubmit, errors, isSavingChanges, onSave } = useAddDomainForm({ districtData, onAfterSave })

  return (
    <>
      <Flex ml='32px' flexDir='column' w='780px'>
        { Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage />}
        <CustomFormHeader text="Domain" />
        <Flex flexDir='column' padding='0 16px'>
          <FormControl mt='16px'>
            <CustomFormLabel
              text="Domain" 
              htmlFor="domainName"/>
            <CustomInput 
              id="domainName"
              error={errors && errors['domainName'] && errors['domainName'].message}
              value={domainName} 
              onChange={onInputChange} />
          </FormControl>
        </Flex>
        <Flex flexDir='column' mt='32px' w='full'> 
          <CustomFormHeader text="Verification" />
          <Flex mt='16px'>
            <Text
              fontFamily='Open sans'
              fontWeight='400'
              size='md'>
                                Your ESC Admin will need the information below  to add a DNS record with your domain provider to serve as proof of ownership. Once the record has been added, check the domain verification status on the “District/Charter School Settings Page”. This process can take up to 24 hours after the DNS record has been added. 
            </Text>
          </Flex>
          <Flex mt='16px'>
            <VerifyDomainTable />
          </Flex>
        </Flex>
        <Flex mt='32px' w='full'>
          <Button
            onClick={onSave}
            isLoading={isSavingChanges}
            variant='primaryBlue600'
            size='lg'
            w='210px'>
                            Add
          </Button>
        </Flex>
      </Flex>
      <Flex>
        <Button
          onClick={onAfterSave}
          aria-labelledby="close-btn"
          size='xs'
          minW='50px'>
          <span id="close-btn" hidden>Close</span>
          <CloseIcon aria-hidden="true" focusable="false" />
        </Button>
      </Flex>
    </>
  )
}

export default AddDomainForm