// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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