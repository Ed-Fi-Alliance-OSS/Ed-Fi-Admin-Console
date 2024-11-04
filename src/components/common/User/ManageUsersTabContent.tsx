import { useState, ChangeEvent, useContext } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { TablePagination, UserProfileContext } from '@edfi/admin-console-shared-sdk'
import AddAppUserForm from './AddAppUserForm'
import ConsoleModal from '../ConsoleModal'
import EditAppUserForm from './EditAppUserForm'
import ManageUsersTabHeader from './ManageUsersTabHeader'
import ManageUsersTable from './ManageUsersTable'
import ManageUsersTableRows from './ManageUsersTableRows'
import BulkEditModal from './BulkEditRoleModal'
import ControlTableHeader from '../ControlTableHeader'
import { AppUser } from '../../../core/AppUser.types'
import useManageUsersTable from '../../../hooks/adminActions/users/useManageUsersTable'
import useUserService from '../../../services/AdminActions/Users/UsersService'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { ActivateUserRequest, AssignLicenseRequest, DeactivateUserRequest, DeleteInvitationRequest, DeleteUserRequest, InviteUserRequest } from '../../../services/AdminActions/Users/UsersService.requests'
import useEDXToast from '../../../hooks/common/useEDXToast'
import DeactivateUserModal from '../../DeactivateUserModal'
import ActivateUserModal from '../../ActivateUserModal'
import ConfirmDeleteUserModal from '../../ConfirmDeleteUserModal'
import useSubscriptionsService from '../../../services/AdminActions/Subscriptions/SubscriptionsService'
import EditInvitationForm from './EditInvitationForm'

const initialSelectedUser: AppUser = {
  userName: '',
  firstName: '',
  lastName: '',
  userId: '',
  status: 'Unknown',
  email: '',
  roles: [],
  licenses: [],
  source: null,
  updated: ''
}

