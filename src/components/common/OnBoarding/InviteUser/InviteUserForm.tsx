import useCreateUserForm from '../../../../hooks/adminActions/users/useCreateUserForm'
import ModalForm from '../../ModalForm'
import InviteUserFormContent from './InviteUserFormContent'
import InviteUserFormHeader from './InviteUserFormHeader'

interface InviteUserFormProps {
    onAfterAction: () => void
    onClose: () => void
}

const InviteUserForm = ({ onAfterAction, onClose }: InviteUserFormProps) => {
  const { 
    userData,
    onInputChange,
    errors,
    hasTriedSubmit,
    savingChanges,
    onSave } = useCreateUserForm({ formMode: 'Invite Admin', onAddFinished: onAfterAction })

  return (
    <ModalForm
      header={<InviteUserFormHeader 
        isSavingChanges={savingChanges}
        onSave={onSave}
        onClose={onClose} />}
      content={<InviteUserFormContent
        userData={userData} 
        errors={errors}
        hasTriedSubmit={hasTriedSubmit}
        onInputChange={onInputChange} />}
      height='auto'
      width="512px" />
  )
}

export default InviteUserForm