import { useAuth } from '@edfi/admin-console-shared-sdk'
import { useContext, useEffect, useState } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { AppUser } from '../../../core/AppUser.types'
import { ControlTableFilter, DataFetchParams } from '../../../core/controlTable'
import useUserService from '../../../services/AdminActions/Users/UsersService'
import { GetUsersListRequest } from '../../../services/AdminActions/Users/UsersService.requests'
import { ApiInvitation } from '../../../services/AdminActions/Users/UsersService.responses'
import useEDXToast from '../../common/useEDXToast'
import useControlTable from '../../controlTable/useControlTable'
import useHttpService from '../../http/useHttpService'
import useDebounce from '../../useDebounce'

export type UsersTableMode = 'users' | 'invitations'

type UserDataFilters = 'firstName' | 'lastName' | 'status' | 'email' | 'select filter'

const filterOptionsList: UserDataFilters[] = [
  'select filter',
  'firstName',
  'lastName',
  'email',
  'status'
]

const useManageUsersTable = () => {
  const adminConfig = useContext(adminConsoleContext)
  const { getUsersList } = useUserService()
  const {
    filterBy,
    setFilterBy,
    orderBy,
    initialPaginatedData,
    paginatedData,
    minPerPage,
    maxPerPage,
    totalPages,
    setPaginatedData,
    isFetchingData,
    setIsFetchingData,
    onChangeFilterValue,
    onDecrementPageSize,
    onIncrementPageSize,
    onChangePageSize,
    onSelectFilter,
    onSortAsc,
    onSortDesc,
    canNextPage,
    canPreviousPage,
    goToInitialPage,
    goToNextPage,
    goToPreviousPage,
    gotToLastPage
  } = useControlTable<AppUser, UserDataFilters>({ initialOrder: 'firstName' })
  const { errorToast } = useEDXToast()

  const { getAsync } = useHttpService()
  const [invitationsList, setInvitationsList] = useState<ApiInvitation[]>([])

  const inputTimeoutMiliseconds = 1000
  const debouncedPaginatedData = useDebounce(paginatedData, inputTimeoutMiliseconds)

  const onFilter = async () => {
    console.log('filter by', filterBy)

    if (filterBy) {
      const filterValue = filterBy.value.toLocaleLowerCase()

      if (filterBy.field !== 'status') {
        return await fetchUsersListOrInvitationsList({ 
          pageIndex: 0,
          pageSize: paginatedData.pageSize,
          orderBy,
          filterBy
        })
      }

      if (filterBy.field === 'status' && (filterValue === 'active' || filterValue === 'inactive' || filterValue === 'unknown')) {
        return await fetchUsersListOrInvitationsList({ 
          pageIndex: 0,
          pageSize: paginatedData.pageSize,
          orderBy,
          filterBy
        })
      }

      setPaginatedData({
        count: paginatedData.count,
        pageIndex: paginatedData.pageIndex,
        pageSize: paginatedData.pageSize,
        data: paginatedData.data
      })
    }
  }

  const onResetFilter = async () => {
    setFilterBy(null)

    await fetchUsersListOrInvitationsList({ 
      pageIndex: initialPaginatedData.pageIndex,
      pageSize: initialPaginatedData.pageSize,
      orderBy,
      filterBy: null
    })
  }

  const selectFilterStringStatus = (value: string) => {
    if (value === 'active')
      return 'Active'
        
    if (value === 'inactive')
      return 'Inactive'

    return 'Unknown'
  }

  const generateFilterString = ({ field, value }: ControlTableFilter<UserDataFilters>) => {
    if (field === 'status') {
      const status = selectFilterStringStatus(value.toLocaleLowerCase())

      return `tenants.any(tenantId = "${adminConfig?.actionParams.tenantId}" %26%26 status = "${status}")`
    }

    return `${field}.toLower().contains("${encodeURIComponent(value)}".toLower())`

  }

  const {user} = useAuth()

  const fetchUsersList = async ({ pageIndex, pageSize, orderBy, filterBy }: DataFetchParams<UserDataFilters>) => {
    if (adminConfig) {
      setIsFetchingData(true)
      // const users = await httpService.get({
      //   url: 'http://localhost:28080/admin/realms/myrealm/users',
      //   actionName: 'Get Users List',
      //   access_token: user?.access_token
      // })
      // console.log('users', users)
      const requestData: GetUsersListRequest = {
        pageIndex,
        pageSize,
        orderBy: orderBy? `${orderBy.field}+${orderBy.order}` : ''
      }

      if (filterBy)
        requestData.filter = generateFilterString(filterBy)

      const result = await getUsersList(adminConfig.actionParams, requestData)
      setIsFetchingData(false)

      if (result.type === 'Error')
        errorToast('Could not filter list. Select a filter and try again.')
      else {
        console.log('users list received', result.data)

        setPaginatedData({
          count: result.count,
          pageIndex: pageIndex,
          pageSize: pageSize,
          data: result.data
        })
      }
    }
  }

  const fetchUsersListOrInvitationsList = async ({ pageIndex, pageSize, orderBy, filterBy }: DataFetchParams<UserDataFilters>) => {
    return await fetchUsersList({ 
      pageIndex: pageIndex,
      pageSize: pageSize,
      orderBy,
      filterBy
    })
  }

  const onRefreshUserList = async () => {
    return await fetchUsersListOrInvitationsList({
      pageIndex: paginatedData.pageIndex,
      pageSize: paginatedData.pageSize,
      orderBy,
      filterBy: null
    })
  }

  useEffect(() => {
    fetchUsersList({
      pageIndex: paginatedData.pageIndex,
      pageSize: paginatedData.pageSize,
      orderBy,
      filterBy
    })
  }, [ debouncedPaginatedData.pageIndex, debouncedPaginatedData.pageSize, orderBy ])

  return {
    paginatedData,
    filterOptionsList,
    isFetchingData,
    invitationsList,
    orderBy,
    filterBy,
    onFilter,
    onResetFilter,
    onChangeFilterValue,
    onSelectFilter,
    onRefreshUserList,
    onSortAsc,
    onSortDesc,
    minPerPage,
    maxPerPage,
    goToInitialPage,
    goToPreviousPage,
    goToNextPage,
    gotToLastPage,
    canNextPage,
    canPreviousPage,
    onIncrementPageSize,
    onDecrementPageSize,
    onChangePageSize,
    totalPages
  }
}

export default useManageUsersTable