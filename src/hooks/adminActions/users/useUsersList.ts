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
import { AppUser } from '../../../core/AppUser.types'
import useUsersService from '../../../services/AdminActions/Users/UsersService'
import { GetUsersListRequest } from '../../../services/AdminActions/Users/UsersService.requests'
import useEDXToast from '../../common/useEDXToast'

interface TablePaginationData {
    count: number 
    pageIndex: number 
    pageSize: number 
    orderBy: string 
    filter?: string
}

const useUsersList = () => {
  const { userProfile } = useContext(UserProfileContext)
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const { getUsersList } = useUsersService()
  const [ usersList, setUsersList ] = useState<AppUser[]>([])
  const adminConfig = useContext(adminConsoleContext)
  const [ isFetchingUsers, setIsFetchingUsers ] = useState(false)

  const [ paginationData, setPaginationData ] = useState<TablePaginationData>({
    count: 0,
    pageIndex: 0,
    pageSize: 100,
    orderBy: 'firstName+asc'
  })

  const { errorToast } = useEDXToast()

  const fetchUsersList = async () => {
    if (userProfile && auth && auth.user && edxAppConfig && adminConfig) {
      setIsFetchingUsers(true)

      const requestData: GetUsersListRequest = {
        pageIndex: paginationData.pageIndex,
        pageSize: paginationData.pageSize,
        orderBy: paginationData.orderBy
      }

      const result = await getUsersList(adminConfig.actionParams, requestData)
      setIsFetchingUsers(false)

      if (result.type === 'Error') {
        errorToast(result.actionMessage)
      } else {
        setUsersList([ ...result.data.data ])
        setPaginationData({
          ...paginationData, 
          pageSize: result.data.pageSize,
          count: result.data.count
        })
      }
    }
  }

  const onRefreshUserList = async () => await fetchUsersList()

  useEffect(() => {
    fetchUsersList()
  }, [])

  return {
    usersList,
    onRefreshUserList,
    isFetchingUsers
  }
}

export default useUsersList