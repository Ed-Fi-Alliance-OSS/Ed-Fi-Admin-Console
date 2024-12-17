import {
  Flex, useColorMode 
} from '@chakra-ui/react'

const ContentBlocker = () => {
  const mode = useColorMode()

  return (
    <Flex  
      bg={mode.colorMode === 'light'? '#f6f9fb' : 'blue.800'}
      h='100%' 
      opacity='0.5' 
      position='absolute' 
      w='100%' 
      zIndex='2'
    />
  )
}

export default ContentBlocker