import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import { InstanceStatus } from '../../../core/Instance.types'

const selectBorderColor = (status: InstanceStatus) => {
  if (status === 'Operational') {
    return 'green.400'
  }
    
  return 'orange.400'
}

const selectTextColor = (status: InstanceStatus) => {
  if (status === 'Operational') {
    return 'green.800'
  }
    
  return 'orange.800'
}

interface GoToInstanceStatusDetailsProps {
    status: InstanceStatus
}

const GoToInstanceStatusDetails = ({ status }: GoToInstanceStatusDetailsProps) => {
  return (
    <Flex
      alignItems='flex-end'
      flexDir='column'
    >
      <Text
        border='1px'
        borderColor={selectBorderColor(status)}
        borderRadius='4px'
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        padding='5px 0'
        size='sm'
        textAlign='center'
        w='93px'
      >
        {status}
      </Text>

      <Button 
        color='gray.600'
        fontFamily='Open sans'
        fontWeight='400'
        size='sm'
      >
        See Status Details
      </Button>
    </Flex>
  )
}

export default GoToInstanceStatusDetails