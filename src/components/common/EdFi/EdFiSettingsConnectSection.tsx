import { WarningTwoIcon } from '@chakra-ui/icons'
import {
  Button, Flex, Text
} from '@chakra-ui/react'

interface EdFiSettingsConnectSectionProps {
    onConnect: () => void
}

const EdFiSettingsConnectSection = ({ onConnect }: EdFiSettingsConnectSectionProps) => {
  return (
    <Flex 
      alignItems='center' 
      bg='gray.100' 
      borderTop='2px'
      borderTopColor='gray.300'
      flexDir='column'
      justifyContent='center'
      p="32px"
      w='full'
    >
      <WarningTwoIcon fontSize='24px' />

      <Text
        fontFamily='Poppins'
        fontSize='14px'
        fontWeight='700'
        mt='6px'
      >No Connection Made
      </Text>

      <Text
        color='gray.800'
        fontFamily='Poppins'
        fontWeight='400'
        mt='6px'
      >
        Applications within Acme Service Center will not function properly until a connection has been made.
      </Text>

      <Button
        mt='12px'
        size='xs'
        variant='primaryBlue600'
        onClick={() => onConnect()}
      >
        Connect to Ed-Fi
      </Button>
    </Flex>
  )
}

export default EdFiSettingsConnectSection