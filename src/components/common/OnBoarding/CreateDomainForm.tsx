import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { CustomFormLabel, CustomInput } from '@edfi/admin-console-shared-sdk'
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
            htmlFor="addDomain">
                            Domain
          </FormLabel>
          <CustomInput
            id="addDomain"
            error={errors && errors['addDomain'] && errors['addDomain'].message}
            placeholder="Example: grandbend.edu"
            value={domainName}
            onChange={onInputChange} />
        </FormControl>
        <Button
          onClick={() => onAddDomain(domainName)}
          isLoading={isSaving}
          isDisabled={!isValidData()}
          alignSelf='flex-end'
          variant='primaryBlue500'
          size='xs'
          paddingX='16px'
          ml='10px'
          w='auto'
          minW='25px'>
                        Submit
        </Button>
      </Flex>
    </FormControl>
  )
}

export default CreateDomainForm