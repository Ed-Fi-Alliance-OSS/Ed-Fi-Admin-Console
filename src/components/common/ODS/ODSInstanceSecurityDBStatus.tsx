import { Text } from '@chakra-ui/react'

interface ODSInstanceSecurityDBStatusProps {
    status: string 
}

const ODSInstanceSecurityDBStatus = ({ status }: ODSInstanceSecurityDBStatusProps) => {
  return (
    <Text
      fontFamily='Open sans'
      fontWeight='400'
      size='md'>
      {status}
    </Text>
  )
}

export default ODSInstanceSecurityDBStatus