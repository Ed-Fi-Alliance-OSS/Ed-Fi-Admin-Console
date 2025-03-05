// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import useCreateUserForm from '../../../../hooks/adminActions/users/useCreateUserForm'
import ModalForm from '../../ModalForm'
import InviteUserFormContent from './InviteUserFormContent'
import InviteUserFormHeader from './InviteUserFormHeader'

interface InviteUserFormProps {
    onAfterAction: () => void
    onClose: () => void
}

const InviteUserForm = ({ onAfterAction, onClose }: InviteUserFormProps) => {
  const { userData,
    onInputChange,
    errors,
    hasTriedSubmit,
    savingChanges,
    onSave } = useCreateUserForm({
    formMode: 'Invite Admin',
    onAddFinished: onAfterAction 
  })

  return (
    <ModalForm
      content={<InviteUserFormContent
        errors={errors} 
        hasTriedSubmit={hasTriedSubmit}
        userData={userData}
        onInputChange={onInputChange}
      />}
      header={<InviteUserFormHeader 
        isSavingChanges={savingChanges}
        onClose={onClose}
        onSave={onSave}
      />}
      height='auto'
      width="512px"
    />
  )
}

export default InviteUserForm