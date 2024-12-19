import {
  Flex, Text
} from '@chakra-ui/react'

const CompleteOnBoardingWizardMessage = () => {
  return (
    <Flex 
      alignItems='center'
      bg='gray.300'
      flexDir='column'
      justifyContent='center'
      padding='30px'
      w='full'
    >
      <Text 
        fontFamily='Poppins'
        fontWeight='400'
        size='md'
      >
        Please complete the OnBoarding Wizard
      </Text> 
    </Flex>
  )
}

export default CompleteOnBoardingWizardMessage