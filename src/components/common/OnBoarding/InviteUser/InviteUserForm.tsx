import useCreateUserForm from '../../../../hooks/adminActions/users/useCreateUserForm'
import ModalForm from '../../ModalForm'
import InviteUserFormContent from './InviteUserFormContent'
import InviteUserFormHeader from './InviteUserFormHeader'

interface InviteUserFormProps {
    onAfterAction: () => void
    onClose: () => void
}

const InviteUserForm = ({ onAfterAction, onClose }: InviteUserFormProps) => {
  const { userData,
    onInputChange,
    errors,
    hasTriedSubmit,
    savingChanges,
    onSave } = useCreateUserForm({
    formMode: 'Invite Admin',
    onAddFinished: onAfterAction 
  })

  return (
    <ModalForm
      content={<InviteUserFormContent
        errors={errors} 
        hasTriedSubmit={hasTriedSubmit}
        userData={userData}
        onInputChange={onInputChange}
      />}
      header={<InviteUserFormHeader 
        isSavingChanges={savingChanges}
        onClose={onClose}
        onSave={onSave}
      />}
      height='auto'
      width="512px"
    />
  )
}

export default InviteUserForm