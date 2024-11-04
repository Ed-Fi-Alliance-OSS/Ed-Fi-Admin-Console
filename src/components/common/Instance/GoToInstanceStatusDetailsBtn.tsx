import { Button, Flex, Text } from '@chakra-ui/react'
import { InstanceStatus } from '../../../core/Instance.types'

const selectBorderColor = (status: InstanceStatus) => {
  if (status === 'Operational')
    return 'green.400'
    
  return 'orange.400'
}

const selectTextColor = (status: InstanceStatus) => {
  if (status === 'Operational')
    return 'green.800'
    
  return 'orange.800'
}

interface GoToInstanceStatusDetailsProps {
    status: InstanceStatus
}

const GoToInstanceStatusDetails = ({ status }: GoToInstanceStatusDetailsProps) => {
  return (
    <Flex flexDir='column' alignItems='flex-end'>
      <Text
        color={selectTextColor(status)}
        borderRadius='4px'
        border='1px'
        borderColor={selectBorderColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        textAlign='center'
        padding='5px 0'
        size='sm'
        w='93px'>
        {status}
      </Text>
      <Button 
        color='gray.600'
        fontFamily='Open sans'
        fontWeight='400'
        size='sm'>
                    See Status Details
      </Button>
    </Flex>
  )
}

export default GoToInstanceStatusDetails