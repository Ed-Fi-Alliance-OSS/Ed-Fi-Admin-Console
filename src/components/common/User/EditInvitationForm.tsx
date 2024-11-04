import ModalForm from '../ModalForm'
import EditInvitationFormHeader from './EditInvitationFormHeader'
import useEditInvitationForm from '../../../hooks/adminActions/users/useEditInvitationForm'
import EditInvitationFormContent from './EditInvitationFormContent'
import { AppUser } from '../../../core/AppUser.types'
import { ApiInvitation } from '../../../services/AdminActions/Users/UsersService.responses'

interface AddAppUserFormProps {
    initialEditData: AppUser
    invitationsList: ApiInvitation[]
    onAfterAddUser: () => void
    onClose: () => void
}

const EditInvitationForm = ({ initialEditData, invitationsList, onAfterAddUser, onClose }: AddAppUserFormProps) => {
  const { 
    userData, 
    mode,
    roleOptions,
    subscriptionsOptionList,
    savingChanges,
    errors,
    hasTriedSubmit,
    onSave,
    onToggleIsAdmin,
    onChangeMode,
    onInputChange,
    onRoleSelect,
    onSelectApplicationRoleForUser,
    onSubscriptionToggle } = useEditInvitationForm({ 
    editUserInitialData: initialEditData, 
    invitationsList,
    onAddFinished: onAfterAddUser 
  })

  return (
    <ModalForm
      header={<EditInvitationFormHeader 
        isSaving={savingChanges}
        onAction={onSave}
        onClose={onClose} />}
      content={<EditInvitationFormContent
        mode={mode}
        onToggleIsAdmin={onToggleIsAdmin}
        userData={userData}
        roleOptions={roleOptions}
        subscriptionOptionsList={subscriptionsOptionList}
        errors={errors}
        hasTriedSubmit={hasTriedSubmit}
        onChangeMode={onChangeMode}
        onInputChange={onInputChange}
        onRoleSelect={onRoleSelect}
        onSelectApplicationRoleForUser={onSelectApplicationRoleForUser}
        onSubscriptionToggle={onSubscriptionToggle} />}
      height='auto'
      width="512px" />
  )
}

export default EditInvitationForm