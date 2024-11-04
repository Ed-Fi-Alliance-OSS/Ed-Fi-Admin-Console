import { Flex, Text } from '@chakra-ui/react'
import { MessageType } from '../../../core/UserSync/UserSync.types'
import useLogMessage from '../../../hooks/adminActions/userSync/useLogMessage'

interface LogStatusTagProps {
    messageTypeValue: number 
}

const LogStatusTag = ({ messageTypeValue }: LogStatusTagProps) => {
  const { mapLogMessageType } = useLogMessage()
  const status: MessageType = mapLogMessageType(messageTypeValue)

  const selectBorderColor = (): string => {
    if (status === 'Warning')
      return 'orange.400'

    if (status === 'Sync Error')
      return 'orange.400'

    if (status === 'Information')
      return 'blue.400'

    return 'red.500'
  }

  const selectTextColor = (): string => {
    if (status === 'Warning')
      return 'orange.600'

    if (status === 'Sync Error')
      return 'orange.600'

    if (status === 'Information')
      return 'blue.600'

    return 'red.700'
  }

  return (
    <Flex 
      alignItems='center'
      justifyContent='center'
      border='1px'
      borderRadius='4px'
      borderColor={selectBorderColor()}
      h='auto'
      w='100px'>
      <Text
        color={selectTextColor()}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        size='md'>
        { status }
      </Text>
    </Flex>
  )
}

export default LogStatusTag