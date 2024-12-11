import { Text } from '@chakra-ui/react'

interface ODSInstanceSecurityDBStatusProps {
    status: string 
}

const ODSInstanceSecurityDBStatus = ({ status }: ODSInstanceSecurityDBStatusProps) => {
  return (
    <Text
      fontFamily='Poppins'
      fontWeight='400'
      size='md'
    >
      {status}
    </Text>
  )
}

export default ODSInstanceSecurityDBStatus