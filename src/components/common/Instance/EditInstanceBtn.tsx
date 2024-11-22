import { EditIcon } from '@chakra-ui/icons'
import {
  Button, Text 
} from '@chakra-ui/react'

interface EditInstanceBtnProps {
    onClick: () => void
}

const EditInstanceBtn = ({ onClick }: EditInstanceBtnProps) => {
  return (
    <Button 
      alignItems='center'
      color='blue.600'
      display='flex' 
      maxW='auto' 
      minW='auto' 
      padding='0'
      w='170px'
      onClick={onClick}
    >
      <EditIcon
        aria-hidden="true"
        color='blue.600'
        focusable="false"
        fontSize='15px'
      />

      <Text
        color='blue.600'
        fontFamily='Open sans'
        fontWeight='400'
        ml='5px'
        size='md'
      >Edit Instance Details
      </Text>
    </Button>
  )
}

export default EditInstanceBtn