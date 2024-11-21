import { Flex } from '@chakra-ui/react'

interface WizardContentWrapperProps {
    children: JSX.Element | JSX.Element[]
    minH?: string 
}

const WizardContentWrapper = ({ children, minH }: WizardContentWrapperProps) => {
  return (
    <Flex
      bg='white'
      flexDir='column'
      h='auto'
      minH={minH ?? '900px'}
      padding='32px'
      w='full'
    >
      {children}
    </Flex>
  )
}

export default WizardContentWrapper