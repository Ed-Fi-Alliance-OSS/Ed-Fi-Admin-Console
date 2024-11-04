import { Flex } from '@chakra-ui/react'

interface WizardContentWrapperProps {
    children: JSX.Element | JSX.Element[]
    minH?: string 
}

const WizardContentWrapper = ({ children, minH }: WizardContentWrapperProps) => {
  return (
    <Flex
      flexDir='column'
      bg='white'
      padding='32px'
      minH={ minH ?? '900px'}
      h='auto'
      w='full'>
      {children}
    </Flex>
  )
}

export default WizardContentWrapper