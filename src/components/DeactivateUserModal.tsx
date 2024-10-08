import { Button, Flex, Text } from "@chakra-ui/react"
import { AppUser } from "../core/AppUser.types"
import EDXCustomModal from "./common/EDXCustomModal"

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
            type="alert"
            isOpen={show}
            header="Mark user as Inactive?"
            content={<Flex flexDir='column' mt='12px'>
                <Text w='400px'>
                    You are attempting to mark the following user as inactive:
                </Text>
                <Text 
                    fontWeight='700'
                    fontFamily='Open sans'>
                        {`${user.firstName} ${user.lastName}`}
                </Text>
                <Text mt='32px'>
                    They will lose access to Acme Service Center. Are you sure you want to continue?
                </Text>
            </Flex>}
            footer={<Flex alignItems='flex-start' w='full'>
                <Button
                    onClick={onClose}
                    isDisabled={isDeactivatingUser}
                    color='red.600'
                    border='1px'
                    borderColor='gray.400'
                    padding='10px'
                    size='sm'>
                        No, Cancel
                </Button>
                <Button
                    onClick={() => onDeactivateUser(user.userId)}
                    isLoading={isDeactivatingUser}
                    ml='10px'
                    border='1px'
                    color='white'
                    bg='#dd3827'
                    borderColor='gray.400'
                    padding='10px'
                    size='sm'>
                        Yes, Mark as Inactive
                </Button>
            </Flex>}
            onClose={onClose} />
    )
}

export default DeactivateUserModal