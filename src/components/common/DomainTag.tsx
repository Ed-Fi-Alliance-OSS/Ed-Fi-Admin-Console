import { Text } from '@chakra-ui/react'

interface DomainTagProps {
    domain: string  
}

const DomainTag = ({ domain }: DomainTagProps) => {
  return (
    <Text
      _notFirst={{ ml: '10px' }}
      alignItems='center'
      bg='gray.100'
      borderRadius='4px'
      color='gray.700'
      display='flex'
      fontFamily='Archivo Narrow'
      height='28px'
      justifyContent='center'
      padding='0 12px'
      size='md'
      textAlign='center'
    >
      {domain}
    </Text>
  )
}

export default DomainTag