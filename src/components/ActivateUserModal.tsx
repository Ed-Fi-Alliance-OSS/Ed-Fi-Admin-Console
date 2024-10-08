import { Button, Flex, Text } from "@chakra-ui/react"
import { AppUser } from "../core/AppUser.types"
import EDXCustomModal from "./common/EDXCustomModal"

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
            type="alert"
            isOpen={show}
            header="Mark user as active?"
            content={<Flex flexDir='column' mt='12px'>
                <Text w='400px'>
                    You are attempting to activate the following user:
                </Text>
                <Text 
                    fontWeight='700'
                    fontFamily='Open sans'>
                        {`${user.firstName} ${user.lastName}`}
                </Text>
                <Text mt='32px'>
                    They will once again have access to their existing account on Acme Service Center. 
                    Are you sure you want to continue?
                </Text>
            </Flex>}
            footer={<Flex alignItems='flex-start' w='full'>
                <Button
                    onClick={onClose}
                    isDisabled={isActivatingUser}
                    color='red.600'
                    border='1px'
                    borderColor='gray.400'
                    padding='10px'
                    size='sm'>
                        No, Cancel
                </Button>
                <Button
                    onClick={() => onActivateUser(user.userId)}
                    isLoading={isActivatingUser}
                    border='1px'
                    color='white'
                    bg='#dd3827'
                    borderColor='gray.400'
                    padding='10px'
                    ml='10px'
                    size='sm'>
                        Yes, Mark as Active
                </Button>
            </Flex>}
            onClose={onClose} />
    )
}

export default ActivateUserModal