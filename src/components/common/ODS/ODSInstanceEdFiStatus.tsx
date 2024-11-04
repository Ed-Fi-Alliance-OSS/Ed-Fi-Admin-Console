import { Flex, Spinner, Text } from '@chakra-ui/react'
import { InstanceEdfiStatus } from '../../../core/ODSInstance.types'

interface ODSInstanceEdFiStatusProps {
    status: InstanceEdfiStatus | null
}

const selectBorderColor = (status: InstanceEdfiStatus) => {
  if (status.operationStatus === 'Operational' && status.onboardingStatus == 'Populated')
    return 'green.400'
    
  return 'orange.400'
}

const selectTextColor = (status: InstanceEdfiStatus) => {
  if (status.operationStatus === 'Operational' && status.onboardingStatus == 'Populated')
    return 'green.800'
    
  return 'orange.800'
}

const selectSize = (status: InstanceEdfiStatus) => {
  if (status.operationStatus === 'Operational' && status.onboardingStatus == 'Populated')
    return '150px'

  return '150px'
}

const ODSInstanceEdFiStatus = ({ status }: ODSInstanceEdFiStatusProps) => {
  return (    
    <>
      {status? <Flex 
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
          size='md'>
          { `${status.operationStatus}, ${status.onboardingStatus}` }
        </Text>
      </Flex> 
        : 
        <Flex h='32px' w='150px'>
          <Spinner 
            color='gray.500' 
            size='sm' />
        </Flex> }
    </>
  )
}

export default ODSInstanceEdFiStatus