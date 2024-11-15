import { Button, Flex, Heading } from '@chakra-ui/react'

interface AddAPIClientFormHeaderProps {
    onClose: () => void
}

const AddAPIClientFormHeader = ({ onClose }: AddAPIClientFormHeaderProps) => {
  return (
    <Flex justifyContent='space-between' w='full'>
      <Heading
        fontFamily='Poppins'
        fontWeight='700'
        fontSize='32px'
        lineHeight='40px'
        w='50%'>Add API Client</Heading>
      <Flex alignItems='flex-start'>
        <Button
          onClick={onClose}
          variant='secondaryBlue600'
          size='xs'
          padding='0 25px'>Cancel</Button>
        <Button
          variant='primaryBlue600'
          size='xs'
          padding='0 25px'
          ml='10px'>Add</Button>
      </Flex>
    </Flex>
  )
}

export default AddAPIClientFormHeader