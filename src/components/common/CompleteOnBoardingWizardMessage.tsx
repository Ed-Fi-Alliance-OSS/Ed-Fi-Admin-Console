import { Flex, Text } from '@chakra-ui/react'

const CompleteOnBoardingWizardMessage = () => {
  return (
    <Flex 
      bg='gray.300'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      padding='30px'
      w='full'>
      <Text 
        fontFamily='Open sans'
        fontWeight='400'
        size='md'>
                        Please complete the OnBoarding Wizard
      </Text> 
    </Flex>
  )
}

export default CompleteOnBoardingWizardMessage