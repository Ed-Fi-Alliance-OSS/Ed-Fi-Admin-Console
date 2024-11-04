import { Flex, Text } from '@chakra-ui/react'

interface OnBoardingWizardStartLeftProps {
    hasStarted: boolean
}

const OnBoardingWizardStartLeft = ({ hasStarted }: OnBoardingWizardStartLeftProps) => {
  return (
    <Flex flexDir='column' justifyContent='center' w='50%'>
      <Text
        fontFamily='Poppins'
        fontWeight='700'
        fontSize='24px'>
        {!hasStarted? 'Welcome to the Tech Console for Acme Service Center!' : 'Welcome back! Here’s where you’re at:'}
      </Text>
      {!hasStarted && 
                <Flex flexDir='column' mt='32px'>
                  <Text 
                    fontFamily='Open sans'
                    fontWeight='400'
                    fontSize='16px'>
                            In order to get started, we’ll walk you through the process for getting your Instance up and running. 
                  </Text>
                  <Text
                    fontFamily='Open sans'
                    fontWeight='400'
                    fontSize='16px'
                    mt='15px'>
                            As a first step, we’ll ask you to invite other Admin Users who you can collaborate with to complete the steps. From there, you can work collaboratively within your District or Charter School to complete the steps. We'll track your progress as you work through the setup and collect the information needed at your own pace.  
                  </Text>
                  <Text
                    fontFamily='Open sans'
                    fontWeight='400'
                    fontSize='16px'
                    mt='15px'>
                            If you prefer to prepare in advance, here’s an overview of the information you’ll need on hand to complete various steps in the process. 
                  </Text>
                </Flex>}
    </Flex>
  )
}

export default OnBoardingWizardStartLeft