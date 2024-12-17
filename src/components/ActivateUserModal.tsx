import {
  Button, Flex, Text
} from '@chakra-ui/react'
import { AppUser } from '../core/AppUser.types'
import EDXCustomModal from './common/EDXCustomModal'

interface DeactivateUserModalProps {
    user: AppUser
    show: boolean 
    isActivatingUser: boolean 
    onActivateUser: (userId: string) => void
    onClose: () => void
}

const ActivateUserModal = ({ user, isActivatingUser, show, onActivateUser, onClose }: DeactivateUserModalProps) => {
  return (
    <EDXCustomModal  
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <Text w='400px'>
          You are attempting to activate the following user:
        </Text>

        <Text 
          fontFamily='Poppins'
          fontWeight='700'
        >
          {`${user.firstName} ${user.lastName}`}
        </Text>

        <Text mt='32px'>
          They will once again have access to their existing account on Acme Service Center. 
          Are you sure you want to continue?
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
          isDisabled={isActivatingUser}
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
          isLoading={isActivatingUser}
          ml='10px'
          padding='10px'
          size='sm'
          onClick={() => onActivateUser(user.userId)}
        >
          Yes, Mark as Active
        </Button>
      </Flex>}
      header="Mark user as active?"
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default ActivateUserModal