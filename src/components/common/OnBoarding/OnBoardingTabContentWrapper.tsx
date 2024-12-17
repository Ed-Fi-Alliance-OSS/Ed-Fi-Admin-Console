import { Flex } from '@chakra-ui/react'

interface OnBoardingTabContentWrapperProps {
    children: JSX.Element | JSX.Element[]
}

const OnBoardingTabContentWrapper = ({ children }: OnBoardingTabContentWrapperProps) => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      {children}
    </Flex>
  )
}

export default OnBoardingTabContentWrapper