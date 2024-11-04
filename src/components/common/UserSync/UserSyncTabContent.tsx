import { Flex } from '@chakra-ui/react'
import useUserSyncTable from '../../../hooks/adminActions/userSync/useUserSyncTable'
import ConsoleModal from '../ConsoleModal'
import UserSyncConfigureModal from './UserSyncConfigureModal'
import UserSyncExecutionsTable from './UserSyncExecutionsTable'
import UserSyncLogsTable from './UserSyncLogsTable'
import UserSynTabHeader from './UserSyncTabHeader'

const UserSyncTabContent = () => {
  const {
    paginatedData,
    selectedTable,
    edfiSyncJob,
    selectedExecution,
    orderBy,
    minPerPage,
    maxPerPage,
    totalPages,
    enabledNightlySync,
    isFetchingData,
    isSaving,
    showConfigurationModal,
    onDecrementPageSize,
    onIncrementPageSize,
    onChangePageSize,
    onSortAsc,
    onSortDesc,
    canNextPage,
    canPreviousPage,
    goToInitialPage,
    goToNextPage,
    goToPreviousPage,
    gotToLastPage,
    onCloseConfigurationModal,
    onOpenConfigurationModal,
    onManualSync,
    onToggleNightlySync,
    onSave,
    onShowLogs,
    onReturn
  } = useUserSyncTable()

  return (
    <Flex flexDir='column' w='full'>
      <ConsoleModal 
        content={<UserSyncConfigureModal
          isSaving={isSaving}
          enabledNightlySync={enabledNightlySync}
          onToggleNightlySync={onToggleNightlySync}
          onSave={onSave}
          onClose={onCloseConfigurationModal} />}
        show={showConfigurationModal} 
        onClose={onCloseConfigurationModal} />
      <UserSynTabHeader
        selectedTable={selectedTable}
        onConfigure={onOpenConfigurationModal}
        onManualSync={onManualSync}
        onReturn={onReturn} />
      <Flex flexDir='column' mt='24px'>
        { selectedTable === 'Executions' && <UserSyncExecutionsTable 
          data={paginatedData.data}
          pageIndex={paginatedData.pageIndex + 1}
          pageSize={paginatedData.pageSize}
          sortedByField={orderBy.field}
          sortingType={orderBy.order}
          minPerPage={minPerPage}
          maxPerPage={maxPerPage}
          totalPages={totalPages}
          isFetchingData={isFetchingData}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          onIncrementPageSize={onIncrementPageSize}
          onDecrementPageSize={onDecrementPageSize}
          onChangePageSize={onChangePageSize}
          onShowLogs={onShowLogs}
          onSortAsc={onSortAsc}
          onSortDesc={onSortDesc}
          goToInitialPage={goToInitialPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          gotToLastPage={gotToLastPage} /> }
        { selectedTable === 'Logs' && <UserSyncLogsTable
          job={edfiSyncJob}
          jobExecution={selectedExecution} /> }
      </Flex>
    </Flex>
  )
}

export default UserSyncTabContent