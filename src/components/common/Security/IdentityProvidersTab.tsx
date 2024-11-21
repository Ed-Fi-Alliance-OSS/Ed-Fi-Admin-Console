import {
  Flex, Text 
} from '@chakra-ui/react'
import { CustomSwitch } from '@edfi/admin-console-shared-sdk'

const identityOptions = [
  'Acme Service Center',
  'Classlink',
  'Clever',
  'Microsoft',
  'Google'
]

const IdentityProvidersTab = () => {
  return (
    <Flex 
      flexDir='column' 
      w='424px'
    >
      {identityOptions.map((option, index) => 
        <Flex 
          key={index}
          _notFirst={{ mt: '15px' }}
          alignItems='center'
          border='1px'
          borderColor='gray.300'
          borderRadius='4px'
          padding='8px 10px'
          w='full'
        >
          <CustomSwitch
            isChecked
            id="identityProvider"
          />

          <Text
            color='blue.600'
            fontFamily='Open sans'
            fontWeight='700'
            ml='15px'
            size='sm'
          >
            {option}
          </Text>
        </Flex>)}
    </Flex>
  )
}

export default IdentityProvidersTab