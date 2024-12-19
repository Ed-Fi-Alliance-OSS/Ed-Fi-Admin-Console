import {
  Button, Flex, Heading 
} from '@chakra-ui/react'

interface ManageSubscribersFormHeaderProps {
    isSavingChanges: boolean 
    onSave: () => void
    onClose: () => void
}

const ManageSubscribersFormHeader = ({ isSavingChanges, onSave, onClose }: ManageSubscribersFormHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
      >Manage Licenses
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
          isLoading={isSavingChanges}
          ml='10px'
          padding='0 25px'
          size='xs'
          variant='primaryBlue600'
          onClick={onSave}
        >Update
        </Button>
      </Flex>
    </Flex>
  )
}

export default ManageSubscribersFormHeader