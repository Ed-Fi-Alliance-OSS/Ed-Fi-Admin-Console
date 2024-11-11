import { useContext, useEffect, useState } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { JobExecutionListResponse, JobListResponse, Schedule } from '../../../core/UserSync/UserSync.types'
import useUserSyncService from '../../../services/AdminActions/UserSync/UserSyncService'
import { ExecuteEdFiSync, UpdateEdFiSyncRequest } from '../../../services/AdminActions/UserSync/UserSyncService.requests'
import useEDXToast from '../../common/useEDXToast'
import useControlTable from '../../controlTable/useControlTable' 
import useDebounce from '../../useDebounce'
import { edfiSyncJobInitialData, executionInitialData } from './UserSyncInitialData'

export type JobExecutionDataFilters = 'firstName' | 'lastName' | 'status' | 'email' | 'select filter'
export type SelectedUserSyncTable = 'Executions' | 'Logs'

const useUserSyncTable = () => {
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
  } = useControlTable<JobExecutionListResponse, JobExecutionDataFilters>({ 
    initialOrder: 'jobExecutionStartDateTime',
    initialOrderType: 'desc',
  })

  const [selectedTable, setSelectedTable] = useState<SelectedUserSyncTable>('Executions')
  const [edfiSyncJob, setEdFiSyncJob] = useState<JobListResponse>({...edfiSyncJobInitialData})
  const [selectedExecution, setSelectedExecution] = useState<JobExecutionListResponse>({...executionInitialData})
  const [isSaving, setIsSaving] = useState(false)
  const [enabledNightlySync, setEnabledNightlySync] = useState(false)
  const adminConfig = useContext(adminConsoleContext)
  const {
    getEdFiSync,
    getEdFiSyncById,
    getEdFiSyncExecutions,
    createEdFiSync,
    executeEdFiSync,
    updateEdFiSync
  } = useUserSyncService()
  const { successToast, errorToast } = useEDXToast()
  const [showConfigurationModal, setShowConfigurationModal] = useState(false)

  const inputTimeoutMiliseconds = 1000
  const debouncedPaginatedData = useDebounce(paginatedData, inputTimeoutMiliseconds)



  const onOpenConfigurationModal = async() => {
    setShowConfigurationModal(true)
        
    const currentEdFiSync = await fetchEdFiSyncJob()

    if (!currentEdFiSync)
      return 

    setEnabledNightlySync(currentEdFiSync.schedule.enabled)
  }
    
  const onCloseConfigurationModal = () => {
    setEnabledNightlySync(edfiSyncJob.schedule.enabled)
    setShowConfigurationModal(false)
  }

  const onShowLogs = async (executionId: string) => {
    const nexecution = paginatedData.data
      .find(execution => execution.jobExecutionId === executionId)
        
    if (!nexecution)
      return 
        
    setSelectedTable('Logs')
    setSelectedExecution({...nexecution})
  }

  const onReturn = () => {
    setSelectedExecution({...executionInitialData})
    setSelectedTable('Executions')
  }

  const fetchEdFiSyncJob = async (): Promise<JobListResponse | null> => {
    if (!adminConfig)
      return null

    const edfiSyncResult = await getEdFiSync(adminConfig.actionParams)

    if (edfiSyncResult.type !== 'Response')
      return null

    return edfiSyncResult.data
  }

  const createTenantEdFiSync = async () => {
    if (!adminConfig)
      return 

    const createEdFiSyncResult = await createEdFiSync(adminConfig.actionParams)

    if (createEdFiSyncResult.type !== 'Response')
      return errorToast('Failed to create sync job')

    const edfiSyncResult = await fetchEdFiSyncJob()

    if (!edfiSyncResult)
      return setIsFetchingData(false)

    setEdFiSyncJob(edfiSyncResult)
    setEnabledNightlySync(edfiSyncResult.schedule.enabled)

    await fetchExecutions(edfiSyncResult.jobId)
    setIsFetchingData(false)
  }

  const fetchEdFiSync = async () => {
    if (!adminConfig)
      return 

    setIsFetchingData(true)
    const edfiSyncResult = await fetchEdFiSyncJob()

    if (!edfiSyncResult)
      return await createTenantEdFiSync()

    setEdFiSyncJob(edfiSyncResult)
    setEnabledNightlySync(edfiSyncResult.schedule.enabled)

    await fetchExecutions(edfiSyncResult.jobId)

    setIsFetchingData(false)
  }

  const fetchExecutions = async (jobId: string) => {
    if (!adminConfig)
      return 

    const executionsResult = await getEdFiSyncExecutions(adminConfig.actionParams, {
      jobId,
      pageIndex: paginatedData.pageIndex,
      pageSize: paginatedData.pageSize,
      orderBy: orderBy? `${orderBy.field}+${orderBy.order}` : ''
    })

    if (executionsResult.type !== 'Response')
      return 

    setPaginatedData({
      data: executionsResult.data.data,
      pageIndex: paginatedData.pageIndex,
      pageSize: paginatedData.pageSize,
      count: executionsResult.data.count,
    })
  }

  const onManualSync = async () => {
    if (!adminConfig)
      return 

    const request: ExecuteEdFiSync = {
      jobId: edfiSyncJob.jobId
    }

    const executeEdFiSyncResult = await executeEdFiSync(adminConfig.actionParams, request)

    if (executeEdFiSyncResult.type !== 'Response')
      return errorToast('Failed to execute User Sync')

    successToast('Executed User Sync')
  }

  const onToggleNightlySync = () => setEnabledNightlySync(!enabledNightlySync)

  const onSave = async () => {
    if (!adminConfig)
      return 

    setIsSaving(true)

    const edfiSyncJobByIdResult = await getEdFiSyncById(adminConfig.actionParams, {
      jobId: edfiSyncJob.jobId
    })

    if (edfiSyncJobByIdResult.type !== 'Response')
      return errorToast('Failed to save changes')

    const jobById = edfiSyncJobByIdResult.data

    console.log('job by id', jobById)

    const updatedSchedule: Schedule = {...jobById.schedule}
    updatedSchedule.enabled = enabledNightlySync

    const request: UpdateEdFiSyncRequest = {
      tenantId: jobById.tenantId,
      name: jobById.name,
      jobId: jobById.jobId,
      sourceConnectionId: jobById.sourceConnectionId,
      destinationConnectionId: jobById.destinationConnectionId,
      profileId: jobById.profileId,
      jobPoints: jobById.jobPoints,
      applicationId: jobById.applicationId,
      dataRefreshType: jobById.dataRefreshType,
      dataRefreshSpecificDate: jobById.dataRefreshSpecificDate,
      maxApiRetry: jobById.maxApiRetry,
      jobMetadata: jobById.jobMetadata.map(metadata => ({...metadata})),
      maxApiFailure: jobById.maxApiFailure,
      schedule: updatedSchedule
    }

    const updateEdFiSyncResult = await updateEdFiSync(adminConfig.actionParams, request)

    if (updateEdFiSyncResult.type !== 'Response') {
      setEnabledNightlySync(edfiSyncJob.schedule.enabled)
      errorToast('Failed to save changes')
      return 
    }

    setIsSaving(false)
    successToast('Saved changes')
    onCloseConfigurationModal()
  }

  useEffect(() => {
    fetchEdFiSync()
  }, [ debouncedPaginatedData.pageIndex, debouncedPaginatedData.pageSize, orderBy ])

  return {
    edfiSyncJob,
    selectedTable,
    selectedExecution,
    filterBy,
    setFilterBy,
    orderBy,
    initialPaginatedData,
    paginatedData,
    minPerPage,
    maxPerPage,
    totalPages,
    enabledNightlySync,
    isFetchingData,
    isSaving,
    setIsFetchingData,
    showConfigurationModal,
    onOpenConfigurationModal,
    onCloseConfigurationModal,
    onManualSync,
    onToggleNightlySync,
    onSave,
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
    gotToLastPage,
    onShowLogs,
    onReturn
  }
}

export default useUserSyncTable