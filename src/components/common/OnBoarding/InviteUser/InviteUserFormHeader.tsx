import {
  Button, Flex, Heading 
} from '@chakra-ui/react'

interface InviteUserFormHeaderProps {
    isSavingChanges: boolean 
    onSave: () => void
    onClose: () => void
}

const InviteUserFormHeader = ({ isSavingChanges, onSave, onClose }: InviteUserFormHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
      >Invite User
      </Heading>

      <Flex alignItems='center'>
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
        >Invite User
        </Button>
      </Flex>
    </Flex>
  )
}

export default InviteUserFormHeader