import { Button, Flex, Text } from '@chakra-ui/react'
import { EdOrgViewItem } from '../../../hooks/adminActions/users/useUserEducationOrganizations.types'
import EDXCustomModal from '../EDXCustomModal'

interface ConfirmDeleteUserModalProps {
    show: boolean 
    edOrg: EdOrgViewItem
    isDeletingEdOrg: boolean 
    onDeleteEdOrg: (edOrgId: string, staffClassification: string) => void
    onClose: () => void
}

const ConfirmDeleteEdOrgModal = ({ edOrg, show, isDeletingEdOrg, onDeleteEdOrg, onClose }: ConfirmDeleteUserModalProps) => {
  return (
    <EDXCustomModal  
      type="alert"
      isOpen={show}
      header="Delete this Organization"
      content={<Flex flexDir='column' mt='12px'>
        <Text>
                    Are you sure you want to remove this user’s access to this organization? Editing this user’s role within the organization may affect which applications they have access to and their level of access within the organization.
        </Text>
      </Flex>}
      footer={<Flex alignItems='flex-start' w='full'>
        <Button
          onClick={onClose}
          isDisabled={isDeletingEdOrg}
          color='red.600'
          border='1px'
          borderColor='gray.400'
          padding='10px'
          size='sm'>
                        No, Cancel
        </Button>
        <Button
          onClick={() => onDeleteEdOrg(edOrg.educationOrganizationId.toString(), edOrg.staffClassification)}
          isLoading={isDeletingEdOrg}
          border='1px'
          color='white'
          bg='#dd3827'
          borderColor='gray.400'
          padding='10px'
          ml='10px'
          size='sm'>
                        Yes, Delete
        </Button>
      </Flex>}
      onClose={onClose} />
  )
}

export default ConfirmDeleteEdOrgModal