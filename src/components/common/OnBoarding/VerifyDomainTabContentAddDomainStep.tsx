import { Flex, Text } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import CreateDomainForm from './CreateDomainForm'

interface VerifyDomainTabContentAddDomainStepProps {
    domainName: string 
    isSaving: boolean 
    errors: FormDataErrors
    isValidData: () => boolean 
    onAddDomain: (domainName: string) => void
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const VerifyDomainTabContentAddDomainStep = ({ domainName, errors, isValidData, isSaving, onAddDomain, onInputChange }: VerifyDomainTabContentAddDomainStepProps) => {
  return (
    <>
      <Flex bg='gray.100' padding='8px 16px' w='750px'>
        <Text
          display='inline-block'
          borderRadius='4px'
          fontFamily='Open sans'
          fontSize='18px'
          fontWeight='700'
          size='md'>
                        Step 1: Add a Domain
          <Text
            as="span"
            fontFamily='Open sans'
            fontWeight='400'
            fontSize='16px'
            ml='5px'>   
                                (This should be the domain associated with your district without “https://” or “www”. Just input the domain itself—for example “grandbend.edu”.) 
          </Text>
        </Text>
      </Flex>
      <Flex flexDir='column' mt='8px' w='300px'>
        <CreateDomainForm 
          domainName={domainName}
          errors={errors}
          isValidData={isValidData}
          onAddDomain={onAddDomain}
          isSaving={isSaving}
          onInputChange={onInputChange} />
      </Flex>
    </>
  )
}

export default VerifyDomainTabContentAddDomainStep