// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ChangeEvent } from 'react'
import { AppUser } from '../../../core/AppUser.types'
import ModalForm from '../ModalForm'
import BulkEditRoleFormContent from './BulkEditRoleFormContent'
import BulkEditRoleFormHeader from './BulkEditRoleFormHeader'

interface BulkEditRoleFormProps {
    selectedUserList: AppUser[]
    onSelectUserRole: (e: ChangeEvent<HTMLSelectElement>) => void
    onAction: () => void
    onClose: () => void
}

const BulkEditRoleForm = ({ selectedUserList, onSelectUserRole, onAction, onClose }: BulkEditRoleFormProps) => {
  return (
    <ModalForm
      content={<BulkEditRoleFormContent 
        roleOptions={[]}
        selectedRole=""
        selectedUsersList={selectedUserList}
        onSelectUserRole={onSelectUserRole}
      />}
      header={<BulkEditRoleFormHeader
        onAction={onAction}
        onClose={onClose}
      />}
      height='auto'
      width="512px"
    />
  )
}

export default BulkEditRoleForm