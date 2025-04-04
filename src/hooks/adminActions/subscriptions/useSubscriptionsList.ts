// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  TEEAuthDataContext, UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  useContext, useEffect, useState
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { Subscription } from '../../../core/Subscription.types'
import useSubscriptionsService from '../../../services/AdminActions/Subscriptions/SubscriptionsService'
import { GetSubscriptionsListRequest } from '../../../services/AdminActions/Subscriptions/SubscriptionsService.requests'

interface TablePaginationData {
    count: number 
    pageIndex: number 
    pageSize: number 
}

const useSubscriptionsList = () => {
  const { getSubscriptionsList } = useSubscriptionsService()
  const [ subscriptionsList, setSubscriptionsList ] = useState<Subscription[]>([])
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const { userProfile } = useContext(UserProfileContext)
  const [ isFetchingSubscriptions, setIsFetchingSubscriptions ] = useState(false)

  const [ paginationData, setPaginationData ] = useState<TablePaginationData>({
    count: 0,
    pageIndex: 0,
    pageSize: 100
  })

  const fetchSubscriptionsList = async () => {
    if (userProfile && auth && auth.user && edxAppConfig && adminConfig) {
      setIsFetchingSubscriptions(true)

      const requestData: GetSubscriptionsListRequest = {
        pageIndex: paginationData.pageIndex,
        pageSize: paginationData.pageSize
      }

      const result = await getSubscriptionsList(adminConfig.actionParams, requestData)
      setIsFetchingSubscriptions(false)

      console.log('subscriptions data', result)

      if (result.type === 'Response') {
        setSubscriptionsList([ ...result.data.data ])
        setPaginationData({
          ...paginationData, 
          pageSize: result.data.pageSize,
          count: result.data.count
        })
      }
    }
  }

  const onRefreshSubscriptionsList = async () => await fetchSubscriptionsList()

  useEffect(() => {
    fetchSubscriptionsList()
  }, [])

  return {
    subscriptionsList,
    onRefreshSubscriptionsList,
    isFetchingSubscriptions
  }
}

export default useSubscriptionsList