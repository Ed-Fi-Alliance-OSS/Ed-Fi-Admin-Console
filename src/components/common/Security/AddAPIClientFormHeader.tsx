import {
  Button, Flex, Heading 
} from '@chakra-ui/react'

interface AddAPIClientFormHeaderProps {
    onClose: () => void
}

const AddAPIClientFormHeader = ({ onClose }: AddAPIClientFormHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
        lineHeight='40px'
        w='50%'
      >Add API Client
      </Heading>

      <Flex alignItems='flex-start'>
        <Button
          padding='0 25px'
          size='xs'
          variant='secondaryBlue600'
          onClick={onClose}
        >Cancel
        </Button>

        <Button
          ml='10px'
          padding='0 25px'
          size='xs'
          variant='primaryBlue600'
        >Add
        </Button>
      </Flex>
    </Flex>
  )
}

export default AddAPIClientFormHeader