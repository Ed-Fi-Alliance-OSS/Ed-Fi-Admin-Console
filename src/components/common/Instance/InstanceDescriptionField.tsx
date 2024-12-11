import {
  Flex, Text
} from '@chakra-ui/react'

interface InstanceDescriptionFieldProps {
    title: string 
    content: string | number | JSX.Element
}

const InstanceDescriptionField = ({ title, content }: InstanceDescriptionFieldProps) => {
  return (
    <Flex
      _notFirst={{ mt: '36px' }}
      flexDir='column'
    >
      <Text
        color='gray.600'
        fontFamily='Poppins'
        fontWeight='400'
        size='sm'
      >
        {title}
      </Text>

      {typeof(content) === 'string' || typeof(content) === 'number'?
        <Text
          fontFamily='Poppins'
          fontWeight='700'
          size='lg'
        >
          {content}
        </Text>
        : <Flex mt='5px'>
          {content}
        </Flex> }
    </Flex>
  )
}

export default InstanceDescriptionField