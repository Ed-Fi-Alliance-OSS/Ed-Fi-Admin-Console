import { Button, Flex } from '@chakra-ui/react'
import { AppUser, AppUserSource, AppUserStatus } from '../../../core/AppUser.types'
import { InvitationStatus } from '../../../core/invitations/Invitation.types'
import { UsersTableMode } from '../../../hooks/adminActions/users/useManageUsersTable'
import ManageUserControlPopover from './ManageUserControlPopover'

interface ManageUserControlsProps {
    userId: string 
    source: AppUserSource | null
    user: AppUser
    status: AppUserStatus | InvitationStatus
    isDeleting: boolean
    isDeletingInvitation: boolean 
    isResendingInvitation: boolean 
    mode: UsersTableMode
    onResendInvitation: (invitationId: string) => void
    onDeleteInvitation: (invitationId: string) => void
    onActivate: (userId: string) => void
    onDeactivate: (userId: string) => void
    onEdit: () => void
    onEditInvitation: (user: AppUser) => void
    onDelete: (userId: string) => void
}

const ManageUserControls = ({ userId, user, source, status, mode, isDeleting, isDeletingInvitation, isResendingInvitation, onActivate, onResendInvitation, onDeactivate, onDeleteInvitation, onEdit, onEditInvitation, onDelete }: ManageUserControlsProps) => {
  const handleSendInvitation = () => {
    if (mode === 'users')
      return onEdit()

    return onResendInvitation(userId)
  }

  const getModelStatus = () => {
    if (mode === 'users')
      return status

    if (status === 'Inactive')
      return 'Invited'

    if (status === 'Active')
      return 'Accepted'
  }

  return (
    <Flex justifyContent='flex-end' w='full'>
      { mode === 'users' && <Button 
        onClick={handleSendInvitation}
        size='xs'
        isLoading={mode === 'users'? false : isResendingInvitation}
        borderRadius='4px 0px 0px 4px'
        variant='primaryBlue600'
        minW='39px'>
        { mode === 'users'? 'Edit' : 'Resend' }
      </Button> }
      { mode === 'invitations' && status === 'Inactive' && <Button
        onClick={handleSendInvitation}
        size='xs'
        borderRadius={'4px 0px 0px 4px'}
        variant='primaryBlue600'
        minW='39px'>
                    Resend Invitation
      </Button> }
      { getModelStatus() !== 'Accepted' && <ManageUserControlPopover 
        userId={userId}
        user={user}
        mode={mode}
        source={source}
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