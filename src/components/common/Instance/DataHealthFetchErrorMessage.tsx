import { Flex, Text } from '@chakra-ui/react'
import { DataHealthFetchError } from '../../../hooks/dataHealth/useDataHealthInfo'

interface DataHealthFetchErrorMessageProps {
    error: DataHealthFetchError
}

const DataHealthFetchErrorMessage = ({ error }: DataHealthFetchErrorMessageProps) => {
  return (
    <Flex 
      bg="red.100"
      borderRadius='4px'
      alignItems='center' 
      justifyContent="center"
      p='4px'
      w='full'>
      <Text
        color='red.700'
        fontSize='14px'>
        { `A ${error.errorStatus} error has been encountered. ${error.message}` }
      </Text>
    </Flex>
  )
}

export default DataHealthFetchErrorMessage