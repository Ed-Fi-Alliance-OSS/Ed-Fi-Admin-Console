import { Button, Flex, Heading } from '@chakra-ui/react'

interface InviteUserFormHeaderProps {
    isSavingChanges: boolean 
    onSave: () => void
    onClose: () => void
}

const InviteUserFormHeader = ({ isSavingChanges, onSave, onClose }: InviteUserFormHeaderProps) => {
  return (
    <Flex justifyContent='space-between' w='full'>
      <Heading
        fontFamily='Poppins'
        fontWeight='700'
        fontSize='32px'>Invite User</Heading>
      <Flex alignItems='center'>
        <Button
          onClick={onClose}
          variant='secondaryBlue600'
          size='xs'
          padding='0 25px'>Cancel</Button>
        <Button
          onClick={onSave}
          isLoading={isSavingChanges}
          variant='primaryBlue600'
          size='xs'
          padding='0 25px'
          ml='10px'>Invite User</Button>
      </Flex>
    </Flex>
  )
}

export default InviteUserFormHeader