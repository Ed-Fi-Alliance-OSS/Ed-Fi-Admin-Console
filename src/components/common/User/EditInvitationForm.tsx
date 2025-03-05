// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ModalForm from '../ModalForm'
import EditInvitationFormHeader from './EditInvitationFormHeader'
import useEditInvitationForm from '../../../hooks/adminActions/users/useEditInvitationForm'
import EditInvitationFormContent from './EditInvitationFormContent'
import { AppUser } from '../../../core/AppUser.types'
import { ApiInvitation } from '../../../services/AdminActions/Users/UsersService.responses'

interface AddAppUserFormProps {
    initialEditData: AppUser
    invitationsList: ApiInvitation[]
    onAfterAddUser: () => void
    onClose: () => void
}

const EditInvitationForm = ({ initialEditData, invitationsList, onAfterAddUser, onClose }: AddAppUserFormProps) => {
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
    onSubscriptionToggle } = useEditInvitationForm({ 
    editUserInitialData: initialEditData, 
    invitationsList,
    onAddFinished: onAfterAddUser 
  })

  return (
    <ModalForm
      content={<EditInvitationFormContent
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
      header={<EditInvitationFormHeader 
        isSaving={savingChanges}
        onAction={onSave}
        onClose={onClose}
      />}
      height='auto'
      width="512px"
    />
  )
}

export default EditInvitationForm