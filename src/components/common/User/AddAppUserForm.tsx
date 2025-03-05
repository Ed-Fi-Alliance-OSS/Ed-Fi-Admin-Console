// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import AddAppUserFormContent from './AddAppUserFormContent'
import AddAppUserFormHeader from './AddAppUserFormHeader'
import ModalForm from '../ModalForm'
import useCreateUserForm from '../../../hooks/adminActions/users/useCreateUserForm'

interface AddAppUserFormProps {
    onAfterAddUser: () => void
    onClose: () => void
}

const AddAppUserForm = ({ onAfterAddUser, onClose }: AddAppUserFormProps) => {
  const { userData, 
    mode,
    roleOptions,
    subscriptionsOptionList,
    savingChanges,
    errors,
    hasTriedSubmit,
    onSave,
    onToggleIsAdmin,
    onChangeMode,
    onInputChange,
    onRoleSelect,
    onSelectApplicationRoleForUser,
    onSubscriptionToggle } = useCreateUserForm({ onAddFinished: onAfterAddUser })

  return (
    <ModalForm
      content={<AddAppUserFormContent
        errors={errors}
        hasTriedSubmit={hasTriedSubmit}
        mode={mode}
        roleOptions={roleOptions}
        subscriptionOptionsList={subscriptionsOptionList}
        userData={userData}
        onChangeMode={onChangeMode}
        onInputChange={onInputChange}
        onRoleSelect={onRoleSelect}
        onSelectApplicationRoleForUser={onSelectApplicationRoleForUser}
        onSubscriptionToggle={onSubscriptionToggle}
        onToggleIsAdmin={onToggleIsAdmin}
      />}
      header={<AddAppUserFormHeader 
        isSaving={savingChanges}
        onAction={onSave}
        onClose={onClose}
      />}
      height='auto'
      width="512px"
    />
  )
}

export default AddAppUserForm