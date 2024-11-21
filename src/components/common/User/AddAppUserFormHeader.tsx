import ModalFormHeader from '../ModalFormHeader'

interface AddAppUserFormHeaderProps {
    isSaving: boolean
    onAction: () => void
    onClose: () => void
}

const AddAppUserFormHeader = ({ isSaving, onAction, onClose }: AddAppUserFormHeaderProps) => {
  return (
    <ModalFormHeader
      actionText="Add User"
      headerText="Add User"
      isSaving={isSaving}
      onAction={onAction}
      onClose={onClose}
    />
  )
}

export default AddAppUserFormHeader