import {
  Flex, Text
} from '@chakra-ui/react'
import OnBoardingTabContentWrapper from './OnBoardingTabContentWrapper'
import SelectSSOMethodTable from './SelectSSOMethodTable'

const SelectSSOMethodTabContent = () => {
  return (
    <OnBoardingTabContentWrapper>
      <Text
        fontFamily='Poppins'
        fontWeight='400'
        textAlign='justify'
        w='730px'
      >
        Select the methods you’d like to allow users within your District/Charter School to use to use when logging in. Some configuration for the methods you select below will need to be completed outside of the Tech Console. Once those processes are complete, the “Consent Status” will update and you’ll be able to proceed. 
      </Text>

      <Flex
        mt='32px'
        w='full'
      >
        <SelectSSOMethodTable showSelect={true} />
      </Flex>

      <Flex
        justifyContent='space-between'
        mt='32px'
        w='full'
      >
        {false && <Text
          color='blue.500'
          fontFamily='Poppins'
          fontWeight='700'
          size='md'
        >
          Not seeing what you were expecting? Get help here.
        </Text>}
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default SelectSSOMethodTabContent