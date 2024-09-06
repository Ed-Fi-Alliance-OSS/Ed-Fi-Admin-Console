import { ChangeEvent } from 'react'
import { AppUser } from "../../../core/AppUser.types"
import ModalForm from "../ModalForm"
import BulkEditRoleFormContent from "./BulkEditRoleFormContent"
import BulkEditRoleFormHeader from "./BulkEditRoleFormHeader"

interface BulkEditRoleFormProps {
    selectedUserList: AppUser[]
    onSelectUserRole: (e: ChangeEvent<HTMLSelectElement>) => void
    onAction: () => void
    onClose: () => void
}

const BulkEditRoleForm = ({ selectedUserList, onSelectUserRole, onAction, onClose }: BulkEditRoleFormProps) => {
    return (
        <ModalForm
            header={<BulkEditRoleFormHeader onAction={onAction} onClose={onClose} />}
            content={<BulkEditRoleFormContent 
                selectedRole=""
                roleOptions={[]}
                selectedUsersList={selectedUserList}
                onSelectUserRole={onSelectUserRole} />}
            height='auto'
            width="512px" />
    )
}

export default BulkEditRoleForm