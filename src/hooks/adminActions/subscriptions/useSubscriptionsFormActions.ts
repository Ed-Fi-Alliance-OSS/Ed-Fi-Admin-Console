import { UserProfileContext } from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { ActionParams } from '../../../services/AdminActions/adminAction.types'
import useSubscriptionsService from '../../../services/AdminActions/Subscriptions/SubscriptionsService'
import {
  AddSubscriptionRequest, UpdateSubscriptionRequest 
} from '../../../services/AdminActions/Subscriptions/SubscriptionsService.requests'
import useEDXToast from '../../common/useEDXToast'
import { SubscriptionFormData } from './useSubscriptionsForm.types'

const useSubscriptionsFormActions = () => {
  const { userProfile } = useContext(UserProfileContext)
  const { addSubscription, updateSubscription } = useSubscriptionsService()
  const { successToast, errorToast } = useEDXToast()


  const onAddSubscription = async (actionParams: ActionParams, subscriptionData: SubscriptionFormData) => {
    if (userProfile) {
      const requestData: AddSubscriptionRequest = {
        tenantId: userProfile.tenantId,
        applicationId: subscriptionData.applicationId,
        startDateTime: subscriptionData.startDateTime?.toDateString() as string,
        endDateTime: subscriptionData.endDateTime?.toDateString() as string,
        gracePeriod: subscriptionData.gracePeriod,
        numberOfLicenses: subscriptionData.numberOfLicenses,
        assignedLicenses: 0,
        autoAssign: subscriptionData.autoAssign,
        licenseType: subscriptionData.unlimitedLicenses? 'Full' : 'Trial',
        subscriptionStatus: 'Pending'
      }
    
      const result = await addSubscription(actionParams, requestData)
    
      console.log('result of add subscription', result)
    
      if (result.type === 'Response') {
        successToast('Added Subscription')
      } else {
        errorToast(`${result.actionMessage}`)
      }
    }
  }

  const onEditSubscription = async (actionParams: ActionParams, subscriptionData: SubscriptionFormData) => {
    if (userProfile) {
      const requestData: UpdateSubscriptionRequest = {
        tenantId: userProfile.tenantId,
        subscriptionId: subscriptionData.subscriptionId as string,
        startDateTime: subscriptionData.startDateTime?.toDateString() as string,
        endDateTime: subscriptionData.endDateTime?.toDateString() as string,
        gracePeriod: subscriptionData.gracePeriod,
        numberOfLicenses: subscriptionData.numberOfLicenses,
        autoAssign: subscriptionData.autoAssign,
        licenseType: subscriptionData.unlimitedLicenses? 'Full' : 'Trial'
      }
    
      const result = await updateSubscription(actionParams, requestData)
    
      console.log('result of update subscription', result)

      if (result.type === 'Response') {
        successToast('Updated Subscription')
      } else {
        errorToast(`${result.actionMessage}`)
      }
    }
  }

  return {
    onAddSubscription,
    onEditSubscription
  }
}

export default useSubscriptionsFormActions