import {
  Button, Flex 
} from '@chakra-ui/react'
import {
  AppUser, AppUserStatus 
} from '../../../core/AppUser.types'
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
    <Flex
      justifyContent='flex-end'
      w='full'
    >
      <Button 
        borderRadius='4px 0px 0px 4px'
        isLoading={false}
        minW='39px'
        size='xs'
        variant='primaryBlue600'
        onClick={handleSendInvitation}
      >
        'Edit'
      </Button>

      { getModelStatus() !== 'Accepted' && <ManageUserControlPopover 
        isDeleting={isDeleting}
        isDeletingInvitation={isDeletingInvitation}
        status={status}
        user={user}
        userId={userId}
        onActivate={onActivate}
        onDeactivate={onDeactivate}
        onDelete={onDelete}
        onDeleteInvitation={onDeleteInvitation}
        onEditInvitation={onEditInvitation}
      /> }
    </Flex>
  )
}

export default ManageUserControls