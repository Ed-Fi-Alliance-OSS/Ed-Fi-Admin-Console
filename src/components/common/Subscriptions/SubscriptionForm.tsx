import { Subscription } from "../../../core/Subscription.types"
import useSubscriptionsForm from "../../../hooks/adminActions/subscriptions/useSubscriptionsForm"
import { Mode } from "../../../hooks/adminActions/subscriptions/useSubscriptionsForm.types"
import ModalForm from "../ModalForm"
import SubscriptionFormContent from "./SubscriptionFormContent"
import SubscriptionFormHeader from "./SubscriptionFormHeader"

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
        onAfterAction: onAfterAction })

    return (
        <ModalForm
            header={<SubscriptionFormHeader 
                mode={mode} 
                isSavingChanges={isSavingChanges}
                onSave={onSave}
                onClose={onClose} />}
            content={<SubscriptionFormContent 
                applicationOptions={applicationOptions} 
                subscriptionData={subscriptionData}
                mode={mode}
                hasTriedSubmit={hasTriedSubmit}
                errors={errors}
                onChangeStartDate={onChangeStartDate}
                onChangeEndDate={onChangeEndDate}
                onSelectApplication={onSelectApplication}
                onChangeGracePeriod={onChangeGracePeriod}
                onChangeLicensesAmount={onChangeNumberOfLicenses}
                onToggleAutoAssign={onToggleAutoAssign}
                onToggleLicenseType={onToggleLicenseType} />}
            height='auto'
            width="512px" />
    )
}

export default SubscriptionForm