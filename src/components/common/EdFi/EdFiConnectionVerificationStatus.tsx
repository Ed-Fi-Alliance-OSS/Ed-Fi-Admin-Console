import { Flex, Text } from '@chakra-ui/react'
import { EdFiConnectionVerificationStatus as verificationStatus } from '../../../hooks/edfi/useEdFiConnectionForm.types'

interface EdFiConnectionStatusProps {
    status: verificationStatus
}

const selectBorderColor = (status: verificationStatus) => {
  if (status === 'Connected')
    return 'green.400'

  if (status === 'Not Connected')
    return 'gray.300'

  if (status == 'Unknown')
    return 'gray.300'
    
  return 'orange.400'
}

const selectTextColor = (status: verificationStatus) => {
  if (status === 'Connected')
    return 'green.800'

  if (status === 'Not Connected')
    return 'gray.800'

  if (status === 'Unknown')
    return 'gray.800'
        
  return 'orange.600'
}

const selectSize = (status: verificationStatus) => {
  if (status === 'Connected')
    return '93px'

  return 'auto'
}

const EdFiConnectionVerificationStatus = ({ status }: EdFiConnectionStatusProps) => {
  return (
    <Flex 
      alignItems='center'
      justifyContent='center'
      border='1px'
      borderRadius='4px'
      borderColor={selectBorderColor(status)}
      h='32px'
      w={selectSize(status)}>
      <Text
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        size='md'
        padding='10px'>
        {status}
      </Text>
    </Flex>
  )
}

export default EdFiConnectionVerificationStatus