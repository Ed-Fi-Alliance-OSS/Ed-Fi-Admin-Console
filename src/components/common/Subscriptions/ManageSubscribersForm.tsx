// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Subscription } from '../../../core/Subscription.types'
import useManageSubscribersForm from '../../../hooks/adminActions/subscriptions/useManageSubscribersForm'
import ModalForm from '../ModalForm'
import ManageSubscribersFormContent from './ManageSubscribersFormContent'
import ManageSubscribersFormHeader from './ManageSubscribersFormHeader'

interface ManageSubscribersFormProps {
    selectedSubscription: Subscription | null 
    onAfterAction: () => void
    onClose: () => void
}

const ManageSubscribersForm = ({ selectedSubscription, onAfterAction, onClose }: ManageSubscribersFormProps) => {
  const { usersSubscriptionList, 
    subscriptionRoleOptions,
    searchText,
    onSelectRoleForUser, 
    onSearchUser,
    onSave,
    isSavingChanges,
    onToggleSubscription } = useManageSubscribersForm({ 
    selectedSubscription,
    onAfterSave: onAfterAction
  })

  return (
    <ModalForm
      content={<ManageSubscribersFormContent 
        searchText={searchText}
        selectedSubscription={selectedSubscription}
        subscriptionRoleOptions={subscriptionRoleOptions.filter(roleOption => roleOption.isAvailableForTenants)}
        usersList={usersSubscriptionList}
        onSearchUser={onSearchUser}
        onSelectRoleForUser={onSelectRoleForUser}
        onToggleSubscription={onToggleSubscription}
      />}
      header={<ManageSubscribersFormHeader 
        isSavingChanges={isSavingChanges}
        onClose={onClose}
        onSave={onSave}
      />}
      height='auto'
      width="540px"
    />
  )
}

export default ManageSubscribersForm