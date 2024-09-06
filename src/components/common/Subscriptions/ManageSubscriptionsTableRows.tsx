import ControlTableRow from "../ControlTableRow"
import ManageUsersTableData from "../User/ManageUsersTableData"
import { Subscription } from "../../../core/Subscription.types"
import SubscriptionApplication from "./SubscriptionApplication"
import SubscriptionLicensesAmount from "./SubscriptionLicensesAmount"
import SubscriptionDateText from "./SubscriptionDateText"
import SubscriptionType from "./SubscriptionType"
import SubscriptionStatus from "./SubscriptionStatus"
import ManageSubscribersControls from "./ManageSubscribersControls"
import formatDate from "../../../helpers/formatDate"

interface ManageSubscriptionsTableRowsProps {
    subscriptionsList: Subscription[]
    onEditSubscription: (subscriptionId: string) => void
    onManageSubscribers: (subscriptionId: string) => void
}

const ManageSubscriptionsTableRows = ({ subscriptionsList, onEditSubscription, onManageSubscribers }: ManageSubscriptionsTableRowsProps) => {
    return (
        <>
            {subscriptionsList.map((subscription, index) => 
                <ControlTableRow key={index}>
                        <ManageUsersTableData width="auto">
                            <SubscriptionApplication 
                                name={subscription.applicationName}
                                onEditApplicationSubscription={() => onEditSubscription(subscription.subscriptionId)} />
                        </ManageUsersTableData>
                        <ManageUsersTableData width="auto">
                            <SubscriptionLicensesAmount 
                                subscriptionId={subscription.subscriptionId}
                                amount={subscription.numberOfLicenses === -1? 'Unlimited' : subscription.numberOfLicenses}
                                onManageSubscribers={onManageSubscribers} />
                        </ManageUsersTableData>
                        <ManageUsersTableData width="auto">
                            <SubscriptionDateText date={formatDate(subscription.startDateTime)} />
                        </ManageUsersTableData>
                        <ManageUsersTableData width="auto">
                            <SubscriptionDateText date={formatDate(subscription.endDateTime)} />
                        </ManageUsersTableData>
                        <ManageUsersTableData width="auto">
                            <SubscriptionType type={subscription.licenseType} />
                        </ManageUsersTableData>
                        <ManageUsersTableData width="auto">
                            <SubscriptionStatus status={subscription.subscriptionStatus} />
                        </ManageUsersTableData>
                        <ManageUsersTableData width="auto">
                            <ManageSubscribersControls 
                                applicationName={subscription.applicationName}
                                subscriptionId={subscription.subscriptionId}
                                onManage={() => onEditSubscription(subscription.subscriptionId)}
                                onManageSubscribers={onManageSubscribers} />
                        </ManageUsersTableData>
                </ControlTableRow>
            )}
        </>
    )
}

export default ManageSubscriptionsTableRows