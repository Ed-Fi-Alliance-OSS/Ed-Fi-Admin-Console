import { Text } from '@chakra-ui/react'

interface ODSInstanceEdFiVersionProps {
    version: string 
}

const ODSInstanceEdFiVersion = ({ version }: ODSInstanceEdFiVersionProps) => {
  return (
    <Text
      fontFamily='Open sans'
      fontWeight='400'
      size='md'>
      { version }
    </Text>
  )
}

export default ODSInstanceEdFiVersion