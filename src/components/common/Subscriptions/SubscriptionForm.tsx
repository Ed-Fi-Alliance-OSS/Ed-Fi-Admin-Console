// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Subscription } from '../../../core/Subscription.types'
import useSubscriptionsForm from '../../../hooks/adminActions/subscriptions/useSubscriptionsForm'
import { Mode } from '../../../hooks/adminActions/subscriptions/useSubscriptionsForm.types'
import ModalForm from '../ModalForm'
import SubscriptionFormContent from './SubscriptionFormContent'
import SubscriptionFormHeader from './SubscriptionFormHeader'

interface SubscriptionFormProps {
    mode: Mode
    currentSubscriptionsList?: Subscription[]
    selectedSubscription?: Subscription | null
    onAfterAction: () => void
    onClose: () => void
}

const SubscriptionForm = ({ mode, currentSubscriptionsList, selectedSubscription, onClose, onAfterAction }: SubscriptionFormProps) => {
  const {
    subscriptionData, 
    applicationOptions,
    hasTriedSubmit,
    isSavingChanges,
    errors,
    onSave,
    onChangeEndDate,
    onChangeStartDate,
    onChangeGracePeriod,
    onChangeNumberOfLicenses,
    onSelectApplication,
    onToggleAutoAssign,
    onToggleLicenseType
  } = useSubscriptionsForm({ 
    mode: mode, 
    currentSubscriptionsList: currentSubscriptionsList,
    editSubscriptionData: selectedSubscription? selectedSubscription : undefined,
    onAfterAction: onAfterAction 
  })

  return (
    <ModalForm
      content={<SubscriptionFormContent 
        applicationOptions={applicationOptions} 
        errors={errors}
        hasTriedSubmit={hasTriedSubmit}
        mode={mode}
        subscriptionData={subscriptionData}
        onChangeEndDate={onChangeEndDate}
        onChangeGracePeriod={onChangeGracePeriod}
        onChangeLicensesAmount={onChangeNumberOfLicenses}
        onChangeStartDate={onChangeStartDate}
        onSelectApplication={onSelectApplication}
        onToggleAutoAssign={onToggleAutoAssign}
        onToggleLicenseType={onToggleLicenseType}
      />}
      header={<SubscriptionFormHeader 
        isSavingChanges={isSavingChanges} 
        mode={mode}
        onClose={onClose}
        onSave={onSave}
      />}
      height='auto'
      width="512px"
    />
  )
}

export default SubscriptionForm