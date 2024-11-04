import ModalForm from '../ModalForm'
import UserSyncConfigureForm from './UserSyncConfigureForm'
import UserSyncConfigureModalHeader from './UserSyncConfigureModalHeader'

interface UserSynConfigureModalProps {
    isSaving: boolean 
    enabledNightlySync: boolean
    onSave: () => void
    onClose: () => void
    onToggleNightlySync: () => void
}

const UserSynConfigureModal = ({ enabledNightlySync, isSaving, onClose, onSave, onToggleNightlySync }: UserSynConfigureModalProps) => {
  return (
    <ModalForm
      header={<UserSyncConfigureModalHeader 
        isSaving={isSaving}
        onAction={onSave}
        onClose={onClose} />}
      content={<UserSyncConfigureForm
        enabledNightlySync={enabledNightlySync}
        isSaving={isSaving}
        onToggleNightlySync={onToggleNightlySync} />}
      height='auto'
      width="512px" />
  )
}

export default UserSynConfigureModal