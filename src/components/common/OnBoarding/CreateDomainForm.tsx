import {
  Button, Flex, FormControl, FormLabel 
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import {
  CustomFormLabel, CustomInput 
} from '@edfi/admin-console-shared-sdk'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'

interface AddDomainFormProps {
    domainName: string
    isSaving: boolean 
    errors: FormDataErrors
    isValidData: () => boolean 
    onAddDomain: (domainName: string) => void
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void 
}

const CreateDomainForm = ({ domainName, isSaving, isValidData, errors, onAddDomain, onInputChange }: AddDomainFormProps) => {
  return (
    <FormControl>
      <Flex w='340px'>
        <FormControl w='full'>
          <FormLabel
            hidden={true}
            htmlFor="addDomain"
          >
            Domain
          </FormLabel>

          <CustomInput
            error={errors && errors['addDomain'] && errors['addDomain'].message}
            id="addDomain"
            placeholder="Example: grandbend.edu"
            value={domainName}
            onChange={onInputChange}
          />
        </FormControl>

        <Button
          alignSelf='flex-end'
          isDisabled={!isValidData()}
          isLoading={isSaving}
          minW='25px'
          ml='10px'
          paddingX='16px'
          size='xs'
          variant='primaryBlue500'
          w='auto'
          onClick={() => onAddDomain(domainName)}
        >
          Submit
        </Button>
      </Flex>
    </FormControl>
  )
}

export default CreateDomainForm