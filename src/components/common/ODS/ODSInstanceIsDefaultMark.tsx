import { CheckCircleIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'

interface ODSInstanceIsDefaultMarkProps {
    isDefault: boolean 
    w?: string 
}

const ODSInstanceIsDefaultMark = ({ isDefault, w }: ODSInstanceIsDefaultMarkProps) => {
  return (
    <Flex
      justifyContent='center'
      w={w? w : 'full'}
    >
      { isDefault && <CheckCircleIcon 
        color='blue.600'
        fontSize='20px'
      /> }
    </Flex>
  )
}

export default ODSInstanceIsDefaultMark