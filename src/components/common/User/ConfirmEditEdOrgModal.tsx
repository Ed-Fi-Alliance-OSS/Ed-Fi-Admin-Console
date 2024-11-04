import { Button, Flex, Text } from '@chakra-ui/react'
import { EdOrgViewItem } from '../../../hooks/adminActions/users/useUserEducationOrganizations.types'
import EDXCustomModal from '../EDXCustomModal'

interface ConfirmDeleteUserModalProps {
    show: boolean 
    edOrg: EdOrgViewItem
    isSavingEdOrg: boolean 
    onEditEdOrg: (edOrgId: string) => void
    onClose: () => void
}

const ConfirmEditEdOrgModal = ({ edOrg, show, isSavingEdOrg, onEditEdOrg, onClose }: ConfirmDeleteUserModalProps) => {
  return (
    <EDXCustomModal  
      type="alert"
      isOpen={show}
      header="Apply Changes?"
      content={<Flex flexDir='column' mt='12px'>
        <Text>
                    Are you sure you want to apply the changes? Editing this user’s role within the organization may affect which applications they have access to and their level of access within the organization.
        </Text>
      </Flex>}
      footer={<Flex alignItems='flex-start' w='full'>
        <Button
          onClick={onClose}
          isDisabled={isSavingEdOrg}
          color='red.600'
          border='1px'
          borderColor='gray.400'
          padding='10px'
          size='sm'>
                        No, Cancel
        </Button>
        <Button
          onClick={() => onEditEdOrg(edOrg.educationOrganizationId.toString())}
          isLoading={isSavingEdOrg}
          border='1px'
          color='white'
          bg='#dd3827'
          borderColor='gray.400'
          padding='10px'
          ml='10px'
          size='sm'>
                        Yes, Continue
        </Button>
      </Flex>}
      onClose={onClose} />
  )
}

export default ConfirmEditEdOrgModal