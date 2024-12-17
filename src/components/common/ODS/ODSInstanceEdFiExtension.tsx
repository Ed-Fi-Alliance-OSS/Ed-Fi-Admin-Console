import { Text } from '@chakra-ui/react'

interface ODSInstanceEdFiExtensionProps {
    extension: string 
}

const ODSInstanceEdFiExtension = ({ extension }: ODSInstanceEdFiExtensionProps) => {
  return (
    <Text
      fontFamily='Poppins'
      fontWeight='400'
      size='md'
    >
      {extension}
    </Text>
  )
}

export default ODSInstanceEdFiExtension