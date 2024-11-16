import { Flex, Text } from '@chakra-ui/react'
import { AppUserStatus as Status } from '../../../core/AppUser.types'

interface AppUserStatusProps {
  status: Status
}


const AppUserStatus = ({ status }: AppUserStatusProps) => {
  const selectBorderColor = (status: Status) => {
    if (status === 'Active')
      return 'green.400'
        
    return 'orange.400'
  }
    
  const selectTextColor = (status: Status) => {
    console.log('selectTextColor', status)

    if (status === 'Active')
      return 'green.800'
        
    return 'orange.800'
  }

  const selectTextStatus = () => {
    return status
  }

  return (
    <Flex 
      alignItems='center'
      justifyContent='center'
      border='1px'
      borderRadius='4px'
      borderColor={selectBorderColor(status)}
      h='32px'
      w='64px'>
      <Text
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        size='md'>
        { selectTextStatus() }
      </Text>
    </Flex>
  )
}

export default AppUserStatus