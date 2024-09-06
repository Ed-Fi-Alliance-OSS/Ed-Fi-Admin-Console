import ModalFormHeader from "../ModalFormHeader"

interface BulkEditRoleFormHeaderProps {
    onAction: () => void
    onClose: () => void
}

const BulkEditRoleFormHeader = ({ onAction, onClose }: BulkEditRoleFormHeaderProps) => {
    return (
        <ModalFormHeader 
            actionText="Change Role"
            headerText="Bulk Edit Roles"
            isSaving={false}
            onAction={onAction}
            onClose={onClose} />
    )
}

export default BulkEditRoleFormHeader