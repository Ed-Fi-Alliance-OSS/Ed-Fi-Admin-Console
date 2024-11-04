import { Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { DomainStatus } from '../../../core/Tenant.types'

interface DomainVerificationStatusProps {
    status: DomainStatus
    domainName?: string
    showDeleteOption?: boolean 
    isRemovingDomain?: boolean
    onRemoveDomain?: (domainName: string) => void
}

const selectBorderColor = (status: DomainStatus) => {
  if (status === 'Unknown')
    return 'gray.500'

  if (status === 'Verified')
    return 'green.400'

  if (status === 'Rejected')
    return 'red.400'

  return 'orange.400'
}

const selectTextColor = (status: DomainStatus) => {
  if (status === 'Unknown')
    return 'gray.700'

  if (status === 'Verified')
    return 'green.800'

  if (status === 'Rejected')
    return 'orange.800'

  return 'orange.800'
}

const DomainVerificationStatus = ({ domainName, status, showDeleteOption, isRemovingDomain, onRemoveDomain }: DomainVerificationStatusProps) => {
  return (
    <Flex 
      alignItems='center'
      justifyContent='center'
      border='1px'
      borderRadius='4px'
      borderColor={selectBorderColor(status)}
      padding='0px 8px'
      h={showDeleteOption? '28px' : '34px'}
      w='auto'>
      <Text
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        size='sm'>
        {status}
      </Text>
      {showDeleteOption && onRemoveDomain && domainName &&
                    <Flex
                      minW='auto'>
                      {isRemovingDomain? 
                        <Spinner color={selectTextColor(status)} size='sm' ml='6px' />
                        : 
                        <Button  
                          onClick={() => onRemoveDomain(domainName)}
                          color={selectTextColor(status)}
                          ml='6px' 
                          fontSize='10px'
                          minW='auto'
                          aria-label={`remove ${domainName}`}>X</Button>}
                    </Flex>}
    </Flex>
  )
}

export default DomainVerificationStatus