import { Text } from '@chakra-ui/react'

interface ODSInstanceEdFiVersionProps {
    version?: string 
}

const ODSInstanceEdFiVersion = ({ version }: ODSInstanceEdFiVersionProps) => {
  return (
    <Text
      fontFamily='Poppins'
      fontWeight='400'
      size='md'
    >
      { version }
    </Text>
  )
}

export default ODSInstanceEdFiVersion