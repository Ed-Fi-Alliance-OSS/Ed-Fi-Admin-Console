// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ModalFormHeader from '../ModalFormHeader'

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
      onClose={onClose}
    />
  )
}

export default BulkEditRoleFormHeader