import { CloseIcon } from '@chakra-ui/icons'
import {
  Button, Flex,
  FormControl,
  Text
} from '@chakra-ui/react'
import {
  CompleteFormErrorMessage,
  CustomFormHeader,
  CustomFormLabel,
  CustomInput
} from '@edfi/admin-console-shared-sdk'
import { Tenant } from '../../../core/Tenant.types'
import useAddDomainForm from '../../../hooks/adminActions/districtSchools/useAddDomainForm'
import VerifyDomainTable from '../OnBoarding/VerifyDomainTable'

interface AddDomainFormProps {
    districtData: Tenant
    onAfterSave: () => void
}

const AddDomainForm = ({ districtData, onAfterSave }: AddDomainFormProps) => {
  const { domainName, onInputChange, hasTriedSubmit, errors, isSavingChanges, onSave } = useAddDomainForm({
    districtData,
    onAfterSave 
  })

  return (
    <>
      <Flex
        flexDir='column'
        ml='32px'
        w='780px'
      >
        { Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage />}

        <CustomFormHeader text="Domain" />

        <Flex
          flexDir='column'
          padding='0 16px'
        >
          <FormControl mt='16px'>
            <CustomFormLabel
              htmlFor="domainName" 
              text="Domain"
            />

            <CustomInput 
              error={errors && errors['domainName'] && errors['domainName'].message}
              id="domainName"
              value={domainName} 
              onChange={onInputChange}
            />
          </FormControl>
        </Flex>

        <Flex
          flexDir='column'
          mt='32px'
          w='full'
        > 
          <CustomFormHeader text="Verification" />

          <Flex mt='16px'>
            <Text
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              Your ESC Admin will need the information below  to add a DNS record with your domain provider to serve as proof of ownership. Once the record has been added, check the domain verification status on the “District/Charter School Settings Page”. This process can take up to 24 hours after the DNS record has been added. 
            </Text>
          </Flex>

          <Flex mt='16px'>
            <VerifyDomainTable />
          </Flex>
        </Flex>

        <Flex
          mt='32px'
          w='full'
        >
          <Button
            isLoading={isSavingChanges}
            size='lg'
            variant='primaryBlue600'
            w='210px'
            onClick={onSave}
          >
            Add
          </Button>
        </Flex>
      </Flex>

      <Flex>
        <Button
          aria-labelledby="close-btn"
          minW='50px'
          size='xs'
          onClick={onAfterSave}
        >
          <span
            hidden
            id="close-btn"
          >Close
          </span>

          <CloseIcon
            aria-hidden="true"
            focusable="false"
          />
        </Button>
      </Flex>
    </>
  )
}

export default AddDomainForm