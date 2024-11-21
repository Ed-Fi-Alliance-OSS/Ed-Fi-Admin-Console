import {
  Button, Flex, Heading 
} from '@chakra-ui/react'

interface EditAppUserFormHeaderProps {
    isSaving: boolean 
    isActionDisabled: boolean 
    onSave: () => void
    onClose: () => void
}

const EditAppUserFormHeader = ({ isSaving, isActionDisabled, onSave, onClose }: EditAppUserFormHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
      >Edit User
      </Heading>

      <Flex alignItems='flex-end'>
        <Button
          padding='0 25px'
          size='xs'
          variant='secondaryBlue600'
          onClick={onClose}
        >Cancel
        </Button>

        <Button
          isDisabled={isActionDisabled}
          isLoading={isSaving}
          ml='10px'
          padding='0 25px'
          size='xs'
          variant='primaryBlue600'
          onClick={onSave}
        >Update User
        </Button>
      </Flex>
    </Flex>
  )
}

export default EditAppUserFormHeader