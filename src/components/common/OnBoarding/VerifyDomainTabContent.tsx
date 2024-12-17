import {
  Flex, Text
} from '@chakra-ui/react'
import {
  ChangeEvent, useState
} from 'react'
import {
  FieldError, FormDataErrors
} from '../../../core/validation/FormValidations.types'
import { DomainData } from '../../../hooks/adminActions/dns/useVerifyDomain'
import OnBoardingTabContentWrapper from './OnBoardingTabContentWrapper'
import VerifyDomainTabContentAddDNSStep from './VerifyDomainTabContentAddDNSStep'
import VerifyDomainTabContentAddDomainStep from './VerifyDomainTabContentAddDomainStep'
import VerifyDomainTabContentVerificationStep from './VerifyDomainTabContentVerificationStep'

interface VerifyDomainTabContentProps {
    domainsList: DomainData[]
    isCheckingDomainStatus: boolean 
    isAddingDomain: boolean 
    isRemovingDomain: boolean 
    onAddDomain: (domainName: string) => void
    onRemoveDomain: (domainName: string) => void
    onVerifyDomain: (domainData: DomainData) => Promise<void>
}

const VerifyDomainTabContent = ({ domainsList, isAddingDomain, isRemovingDomain, onVerifyDomain, onAddDomain, onRemoveDomain, isCheckingDomainStatus }: VerifyDomainTabContentProps) => {
  const [ domainName, setDomainName ] = useState('')
  const [ selectedDomain, setSelectedDomain ] = useState<string | null>(null)
  const [ errors, setErrors ] = useState<FormDataErrors>({})

  const validateData = (domainName: string): FieldError | null => {
    console.log('domain name lenght', domainName.length)
    let error: FieldError | null = null

    if (domainName.length === 0) {
      error = { message: 'The domain name should not be empty' }
    }
    
    if (domainName.length > 63) {
      error = { message: 'Domain should not have more than 63 characters' }
    }
            
    const regex = new RegExp(/^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/)

    if (regex.test(domainName) == false) {
      error = { message: 'Invalid domain name' }
    }

    return error
  }

  const isValidData = () => { 
    const error = validateData(domainName) 

    if (error) {
      return false
    }

    return true
  }
    
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('the value', e.target.value)

    const error = validateData(e.target.value)

    if (error) {
      setErrors({ addDomain: error })
    } else {
      delete errors['addDomain']
    }

    setDomainName(e.target.value)
  }

  const onCheckDomain = (e: ChangeEvent<HTMLInputElement>) => setSelectedDomain(e.target.value)

  const onSaveDomain = (domainName: string) => {
    onAddDomain(domainName)
    setDomainName('')
  }

  return (
    <OnBoardingTabContentWrapper>
      <Text
        fontFamily='Poppins'
        fontWeight='400'
        textAlign='justify'
        w='750px'
      >
        Your domain must be verified in order to continue. Your ESC Admin will need the information below  to add a TXT record with your domain provider to serve as proof of ownership. Once the record has been added, come back here to check for verification. This process can take up to 24 hours after the TXT record has been added. Once the domain is verified, you may move on to the next step.
      </Text>

      <Flex
        flexDir='column'
        mt='32px'
      >
        <VerifyDomainTabContentAddDomainStep
          domainName={domainName}
          errors={errors}
          isSaving={isAddingDomain}
          isValidData={isValidData}
          onAddDomain={onSaveDomain}
          onInputChange={onInputChange}
        />
      </Flex>

      <>
        { domainsList.length > 0 && 
        <Flex flexDir='column'>
          <Flex
            flexDir='column'
            mt='32px'
            w='full'
          >
            <VerifyDomainTabContentAddDNSStep />
          </Flex>

          <Flex
            flexDir='column'
            mt='32px'
            w='full'
          >
            <VerifyDomainTabContentVerificationStep 
              domainsList={domainsList}
              isCheckingDomainStatus={isCheckingDomainStatus}
              isRemovingDomain={isRemovingDomain}
              selectedDomain={selectedDomain}
              onRemoveDomain={onRemoveDomain}
              onSelectDomain={onCheckDomain}
              onVerifyDomain={onVerifyDomain}
            />
          </Flex>
        </Flex>}
      </>
      <Flex
        mt='32px'
        w='full'
      >
        {false && <Text
          color='blue.500'
          fontFamily='Poppins'
          fontWeight='700'
          size='md'
        >
          Not sure how to proceed? Get help here. 
        </Text>}
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default VerifyDomainTabContent