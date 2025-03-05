// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  TEEAuthDataContext, UserProfileContext 
} from '@edfi/admin-console-shared-sdk'
import {
  useState, useEffect, useContext, ChangeEvent 
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { AppUser } from '../../../core/AppUser.types'
import { Subscription } from '../../../core/Subscription.types'
import { ActionParams } from '../../../services/AdminActions/adminAction.types'
import useUserService from '../../../services/AdminActions/Users/UsersService'
import {
  AssignLicenseRequest, RevokeLicenseRequest 
} from '../../../services/AdminActions/Users/UsersService.requests'
import useEDXToast from '../../common/useEDXToast'
import useUsersList from '../users/useUsersList'
import { UserSubscriber } from './useManageSubscribersForm.types'

export interface SubscriptionRoleOption {
    roleName: string 
    isAvailableForTenants: boolean 
}

const isUserSubscribed = (user: AppUser, subscriptionId: string) => {
  const index = user.licenses.findIndex(license => license.tenantSubscriptionId === subscriptionId)

  return {
    index, 
    isSubscribed: index !== -1
  }
}

const findSelectedRole = (user: AppUser, subscriptionIndex: number) => {
  // console.log('available roles for application', user.licenses[subscriptionIndex].applicationRole)

  if (user.licenses[subscriptionIndex].applicationRole.length > 0) {
    const selectedRole = user.licenses[subscriptionIndex].applicationRole[0].role

    return selectedRole
  }

  return ''
}

const generateSubscriptionRoleOptionsList = (subscription: Subscription): SubscriptionRoleOption[] => {
  const subscriptionRoles: SubscriptionRoleOption[] = subscription.applicationRoles
    .map(role => {
      const roleOption: SubscriptionRoleOption = {
        roleName: role.roleName ?? '',
        isAvailableForTenants: role.isAvailableForTenants
      }

      return roleOption
    })

  subscriptionRoles.unshift({
    roleName: 'Select Role',
    isAvailableForTenants: true 
  })

  return subscriptionRoles
}

const generateUsersSubscriptionList = (userList: AppUser[], subscriptionId: string): UserSubscriber[] => {
  const usubscribersList: UserSubscriber[] = userList.map(user => {
    const { isSubscribed, index } = isUserSubscribed(user, subscriptionId)

    const usub: UserSubscriber = {
      userId: user.userId,
      name: `${user.firstName} ${user.lastName}`,
      subscribed: isSubscribed,
      email: user.email
    }

    if (isSubscribed) {
      usub.selectedRole = findSelectedRole(user, index)
    }

    return usub
  })

  return usubscribersList
}

interface UseManageSubscribersFormProps {
    selectedSubscription: Subscription | null
    onAfterSave: () => void
}

const useManageSubscribersForm = ({ selectedSubscription, onAfterSave }: UseManageSubscribersFormProps) => {
  const { assignLicense, revokeLicense } = useUserService()
  const { usersList } = useUsersList()
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const { userProfile } = useContext(UserProfileContext)
  const [ initialUserSubscriptionList, setInitialUsersSubscriptionList ] = useState<UserSubscriber[]>([])
  const [ usersSubscriptionList, setUsersSubscriptionList ] = useState<UserSubscriber[]>([])
  const [ subscriptionRoleOptions, setSubscriptionRoleOptions ] = useState<SubscriptionRoleOption[]>([])
  const [ searchText, setSearchText ] = useState('')
  const { successToast, errorToast } = useEDXToast()
  const [ isSavingChanges, setIsSavingChanges ] = useState(false)

  const onSelectRoleForUser = (userId: string, role: string) => {
    console.log('selected role for user', userId, role)
    const nusersSubscriptionList = usersSubscriptionList.map(user => ({ ...user }))
    const userIndex = nusersSubscriptionList.findIndex(user => user.userId === userId)

    if (role === 'Select Role') {
      return
    } 

    if (userIndex !== -1) {
      if (nusersSubscriptionList[userIndex].subscribed) {
        nusersSubscriptionList[userIndex].selectedRole = role
        console.log('set subscriptions list')
                
        setUsersSubscriptionList(nusersSubscriptionList)
      }
    }
  }

  const onToggleSubscription = (userId: string) => {
    console.log('userid', userId)
    const nusersSubscriptionList = usersSubscriptionList.map(user => ({ ...user }))
    const userIndex = nusersSubscriptionList.findIndex(user => user.userId === userId)

    if (userIndex !== -1) {
      nusersSubscriptionList[userIndex].subscribed = !nusersSubscriptionList[userIndex].subscribed
      if (nusersSubscriptionList[userIndex].subscribed) {
        nusersSubscriptionList[userIndex].selectedRole = subscriptionRoleOptions.length > 0? subscriptionRoleOptions[0].roleName : ''
      } else {
        delete nusersSubscriptionList[userIndex].selectedRole
      }

      console.log('list after toggle', nusersSubscriptionList)

      setUsersSubscriptionList(nusersSubscriptionList)
    }
  }

  const onSearchUser = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)

  const selectAssignItems = (usersList: UserSubscriber[]): UserSubscriber[] => {
    const assignList: UserSubscriber[]=  []

    for (const user of usersList) {
      const index = usersList.findIndex(u => u.userId === user.userId)

      if (index !== -1 && !initialUserSubscriptionList[index].subscribed && usersList[index].subscribed) {
        assignList.push(usersList[index])
      }
    }

    return assignList
  }

  const selectRevokeItems = (usersList: UserSubscriber[]): UserSubscriber[] => {
    const revokeList: UserSubscriber[]=  []

    for (const user of usersList) {
      const index = usersList.findIndex(u => u.userId === user.userId)

      if (index !== -1 && initialUserSubscriptionList[index].subscribed && !usersList[index].subscribed) {
        revokeList.push(usersList[index])
      }
    }

    return revokeList
  }

  const sendAssignRequests = async (assignList: UserSubscriber[], actionParams: ActionParams) => {
    if (userProfile && selectedSubscription) {
      for (const user of assignList) {
        const roles: string[] = []

        if (user.selectedRole) {
          roles.push(user.selectedRole)
        }
    
        const requestData: AssignLicenseRequest = {
          tenantId: userProfile.tenantId,
          applicationId: selectedSubscription.applicationId,
          subscriptionId: selectedSubscription.subscriptionId,
          userId: user.userId,
          roles
        }

        console.log('assign request data for user', user.name, requestData)
    
        const resultAssign = await assignLicense(actionParams, requestData)
        console.log('assign result', user.name, resultAssign)

        return resultAssign
      }
    }

    return null
  }

  const sendRevokeRequests = async (revokeList: UserSubscriber[], actionParams: ActionParams) => {
    if (userProfile && selectedSubscription) {
      for (const user of revokeList) {
        const requestData: RevokeLicenseRequest = {
          tenantId: userProfile.tenantId,
          applicationId: selectedSubscription.applicationId,
          subscriptionId: selectedSubscription.subscriptionId,
          userId: user.userId
        }

        console.log('revoke request data for user', user.name, requestData)
    
        const resultRevoke = await revokeLicense(actionParams, requestData)
        console.log('revoke result', user.name, resultRevoke)
        return resultRevoke
      }
    }

    return null
  }

  const onSave = async () => {
    if (auth && auth.user && edxAppConfig && userProfile && selectedSubscription && adminConfig) {
      const assignList = selectAssignItems(usersSubscriptionList)
      const revokeList = selectRevokeItems(usersSubscriptionList)

      console.log('assign list', assignList)
      console.log('revoke list', revokeList)

      setIsSavingChanges(true)

      const assignResult = await sendAssignRequests(assignList, adminConfig.actionParams)
      const revokeResult = await sendRevokeRequests(revokeList, adminConfig.actionParams)

      setIsSavingChanges(false)

      if (assignResult && assignResult.type === 'Response') {
        successToast('Assigned Licenses.')
      } else if (assignResult && assignResult.type === 'Error') {
        errorToast(assignResult.actionMessage)
      }

      if (revokeResult && revokeResult.type === 'Response') {
        successToast('Revoked Licenses.')
      } else if (revokeResult && revokeResult.type === 'Error') {
        errorToast(revokeResult.actionMessage)
      }

      onAfterSave()
    }
  }   

  useEffect(() => {
    console.log('use effect', usersList, selectedSubscription)
    if (usersList.length > 0 && selectedSubscription) {
      console.log('use effect inside if', usersList, selectedSubscription)

      const userSubList = generateUsersSubscriptionList(usersList, selectedSubscription.subscriptionId)
      const initialSubList = userSubList.map(user => ({ ...user }))
      const roleOptions = generateSubscriptionRoleOptionsList(selectedSubscription)

      console.log('users subscription list', userSubList)
      console.log('subscription role list', roleOptions)

      setInitialUsersSubscriptionList(initialSubList)
      setUsersSubscriptionList(userSubList)
      setSubscriptionRoleOptions(roleOptions)
    }
  }, [ usersList ])

  return {
    usersSubscriptionList,
    subscriptionRoleOptions,
    onSelectRoleForUser,
    onSearchUser,
    onToggleSubscription,
    searchText,
    isSavingChanges,
    onSave
  }
}

export default useManageSubscribersForm