import { Subscription } from "../../../core/Subscription.types"
import useManageSubscribersForm from "../../../hooks/adminActions/subscriptions/useManageSubscribersForm"
import ModalForm from "../ModalForm"
import ManageSubscribersFormContent from "./ManageSubscribersFormContent"
import ManageSubscribersFormHeader from "./ManageSubscribersFormHeader"

interface ManageSubscribersFormProps {
    selectedSubscription: Subscription | null 
    onAfterAction: () => void
    onClose: () => void
}

const ManageSubscribersForm = ({ selectedSubscription, onAfterAction, onClose }: ManageSubscribersFormProps) => {
    const { 
        usersSubscriptionList, 
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
            header={<ManageSubscribersFormHeader 
                isSavingChanges={isSavingChanges}
                onSave={onSave}
                onClose={onClose} />}
            content={<ManageSubscribersFormContent 
                usersList={usersSubscriptionList}
                subscriptionRoleOptions={subscriptionRoleOptions.filter(roleOption => roleOption.isAvailableForTenants)}
                selectedSubscription={selectedSubscription}
                searchText={searchText}
                onSearchUser={onSearchUser}
                onSelectRoleForUser={onSelectRoleForUser}
                onToggleSubscription={onToggleSubscription} />}
            height='auto'
            width="540px" />
    )
}

export default ManageSubscribersForm