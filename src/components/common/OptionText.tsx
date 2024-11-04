import { Text } from '@chakra-ui/react'

interface OptionTextProps {
    text: string
}

const OptionText = ({ text }: OptionTextProps) => {
  return (
    <Text 
      color='gray.600'
      fontFamily='Open sans'
      fontWeight='400'
      size='sm' 
      ml='10px'
      mb='2px'>{text}</Text>
  )
}

export default OptionText