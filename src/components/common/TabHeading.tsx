import { Heading } from '@chakra-ui/react'

interface TabHeadingProps {
    text: string
}

const TabHeading = ({ text }: TabHeadingProps) => {
  return (
    <Heading
      fontFamily='Poppins'
      fontSize='32px'
      fontWeight='700'
      lineHeight='42px'
    >
      {text}
    </Heading>
  )
}

export default TabHeading