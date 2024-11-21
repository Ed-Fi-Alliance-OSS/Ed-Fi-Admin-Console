import {
  Flex, Spinner, Text 
} from '@chakra-ui/react'

interface InstanceLoadingContentProps {
    text?: string
    minH?: string 
}

const InstanceLoadingContent = ({ minH, text }: InstanceLoadingContentProps) => {
  return (
    <Flex 
      alignItems='center'
      flexDir='column' 
      h={minH ?? '200px'} 
      justifyContent='center'
      w='full'
    >
      <Spinner 
        color="blue.600" 
        size='xl'
      />

      <Text 
        fontSize='16px'
        mt='32px'
      >
        { text ?? 'Loading Instance Data...' }
      </Text>
    </Flex>
  )
}

export default InstanceLoadingContent