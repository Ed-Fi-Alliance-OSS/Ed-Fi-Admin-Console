import { Text } from '@chakra-ui/react'

interface OptionTextProps {
    text: string
}

const OptionText = ({ text }: OptionTextProps) => {
  return (
    <Text 
      color='gray.600'
      fontFamily='Poppins'
      fontWeight='400'
      mb='2px' 
      ml='10px'
      size='sm'
    >{text}
    </Text>
  )
}

export default OptionText