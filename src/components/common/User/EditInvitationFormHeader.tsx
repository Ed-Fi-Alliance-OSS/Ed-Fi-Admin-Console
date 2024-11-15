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
      headerText="Edit Invitation"
      alignCenter={true}
      isSaving={isSaving}
      onAction={onAction}
      onClose={onClose} />
  )
}

export default EditInvitationFormHeader