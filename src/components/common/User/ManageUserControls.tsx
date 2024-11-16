import { Button, Flex } from '@chakra-ui/react'
import { AppUser, AppUserStatus } from '../../../core/AppUser.types'
import { InvitationStatus } from '../../../core/invitations/Invitation.types'
import ManageUserControlPopover from './ManageUserControlPopover'

interface ManageUserControlsProps {
    userId: string 
    user: AppUser
    status: AppUserStatus | InvitationStatus
    isDeleting: boolean
    isDeletingInvitation: boolean 
    isResendingInvitation: boolean 
    onResendInvitation: (invitationId: string) => void
    onDeleteInvitation: (invitationId: string) => void
    onActivate: (userId: string) => void
    onDeactivate: (userId: string) => void
    onEdit: () => void
    onEditInvitation: (user: AppUser) => void
    onDelete: (userId: string) => void
}

const ManageUserControls = ({ userId, user, status, isDeleting, isDeletingInvitation, isResendingInvitation, onActivate, onResendInvitation, onDeactivate, onDeleteInvitation, onEdit, onEditInvitation, onDelete }: ManageUserControlsProps) => {
  const handleSendInvitation = () => {
    return onEdit()
  }

  const getModelStatus = () => {
    return status
  }

  return (
    <Flex justifyContent='flex-end' w='full'>
      <Button 
        onClick={handleSendInvitation}
        size='xs'
        isLoading={false}
        borderRadius='4px 0px 0px 4px'
        variant='primaryBlue600'
        minW='39px'>
        'Edit'
      </Button>
      { getModelStatus() !== 'Accepted' && <ManageUserControlPopover 
        userId={userId}
        user={user}
        status={status}
        isDeletingInvitation={isDeletingInvitation}
        isDeleting={isDeleting}
        onActivate={onActivate}
        onEditInvitation={onEditInvitation}
        onDeactivate={onDeactivate}
        onDelete={onDelete}
        onDeleteInvitation={onDeleteInvitation} /> }
    </Flex>
  )
}

export default ManageUserControls