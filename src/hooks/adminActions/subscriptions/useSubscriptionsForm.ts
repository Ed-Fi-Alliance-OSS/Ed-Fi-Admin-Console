// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  EdxAppConfig, TEEAuthDataContext, UserProfileContext 
} from '@edfi/admin-console-shared-sdk'
import {
  ChangeEvent, useState, useEffect, useContext 
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { Subscription } from '../../../core/Subscription.types'
import { ActionParams } from '../../../services/AdminActions/adminAction.types'
import { getApplicationsList } from '../../../services/AdminActions/Applications/ApplicationsService'
import { Application } from '../../../services/AdminActions/Applications/ApplicationsService.responses'
import { getInitialData } from './SubscriptionsFormInitialData'
import {
  Mode, SubscriptionApplicationOption, SubscriptionFormData 
} from './useSubscriptionsForm.types'
import useSubscriptionsFormActions from './useSubscriptionsFormActions'
import useSubscriptionsFormValidation from './useSubscriptionsFormValidation'

interface UseSubscriptionsFormProps {
    mode: Mode
    currentSubscriptionsList: Subscription[] | undefined
    editSubscriptionData?: Subscription
    onAfterAction?: () => void
}

const useSubscriptionsForm = ({ mode, editSubscriptionData, currentSubscriptionsList, onAfterAction }: UseSubscriptionsFormProps) => {
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const { userProfile } = useContext(UserProfileContext)
  const [ subscriptionData, setSubscriptionData ] = useState<SubscriptionFormData>(() => getInitialData(mode, editSubscriptionData))
  const [ applicationOptions, setApplicationOptions ] = useState<SubscriptionApplicationOption[]>([])
  const { onAddSubscription, onEditSubscription } = useSubscriptionsFormActions()
  const { errors, validFormData, validateGracePeriod, validateNumberOfLicenses, validateHasSelectedApplication, validateSubscriptionDuration } = useSubscriptionsFormValidation()
  const [ isSavingChanges, setIsSavingChanges ] = useState(false)
  const [ hasTriedSubmit, setHasTriedSubmit ] = useState(false)

  const onChangeStartDate = (date: Date) => {
    console.log('change start date', date)

    const nsubscriptionData = { ...subscriptionData }
    nsubscriptionData.startDateTime = date

    if (hasTriedSubmit && nsubscriptionData.endDateTime) {
      validateSubscriptionDuration(nsubscriptionData)
    }

    setSubscriptionData(nsubscriptionData)

    return null
  }

  const onChangeEndDate = (date: Date) => {
    console.log('change end date', date)

    const nsubscriptionData = { ...subscriptionData }
    nsubscriptionData.endDateTime = date

    if (hasTriedSubmit && nsubscriptionData.startDateTime) {
      validateSubscriptionDuration(nsubscriptionData)
    }

    setSubscriptionData(nsubscriptionData)

    return null
  }

  const onSelectApplication = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '' && mode === 'Add') {
      const nsubscriptionData = { ...subscriptionData }
      nsubscriptionData.applicationId = e.target.value

      if (hasTriedSubmit) {
        validateHasSelectedApplication(nsubscriptionData)
      }

      setSubscriptionData(nsubscriptionData)
    }
  }

  const onToggleAutoAssign = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('toggle auto assign', e.target.checked)

    const nsubscriptionData = { ...subscriptionData }
    nsubscriptionData.autoAssign = e.target.checked
        
    setSubscriptionData(nsubscriptionData)
  }

  const onChangeGracePeriod = (stringValue: string, value: number) => {
    console.log('increase period', stringValue, value)

    const nsubscriptionData = { ...subscriptionData }
    nsubscriptionData.gracePeriod = value

    if (hasTriedSubmit) {
      validateGracePeriod(nsubscriptionData)
    }

    console.log('updated grace period', nsubscriptionData)
        
    setSubscriptionData(nsubscriptionData)
  }

  const onChangeNumberOfLicenses = (stringValue: string, value: number) => {
    console.log('increase license', stringValue, value)

    const nsubscriptionData = { ...subscriptionData }
    nsubscriptionData.numberOfLicenses = value

    if (value === -1) {
      nsubscriptionData.unlimitedLicenses = true
    }
        
    if (hasTriedSubmit) {
      validateNumberOfLicenses(nsubscriptionData)
    }
        
    setSubscriptionData(nsubscriptionData)
  }

  const onToggleLicenseType = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('toggle license', e.target.checked)

    const nsubscriptionData = { ...subscriptionData }
    nsubscriptionData.unlimitedLicenses = e.target.checked
        
    if (e.target.checked) {
      nsubscriptionData.numberOfLicenses = -1
    } else {
      nsubscriptionData.numberOfLicenses = 0
    }
        
    setSubscriptionData(nsubscriptionData)
  }

  const extractSubscriptionOptions = (applicationsList: Application[]): SubscriptionApplicationOption[] => {
    let options: SubscriptionApplicationOption[] = []
    let availableApplicationsForSubscription = [ ...applicationsList ]

    if (currentSubscriptionsList && currentSubscriptionsList.length > 0) {
      availableApplicationsForSubscription = availableApplicationsForSubscription.filter(application => 
        currentSubscriptionsList.find(subscription => subscription.applicationId === application.applicationId)? false : true)
    } 

    options = availableApplicationsForSubscription.map(application => {
      const soption: SubscriptionApplicationOption = {
        applicationId: application.applicationId,
        applicationName: application.applicationName
      }

      return soption
    })
        
    options.unshift({
      applicationId: '',
      applicationName: 'Select the application' 
    })

    return options
  }

  const fetchApplicationsList = async () => {
    if (userProfile && auth && auth.user && adminConfig) {
      const applicationsListData = await getApplicationsList(adminConfig.actionParams)
    
      console.log('get applications list for tenant result', applicationsListData)
    
      if (applicationsListData) {
        const options = extractSubscriptionOptions(applicationsListData.data)
        setApplicationOptions(options)
      }
    }
  }

  const onSave = async () => {
    if (auth && auth.user && userProfile && edxAppConfig && adminConfig) {
      setIsSavingChanges(true)

      if (mode === 'Add') {
        if (validFormData(subscriptionData)) {
          await onAddSubscription(adminConfig.actionParams, subscriptionData)

          if (onAfterAction) {
            onAfterAction()
          }
        } else {
          setHasTriedSubmit(true)
        }
      } else if (mode === 'Edit') {
        if (validFormData(subscriptionData)) {
          await onEditSubscription(adminConfig.actionParams, subscriptionData)

          if (onAfterAction) {
            onAfterAction()
          }
        } else {
          setHasTriedSubmit(true)
        }
      }

      setIsSavingChanges(false)
    }
  }

  useEffect(() => {
    fetchApplicationsList()
  }, [])

  return {
    subscriptionData,
    applicationOptions,
    errors,
    hasTriedSubmit,
    isSavingChanges,
    onChangeStartDate,
    onChangeEndDate,
    onSelectApplication,
    onToggleAutoAssign,
    onToggleLicenseType, 
    onChangeNumberOfLicenses,
    onChangeGracePeriod,
    onSave
  }
}

export default useSubscriptionsForm