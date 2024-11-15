import { Flex, Text } from '@chakra-ui/react'

interface InstanceDescriptionFieldProps {
    title: string 
    content: string | number | JSX.Element
}

const InstanceDescriptionField = ({ title, content }: InstanceDescriptionFieldProps) => {
  return (
    <Flex flexDir='column' _notFirst={{ mt: '36px' }}>
      <Text
        color='gray.600'
        fontFamily='Open sans'
        fontWeight='400'
        size='sm'>
        {title}
      </Text>
      {typeof(content) === 'string' || typeof(content) === 'number'?
        <Text
          fontFamily='Open sans'
          fontWeight='700'
          size='lg'>
          {content}
        </Text>
        : <Flex mt='5px'>
          {content}
        </Flex> }
    </Flex>
  )
}

export default InstanceDescriptionField