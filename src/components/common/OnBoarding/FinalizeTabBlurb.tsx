import { Flex, Link, Text } from '@chakra-ui/react'

const FinalizeTabBlurb = () => {
  return (
    <Flex 
      flexDir="column"
      bg='gray.100'
      borderRadius='4px'
      p='23px'
      w='full'>
      <Text
        fontFamily='Poppins'
        fontSize='20px'
        fontWeight='bold'>
                        Everything looking good?
      </Text>
      <Text 
        fontFamily='Open sans'
        fontSize='12px'
        mt='16px'>
                        If all the information above looks correct, click “Finalize” below to complete the Onboarding Wizard. Note: by clicking “Finalize”, you are granting The Texas Education Exchange (Acme Service Center) permission to access data related to users, roles, and campuses. Read our 
        <Link 
          href="https://txedexchange.net/terms-privacy"
          target="_blank"
          color='blue.500'
          fontWeight='700'
          mx='5px'>
                                Terms and Data Privacy Policy
        </Link>
                        to learn more. 
      </Text>
    </Flex>
  )
}

export default FinalizeTabBlurb