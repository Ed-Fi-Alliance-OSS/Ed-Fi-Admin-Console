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