import { Flex, Text } from '@chakra-ui/react'
import { AppUser } from '../../../core/AppUser.types'
import ControlTableRow from '../ControlTableRow'
import AppUserEmail from './AppUserEmail'
import AppUserName from './AppUserName'
import AppUserStatus from './AppUserStatus'
import ManageUserControls from './ManageUserControls'
import ManageUsersTableData from './ManageUsersTableData'

interface ManageUsersTableRowsProps {
    usersList: AppUser[]
    isDeleting: boolean 
    isDeletingInvitation: boolean 
    isResendingInvitation: boolean 
    onResendInvitation: (invitationId: string) => void
    onDeleteInvitation: (invitationId: string) => void
    onActivate: (userId: string) => void
    onDeactivate: (userId: string) => void
    onDelete: (userId: string) => void
    onEdit: (userId: string) => void
    onEditInvitation: (user: AppUser) => void
}

const ManageUsersTableRows = ({ usersList, isDeleting, isDeletingInvitation, isResendingInvitation, onDeleteInvitation, onResendInvitation, onActivate, onDeactivate, onEdit, onEditInvitation, onDelete }: ManageUsersTableRowsProps) => {
  

  return (
    <>
      {usersList.map((user, index) => 
        <ControlTableRow key={index}>
          <ManageUsersTableData width="120px">
            <AppUserName 
              name={user.firstName}
              userId={user.userId}
              user={user}
              onClickInvitation={onEditInvitation}
              onClick={onEdit} />
          </ManageUsersTableData>
          <ManageUsersTableData width="120px">
            <AppUserName 
              name={user.lastName}
              userId={user.userId}
              user={user}
              onClick={onEdit}
              onClickInvitation={onEditInvitation} />
          </ManageUsersTableData>
          <ManageUsersTableData width="50px">
            <AppUserStatus status={user.status} />
          </ManageUsersTableData>
          <ManageUsersTableData width="220px">
            <AppUserEmail email={user.email} />
          </ManageUsersTableData>
          <ManageUsersTableData width="100px">
            <Flex>
              <Text
                fontFamily='Open sans'
                fontWeight='400'
                size='md'
                w='auto'
                whiteSpace='initial'>
                1
              </Text>
            </Flex>
          </ManageUsersTableData>
          <ManageUsersTableData width="50px">
            <Text 
              color='gray.500'
              fontFamily='Open sans'
              fontWeight='400'
              size='md'
              whiteSpace='initial'>
              {user.updated}
            </Text> 
          </ManageUsersTableData>
          <ManageUsersTableData width="50px">
            <ManageUserControls 
              userId={user.userId}
              user={user}
              status={user.status}
              isDeletingInvitation={isDeletingInvitation}
              isResendingInvitation={isResendingInvitation}
              isDeleting={isDeleting}
              onDeleteInvitation={onDeleteInvitation}
              onResendInvitation={onResendInvitation}
              onActivate={onActivate}
              onDeactivate={onDeactivate}
              onDelete={onDelete}
              onEdit={() => onEdit(user.userId)}
              onEditInvitation={onEditInvitation} />
          </ManageUsersTableData>
        </ControlTableRow>
      )}
    </>
  )
}

export default ManageUsersTableRows