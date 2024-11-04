import { Text } from '@chakra-ui/react'

interface DomainTagProps {
    domain: string  
}

const DomainTag = ({ domain }: DomainTagProps) => {
  return (
    <Text
      display='flex'
      justifyContent='center'
      alignItems='center'
      bg='gray.100'
      color='gray.700'
      fontFamily='Archivo Narrow'
      textAlign='center'
      height='28px'
      borderRadius='4px'
      padding='0 12px'
      size='md'
      _notFirst={{ ml: '10px' }}>
      {domain}
    </Text>
  )
}

export default DomainTag