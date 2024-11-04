import { ChangeEvent } from 'react'
import { AppUser } from '../../../core/AppUser.types'
import ConsoleModal from '../ConsoleModal'
import BulkEditRoleForm from './BulkEditRoleForm'

interface BulkEditModalProps {
    show: boolean
    selectedUserList: AppUser[]
    onSelecteUserRole: (e: ChangeEvent<HTMLSelectElement>) => void
    onChangeRole: () => void
    onClose: () => void
}

const BulkEditModal = ({ show, selectedUserList, onSelecteUserRole, onChangeRole, onClose }: BulkEditModalProps) => {
  return (
    <ConsoleModal 
      content={<BulkEditRoleForm 
        selectedUserList={selectedUserList}
        onSelectUserRole={onSelecteUserRole}
        onAction={onChangeRole} 
        onClose={onClose} />}
      show={show}
      onClose={onClose} />
  )
}

export default BulkEditModal