const ManageUsersTabContent = () => {
  const adminConfig = useContext(adminConsoleContext)
  const { userProfile } = useContext(UserProfileContext)
  const { 
    paginatedData, 
    invitationsList,
    isFetchingData, 
    orderBy, 
    mode,
    onChangeMode,
    filterOptionsList,
    filterBy, 
    onChangeFilterValue,
    onFilter,
    onResetFilter,
    onSelectFilter,
    onRefreshUserList, 
    onSortAsc, 
    onSortDesc,
    maxPerPage,
    minPerPage,
    totalPages,
    onDecrementPageSize,
    onIncrementPageSize,
    onChangePageSize,
    goToInitialPage,
    goToNextPage,
    goToPreviousPage,
    gotToLastPage,
    canNextPage,
    canPreviousPage } = useManageUsersTable()

  const [selectedUser, setSelectedUser] = useState<AppUser>({...initialSelectedUser})
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const [showBulkEditRoleModal, setShowBulkEditRoleModal] = useState(false)
  const { successToast, errorToast } = useEDXToast()
  const { deleteUser, activateUser, deactivateUser, deleteInvitation, inviteUser } = useUserService()
  const { getSubscriptionsList } = useSubscriptionsService()

  const [isDeletingInvitation, setIsDeletingInvitation] = useState(false)
  const [isResendingInvitation, setIsResendingInvitation] = useState(false)

  const [isDeletingUser, setIsDeletingUser] = useState(false)
  const [showConfirmDeleteUserModal, setShowConfirmDeleteUserModal] = useState(false)

  const [isActivatingUser, setIsActivatingUser] = useState(false)
  const [showActivateUserModal, setShowActivateUserModal] = useState(false)

  const [isDeactivatingUser, setIsDeactivatingUser] = useState(false)
  const [showDeactivateUserModal, setShowDeactivateUserModal] = useState(false)

  // Invitations
  const [selectedInvitation, setSelectedInvitation] = useState<AppUser>({...initialSelectedUser})
  const [showEditInvitationModal, setShowEditInvitationModal] = useState(false)

  const handleDeleteUser = async (userId: string) => {
    if (adminConfig) {
      const data: DeleteUserRequest = { userId }

      setIsDeletingUser(true)
      const result = await deleteUser(adminConfig.actionParams, data)
      setIsDeletingUser(false)

      handleCloseConfirmDeleteUserModal()

      if (result.type === 'Response') {
        await onRefreshUserList()
        return successToast('Removed user.')
      }

      errorToast(`Failed to delete user, ${result.statusCode}`)
    }
  }

  const handleResendInvitation = async (invitationId: string) => {
    if (adminConfig) {
      const subscriptionsListResponse = await getSubscriptionsList(adminConfig.actionParams, {
        pageIndex: 0,
        pageSize: 100
      })

      if (subscriptionsListResponse.type === 'Error')
        return 

      const invitationData = invitationsList.find(invitation => invitation.invitationId === invitationId)

      // console.log('invitation data', invitationData)

      if (invitationData) {
        const data: InviteUserRequest = { 
          tenantId: adminConfig.actionParams.tenantId,
          firstName: invitationData.firstName,
          lastName: invitationData.lastName,
          email: invitationData.email,
          inviter: {
            firstName: userProfile? userProfile.firstName : '',
            lastName: userProfile? userProfile.lastName : ''
          },
          role: invitationData.role as any, 
          assignLicenseRequests: invitationData.assignLicenseRequests.map(item => {
            const subscription = subscriptionsListResponse.data.data.find(subscription => subscription.applicationId === item.applicationId)

            const assignLicenseRequest: AssignLicenseRequest = {
              applicationId: item.applicationId,
              subscriptionId: subscription? subscription.subscriptionId : '',
              tenantId: adminConfig.actionParams.tenantId,
              roles: item.roles.map(role => role)
            }

            return assignLicenseRequest
          }),
          invitingUserDisplayName: `${userProfile?.firstName} ${userProfile?.lastName}`
        }

        // console.log("invitation to send", data)
    
        setIsResendingInvitation(true)
        const result = await inviteUser(adminConfig.actionParams, data)
        setIsResendingInvitation(false)
    
        if (result.type === 'Response') {
          await onRefreshUserList()
          return successToast('Sent invitation.')
        }
    
        errorToast(`Failed to send invitation, ${result.statusCode}`)
      }
    }
  }

  const handleDeleteInvitation = async (invitationId: string) => {
    if (adminConfig) {
      const data: DeleteInvitationRequest = { invitationId }

      setIsDeletingInvitation(true)
      const result = await deleteInvitation(adminConfig.actionParams, data)
      setIsDeletingInvitation(false)

      if (result.type === 'Response') {
        await onRefreshUserList()
        return successToast('Removed invitation.')
      }

      errorToast(`Failed to delete invitation, ${result.statusCode}`)
    }
  }

  const handleShowConfirmDeleteUserModal = (userId: string) => {
    const user = findCurrentUser(userId)

    if (user) {
      setSelectedUser({...user})
      setShowConfirmDeleteUserModal(true)
    }
  }

  const handleCloseConfirmDeleteUserModal = () => setShowConfirmDeleteUserModal(false)

  const findCurrentUser = (userId: string) => paginatedData.data.find(user => user.userId === userId)

  const handleShowActivateUserModal = (userId: string) => {
    const user = findCurrentUser(userId)

    if (user) {
      setSelectedUser({...user})
      setShowActivateUserModal(true)
    }
  }

  const handleCloseActivateUserModal = () => setShowActivateUserModal(false)

  const handleActivateUser = async (userId: string) => {
    console.log('activate user')
    if (adminConfig) {
      const data: ActivateUserRequest = {
        tenantId: adminConfig.actionParams.tenantId,
        userId
      }

      setIsActivatingUser(true)
      const result = await activateUser(adminConfig.actionParams, data)
      setIsActivatingUser(false)

      const userName = selectedUser.userId === userId? `${selectedUser.firstName} ${selectedUser.lastName}` : ''
      handleCloseActivateUserModal()

      if (result.type === 'Response') {
        successToast(`Success. Activated user ${userName ?? ''}`)
        await onRefreshUserList()
      }
      else
        errorToast(`Failed to activate user ${userName ?? ''}`)
    }
  }

  const handleShowDeactivateUserModal = (userId: string) => {
    const user = findCurrentUser(userId)

    if (user) {
      setSelectedUser({...user})
      setShowDeactivateUserModal(true)
    }
  }

  const handleCloseDeactivateUserModal = () => {
    setShowDeactivateUserModal(false)
  }

  const handleDeactivateUser = async (userId: string) => {
    console.log('deactivate user')
    if (adminConfig) {
      const data: DeactivateUserRequest = {
        tenantId: adminConfig.actionParams.tenantId,
        userId
      }

      setIsDeactivatingUser(true)
      const result = await deactivateUser(adminConfig.actionParams, data)
      setIsDeactivatingUser(false)

      const userName = selectedUser.userId === userId? `${selectedUser.firstName} ${selectedUser.lastName}` : ''
      handleCloseDeactivateUserModal()

      if (result.type === 'Response') {
        successToast(`Success. Deactivated user ${userName ?? ''}`)
        await onRefreshUserList()
      }
      else
        errorToast(`Failed to deactivate user ${userName ?? ''}`)
    }
  }

  const handleShowAddUserModal = () => setShowAddUserModal(true)
  const handleHideAddUserModal = () => setShowAddUserModal(false)
  const handleShowEditUserModal = (userId: string) => {
    const userById = paginatedData.data.find(user => user.userId === userId)

    if (userById) {
      setSelectedUser(userById)
      setShowEditUserModal(true)
    }
  }

  const handleShowEditInvitationModal = (user: AppUser) => {
    console.log('invitation as user', user)
        
    setSelectedInvitation(user)
    setShowEditInvitationModal(true)
  }

  const handleHideEditInvitationModal = () => setShowEditInvitationModal(false)
  const handleRestoreEditInvitation = () => setSelectedInvitation({...initialSelectedUser})

  const handleRestoreEdit = () => setSelectedUser({...initialSelectedUser})
  const handleHideEditUserModal = () => setShowEditUserModal(false)

  const handleAfterAddUser = () => {
    onRefreshUserList()
    handleHideAddUserModal()
  }

  const handleAfterEditUser = () => {
    handleHideEditUserModal()
    handleRestoreEdit()
    onRefreshUserList()
  }

  const handleAfterEditInvitation = () => {
    handleHideEditInvitationModal()
    handleRestoreEditInvitation()
    onRefreshUserList()
  }

  const handleShowBulkEditRoleModal = () => setShowBulkEditRoleModal(true)
  const handleHideBulkEditRoleModal = () => setShowBulkEditRoleModal(false)
  const handleChangeRoles = () => console.log('change roles')
  const handleSelectUserRole = (e: ChangeEvent<HTMLSelectElement>) => console.log('select user role to bulk edit...')

  const handleCloseEditUserModal = async () => {
    setShowEditUserModal(false)
    await onRefreshUserList()
  }

  return (
    <Flex flexDir='column' w='full'>
      <ConsoleModal 
        content={<AddAppUserForm 
          onAfterAddUser={handleAfterAddUser}
          onClose={handleHideAddUserModal} />}
        show={showAddUserModal} 
        onClose={() => setShowAddUserModal(false)} />
      <ConsoleModal 
        content={<EditAppUserForm
          selectedUserData={selectedUser}
          onAfterEdit={handleAfterEditUser}
          onClose={handleAfterEditUser} />}
        show={showEditUserModal} 
        onClose={handleCloseEditUserModal} />
      <ConsoleModal 
        content={<EditInvitationForm
          initialEditData={selectedInvitation}
          invitationsList={invitationsList}
          onAfterAddUser={handleAfterEditInvitation}
          onClose={handleHideEditInvitationModal} />}
        show={showEditInvitationModal} 
        onClose={() => setShowEditInvitationModal(false)} />
      <ActivateUserModal
        user={selectedUser}
        show={showActivateUserModal}
        isActivatingUser={isActivatingUser}
        onActivateUser={handleActivateUser}
        onClose={handleCloseActivateUserModal} />
      <DeactivateUserModal
        user={selectedUser}
        show={showDeactivateUserModal}
        isDeactivatingUser={isDeactivatingUser}
        onDeactivateUser={handleDeactivateUser}
        onClose={handleCloseDeactivateUserModal} />
      <ConfirmDeleteUserModal
        user={selectedUser}
        isDeletingUser={isDeletingUser}
        show={showConfirmDeleteUserModal}
        onDeleteUser={handleDeleteUser}
        onClose={handleCloseConfirmDeleteUserModal} />
      <ManageUsersTabHeader
        filterValue={filterBy? filterBy.value : ''}
        mode={mode}
        selectedFilter={filterBy? filterBy.field : 'Select Filter'}
        filterOptionsList={filterOptionsList}
        onChangeMode={onChangeMode}
        onFilter={onFilter}
        onResetFilter={onResetFilter}
        onChangeFilter={onSelectFilter}
        onChangeValue={onChangeFilterValue}
        onAddUser={handleShowAddUserModal}
        onRefreshData={onRefreshUserList} />
      <Flex flexDir='column' mt='16px'>
        <ManageUsersTable
          headers={[
            <ControlTableHeader headerData={{ text: 'First Name', fieldName: 'firstName', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: 'Last Name', fieldName: 'lastName', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: 'Status', fieldName: 'status', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: 'Email', fieldName: 'email', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: 'No. of Apps', fieldName: 'appsCount', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: 'Role', fieldName: 'roles', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: 'Source', fieldName: 'source', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: 'Updated ', fieldName: 'lastModifiedDateTime', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: '', fieldName: '', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
          ]}
          itemsCount={paginatedData.data.length}
          rows={<ManageUsersTableRows
            mode={mode}
            isDeleting={isDeletingUser}
            onActivate={handleShowActivateUserModal}
            isDeletingInvitation={isDeletingInvitation}
            isResendingInvitation={isResendingInvitation}
            onDeleteInvitation={handleDeleteInvitation}
            onResendInvitation={handleResendInvitation}
            onDeactivate={handleShowDeactivateUserModal}
            onEdit={handleShowEditUserModal}
            onEditInvitation={handleShowEditInvitationModal}
            onDelete={handleShowConfirmDeleteUserModal}
            usersList={paginatedData.data} />}
          loading={isFetchingData}
          pagination={   
            <Flex justifyContent="flex-end" w='full'>
              { false && <Button
                onClick={handleShowBulkEditRoleModal}
                variant='primaryBlue600'
                size='xs'>Bulk Edit Role</Button> }
              <BulkEditModal 
                selectedUserList={paginatedData.data}
                show={showBulkEditRoleModal}
                onSelecteUserRole={handleSelectUserRole}
                onChangeRole={handleChangeRoles}
                onClose={handleHideBulkEditRoleModal} />
              <Flex w='auto'>
                <TablePagination 
                  currentPage={paginatedData.pageIndex + 1}
                  goToInitialPage={goToInitialPage}
                  goToLastPage={gotToLastPage}
                  goToNextPage={goToNextPage}
                  goToPreviousPage={goToPreviousPage}
                  canNextPage={canNextPage}
                  canPreviousPage={canPreviousPage}
                  pageSize={paginatedData.pageSize}
                  onDecrementPageSize={onDecrementPageSize}
                  onIncrementPageSize={onIncrementPageSize}
                  totalPages={totalPages}
                  maxPageSize={maxPerPage}
                  minPageSize={minPerPage} 
                  onChangePageSize={onChangePageSize} />
              </Flex>
            </Flex>} />
      </Flex>
    </Flex>
  )
}

export default ManageUsersTabContent