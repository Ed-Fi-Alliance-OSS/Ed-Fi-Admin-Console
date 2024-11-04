import { useContext, useEffect } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { DataFetchParams } from '../../../core/controlTable'
import { JobExecutionListResponse, JobExecutionLogEntry, JobListResponse, MessageType } from '../../../core/UserSync/UserSync.types'
import useUserSyncService from '../../../services/AdminActions/UserSync/UserSyncService'
import { GetEdFiSyncExecutionLogsRequest } from '../../../services/AdminActions/UserSync/UserSyncService.requests'
import useLogMessage from './useLogMessage'
import useControlTable from '../../controlTable/useControlTable' 
import useLogsInnerTableFilters from './useLogsInnerTableFilters'
import useDebounce from '../../useDebounce'

interface UseLogsInnerTableProps {
    job: JobListResponse
    jobExecution: JobExecutionListResponse
}

export type LogDataFilters = 'empty' | 'message'

const useLogsInnerTable = ({ job, jobExecution }: UseLogsInnerTableProps) => {
  const {
    orderBy,
    paginatedData,
    setPaginatedData,
    minPerPage,
    maxPerPage,
    totalPages,
    isFetchingData,
    setIsFetchingData,
    onDecrementPageSize,
    onIncrementPageSize,
    onChangePageSize,
    canNextPage,
    canPreviousPage,
    goToInitialPage,
    goToNextPage,
    goToPreviousPage,
    gotToLastPage,
    onSortDesc,
    onSortAsc,
  } = useControlTable<JobExecutionLogEntry, LogDataFilters>({ 
    initialPageSize: 100,
    initialOrder: 'loggedDateTime',
    initialOrderType: 'desc',
    initialMinPerPage: 1,
    initialMaxPerPage: 1000
  })

  const inputTimeoutMiliseconds = 1500
  const debouncedPaginatedData = useDebounce(paginatedData, inputTimeoutMiliseconds)

  const { mapLogMessageType } = useLogMessage()
  const adminConfig = useContext(adminConsoleContext)
  const {
    logFilterValues,
    options,
    onChangeFilterOption,
    onChangeMessage,
    onResetFilters
  } = useLogsInnerTableFilters()
  const {
    getEdFiSyncExecutionLogs,
  } = useUserSyncService()

  const converMessageTypeToFilterType = (messageType: MessageType | 'Any'): 'Information' | 'FatalError' | 'SyncError' | 'Warning' | null => {
    if (messageType === 'Fatal Error')
      return 'FatalError'

    if (messageType === 'Information')
      return 'Information'

    if (messageType === 'Sync Error')
      return 'SyncError'

    if (messageType === 'Warning')
      return 'Warning'

    return null
  }

  const generateRequestFilter = (): string | null => {
    const messageFilter = logFilterValues.messageText.length > 0? `message contains ${logFilterValues.messageText}` : null
    const messageType = converMessageTypeToFilterType(logFilterValues.messageType)
    const typeFilter = logFilterValues.messageType !== 'Any'? `messageType eq "${messageType}"` : null

    if (!messageFilter && !typeFilter)
      return null

    if (messageFilter && !typeFilter)
      return messageFilter

    if (!messageFilter && typeFilter)
      return typeFilter

    return `${typeFilter} and ${messageFilter}`
  }

  const fetchLogs = async ({ pageIndex, pageSize, orderBy, filterBy }: DataFetchParams<LogDataFilters>) => {
    if (!adminConfig)
      return 

    setIsFetchingData(true)
    setPaginatedData({
      pageIndex,
      pageSize,
      count: paginatedData.count,
      data: []
    })

    const request: GetEdFiSyncExecutionLogsRequest = {
      jobId: job.jobId,
      executionId: jobExecution.jobExecutionId,
      pageIndex: pageIndex,
      pageSize: pageSize,
      orderBy: `${orderBy.field} ${orderBy.order}`
    }

    if (filterBy) {
      const filter = generateRequestFilter()
      if (filter)
        request.filterBy = filter
    }

    const logsResult = await getEdFiSyncExecutionLogs(adminConfig.actionParams, request)
    setIsFetchingData(false)
        
    if (logsResult.type !== 'Response')
      return 
            
    setPaginatedData({
      pageIndex: logsResult.data.pageIndex,
      pageSize: logsResult.data.pageSize,
      count: logsResult.data.count,
      data: logsResult.data.data
    })
  }

  const onRefreshLogs = async () => {
    await fetchLogs({
      pageIndex: 0,
      pageSize: paginatedData.pageSize,
      orderBy,
      filterBy: null
    })

    onResetFilters()
  }
    
  const onFilter = async () => {
    await fetchLogs({
      pageIndex: 0, 
      pageSize: paginatedData.pageSize,
      orderBy,
      filterBy: { field: 'message', value: '' }
    })
  }

  const onChangePage = () => setIsFetchingData(true)

  const onGoToInitialPage = () => {
    onChangePage()
    goToInitialPage()
  }

  const onGoToPreviousPage = () => {
    onChangePage()
    goToPreviousPage()
  }

  const onGoToNextPage = () => {
    onChangePage()
    goToNextPage()
  }

  const onGoToLastPage = () => {
    onChangePage()
    gotToLastPage()
  }

  const isDisabledFilter = false

  useEffect(() => {
    fetchLogs({
      pageIndex: paginatedData.pageIndex,
      pageSize: paginatedData.pageSize,
      orderBy,
      filterBy: { field: 'message', value: '' }
    })
  }, [ debouncedPaginatedData.pageIndex, debouncedPaginatedData.pageSize, orderBy ])
    
  return {
    paginatedData, 
    minPerPage,
    maxPerPage,
    totalPages,
    isFetchingData,
    onDecrementPageSize,
    onIncrementPageSize,
    onChangePageSize,
    canNextPage,
    canPreviousPage,
    onGoToInitialPage,
    onGoToLastPage,
    onGoToNextPage,
    onGoToPreviousPage,
    mapLogMessageType,
    logFilterValues,
    options,
    isDisabledFilter,
    orderBy,
    onSortAsc,
    onSortDesc,
    onRefreshLogs,
    onChangeFilterOption,
    onChangeMessage,
    onFilter,
  }
}

export default useLogsInnerTable