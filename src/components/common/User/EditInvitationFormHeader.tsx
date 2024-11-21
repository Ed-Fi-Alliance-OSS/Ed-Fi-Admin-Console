import ModalFormHeader from '../ModalFormHeader'

interface EditInvitationFormHeaderProps {
    isSaving: boolean
    onAction: () => void
    onClose: () => void
}

const EditInvitationFormHeader = ({ isSaving, onAction, onClose }: EditInvitationFormHeaderProps) => {
  return (
    <ModalFormHeader
      actionText="Update"
      alignCenter={true}
      headerText="Edit Invitation"
      isSaving={isSaving}
      onAction={onAction}
      onClose={onClose}
    />
  )
}

export default EditInvitationFormHeader