import ModalFormHeader from '../ModalFormHeader'

interface UserSyncConfigureModalHeaderProps {
    isSaving: boolean 
    onAction: () => void
    onClose: () => void
}

const UserSyncConfigureModalHeader = ({ isSaving, onAction, onClose }: UserSyncConfigureModalHeaderProps) => {
  return (
    <ModalFormHeader
      actionText="Save"
      headerText="Configure User Sync"
      isSaving={isSaving}
      onAction={onAction}
      onClose={onClose} />
  )
}

export default UserSyncConfigureModalHeader