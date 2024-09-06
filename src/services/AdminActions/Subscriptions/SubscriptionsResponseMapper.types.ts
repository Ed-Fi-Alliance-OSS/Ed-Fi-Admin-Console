import { Subscription } from "../../../core/Subscription.types"

export interface SubscriptionsListData {
    count: number 
    pageSize: number 
    pageIndex: number 
    data: Subscription[]
}