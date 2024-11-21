import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import { AppUser } from '../core/AppUser.types'
import EDXCustomModal from './common/EDXCustomModal'

interface DeactivateUserModalProps {
    user: AppUser
    show: boolean
    isDeactivatingUser: boolean  
    onDeactivateUser: (userId: string) => void
    onClose: () => void
}

const DeactivateUserModal = ({ user, isDeactivatingUser, show, onDeactivateUser, onClose }: DeactivateUserModalProps) => {
  return (
    <EDXCustomModal  
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <Text w='400px'>
          You are attempting to mark the following user as inactive:
        </Text>

        <Text 
          fontFamily='Open sans'
          fontWeight='700'
        >
          {`${user.firstName} ${user.lastName}`}
        </Text>

        <Text mt='32px'>
          They will lose access to Acme Service Center. Are you sure you want to continue?
        </Text>
      </Flex>}
      footer={<Flex
        alignItems='flex-start'
        w='full'
      >
        <Button
          border='1px'
          borderColor='gray.400'
          color='red.600'
          isDisabled={isDeactivatingUser}
          padding='10px'
          size='sm'
          onClick={onClose}
        >
          No, Cancel
        </Button>

        <Button
          bg='#dd3827'
          border='1px'
          borderColor='gray.400'
          color='white'
          isLoading={isDeactivatingUser}
          ml='10px'
          padding='10px'
          size='sm'
          onClick={() => onDeactivateUser(user.userId)}
        >
          Yes, Mark as Inactive
        </Button>
      </Flex>}
      header="Mark user as Inactive?"
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default DeactivateUserModal