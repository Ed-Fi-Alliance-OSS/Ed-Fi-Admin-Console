// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  LicenseType, SubscriptionStatus 
} from '../../../core/Subscription.types'
import { SubscriptionsListData } from './SubscriptionsResponseMapper.types'
import { GetSubscriptionsListResponse } from './SubscriptionsService.responses'

class SubscriptionsResponseMapper {
  public static mapToSubscriptionsList(response: GetSubscriptionsListResponse): SubscriptionsListData {
    const subscriptionsListData: SubscriptionsListData = {
      count: response.count,
      pageIndex: response.pageIndex,
      pageSize: response.pageSize,
      data: response.data.map(subscription => {
        const licenseType: LicenseType = this.mapSubscriptionLicenseType(subscription.licenseType)
        const subscriptionStatus: SubscriptionStatus = this.mapSubscriptionStatus(subscription.subscriptionStatus)

        return {
          ...subscription,
          licenseType,
          subscriptionStatus
        }
      })
    }

    return subscriptionsListData
  }   

  private static mapSubscriptionLicenseType(value: number): LicenseType {
    if (value === 1) {
      return 'Full'
    }

    if (value === 2) {
      return 'Trial'
    }
            
    return 'Unknown'
  }

  private static mapSubscriptionStatus(value: number): SubscriptionStatus {
    if (value === 1) {
      return 'Active'
    }
            
    if (value === 2) {
      return 'Inactive'
    }
            
    if (value === 3) {
      return 'Pending'
    }
            
    if (value === 4) {
      return 'Rejected'
    }
            
    return 'Unknown'
  }
}

export default SubscriptionsResponseMapper