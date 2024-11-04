import { Button, Flex, Text } from '@chakra-ui/react'
import { AppUser } from '../core/AppUser.types'
import EDXCustomModal from './common/EDXCustomModal'

interface ConfirmDeleteUserModalProps {
    user: AppUser
    show: boolean 
    isDeletingUser: boolean 
    onDeleteUser: (userId: string) => void
    onClose: () => void
}

const ConfirmDeleteUserModal = ({ user, show, isDeletingUser, onDeleteUser, onClose }: ConfirmDeleteUserModalProps) => {
  return (
    <EDXCustomModal  
      type="alert"
      isOpen={show}
      header="Delete user?"
      content={<Flex flexDir='column' mt='12px'>
        <Text w='400px'>
                    You are attempting to delete the following user:
        </Text>
        <Text 
          fontWeight='700'
          fontFamily='Open sans'>
          {`${user.firstName} ${user.lastName}`}
        </Text>
        <Text mt='32px'>
                    Their account will be deleted and they will no longer have access to Acme Service Center. 
                    Are you sure you want to continue?
        </Text>
      </Flex>}
      footer={<Flex alignItems='flex-start' w='full'>
        <Button
          onClick={onClose}
          isDisabled={isDeletingUser}
          color='red.600'
          border='1px'
          borderColor='gray.400'
          padding='10px'
          size='sm'>
                        No, Cancel
        </Button>
        <Button
          onClick={() => onDeleteUser(user.userId)}
          isLoading={isDeletingUser}
          border='1px'
          color='white'
          bg='#dd3827'
          borderColor='gray.400'
          padding='10px'
          ml='10px'
          size='sm'>
                        Yes, Delete User
        </Button>
      </Flex>}
      onClose={onClose} />
  )
}

export default ConfirmDeleteUserModal