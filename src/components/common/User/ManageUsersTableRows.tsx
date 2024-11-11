import { Flex, Text } from '@chakra-ui/react'
import { AppUser, AppUserLicense } from '../../../core/AppUser.types'
import AppUserEmail from './AppUserEmail'
import AppUserName from './AppUserName'
import AppUserRoles from './AppUserRoles'
import AppUserStatus from './AppUserStatus'
import ControlTableRow from '../ControlTableRow'
import ManageUserControls from './ManageUserControls'
import ManageUsersTableData from './ManageUsersTableData'
import { UsersTableMode } from '../../../hooks/adminActions/users/useManageUsersTable'

interface ManageUsersTableRowsProps {
    usersList: AppUser[]
    isDeleting: boolean 
    mode: UsersTableMode
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

const ManageUsersTableRows = ({ usersList, mode, isDeleting, isDeletingInvitation, isResendingInvitation, onDeleteInvitation, onResendInvitation, onActivate, onDeactivate, onEdit, onEditInvitation, onDelete }: ManageUsersTableRowsProps) => {
  const getUserAppsCount = (user: AppUser) => {
    const table = {}
    let uniqueLicensesCount = 0

    user.licenses.forEach((license) => {
      if (!table[license.applicationId] && license.tenantSubscriptionId !== null) {
        table[license.applicationId] = license.applicationId
        uniqueLicensesCount++
      }
    })

    return uniqueLicensesCount
  }

  return (
    <>
      {usersList.map((user, index) => 
        <ControlTableRow key={index}>
          <ManageUsersTableData width="120px">
            <AppUserName 
              mode={mode}
              name={user.firstName}
              userId={user.userId}
              user={user}
              onClickInvitation={onEditInvitation}
              onClick={onEdit} />
          </ManageUsersTableData>
          <ManageUsersTableData width="120px">
            <AppUserName 
              mode={mode}
              name={user.lastName}
              userId={user.userId}
              user={user}
              onClick={onEdit}
              onClickInvitation={onEditInvitation} />
          </ManageUsersTableData>
          <ManageUsersTableData width="50px">
            <AppUserStatus status={user.status} mode={mode} />
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
                { getUserAppsCount(user) }
              </Text>
            </Flex>
          </ManageUsersTableData>
          <ManageUsersTableData width="80px">
            <AppUserRoles roles={user.roles} />
          </ManageUsersTableData>
          <ManageUsersTableData width="100px">
            <Flex>
              <Text
                color='gray.500'
                fontFamily='Open sans'
                fontWeight='400'
                size='md'
                w='auto'
                whiteSpace='initial'>
                {user.source ?? 'Manual'}
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
              source={user.source}
              mode={mode}
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