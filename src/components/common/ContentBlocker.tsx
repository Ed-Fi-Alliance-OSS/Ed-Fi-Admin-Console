import { Flex, useColorMode } from '@chakra-ui/react'

const ContentBlocker = () => {
  const mode = useColorMode()

  return (
    <Flex  
      bg={ mode.colorMode === 'light'? '#f6f9fb' : 'blue.800'}
      opacity='0.5' 
      position='absolute' 
      zIndex='2' 
      h='100%' 
      w='100%' />
  )
}

export default ContentBlocker