import { Subscription } from '../../../core/Subscription.types'
import {
  Mode, SubscriptionFormData 
} from './useSubscriptionsForm.types'

export const initialData: SubscriptionFormData = {
  startDateTime: null,
  applicationId: '',
  endDateTime: null,
  gracePeriod: 0,
  numberOfLicenses: 1,
  unlimitedLicenses: false,
  autoAssign: false
}

export const getInitialData = (mode: Mode, editSubscriptionData?: Subscription) => {
  if (mode === 'Add') {
    return { ...initialData }
  }

  if (editSubscriptionData && mode === 'Edit') {
    const initialSubscriptionData: SubscriptionFormData = {
      applicationId: editSubscriptionData.applicationId,
      subscriptionId: editSubscriptionData.subscriptionId,
      startDateTime: new Date(editSubscriptionData.startDateTime),
      endDateTime: new Date(editSubscriptionData.endDateTime),
      gracePeriod: editSubscriptionData.gracePeriod,
      numberOfLicenses: editSubscriptionData.numberOfLicenses,
      unlimitedLicenses: editSubscriptionData.numberOfLicenses === -1? true : false,
      autoAssign: editSubscriptionData.autoAssign
    }

    console.log('initial subscription data', initialSubscriptionData.startDateTime, editSubscriptionData.startDateTime)

    return initialSubscriptionData
  }

  return { ...initialData }
}