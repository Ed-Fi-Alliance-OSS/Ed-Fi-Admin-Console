import { JobExecutionListResponse, JobListResponse } from '../../../core/UserSync/UserSync.types'
import useLogsInnerTable from '../../../hooks/adminActions/userSync/useLogsInnerTable'
import ControlTableHeader from '../ControlTableHeader'
import LogsInnerTable from './LogsInnerTable'
import UserSyncLogsTableRows from './UserSyncLogsTableRows'
import UserSyncTable from './UserSyncTable'

interface UserSyncLogsTableProps {
    job: JobListResponse
    jobExecution: JobExecutionListResponse
}

const UserSyncLogsTable = ({ job, jobExecution }: UserSyncLogsTableProps) => {
  const {
    paginatedData, 
    logFilterValues,
    orderBy,
    options,
    isDisabledFilter,
    onSortAsc,
    onSortDesc,
    onRefreshLogs,
    onChangeFilterOption,
    onChangeMessage,
    onFilter,
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
  } = useLogsInnerTable({ job, jobExecution })

  return (
    <UserSyncTable
      headers={[
        <ControlTableHeader headerData={{ text: 'Sync Start Time', fieldName: 'applicationName', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
        <ControlTableHeader headerData={{ text: 'Duration', fieldName: 'licencesAmount', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
        <ControlTableHeader headerData={{ text: 'Sync Status', fieldName: 'endDateTime', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />
      ]}
      itemsCount={1}
      loading={false}
      rows={<UserSyncLogsTableRows
        execution={jobExecution} /> }
      pagination={<LogsInnerTable 
        data={paginatedData.data}
        options={options}
        pageIndex={paginatedData.pageIndex}
        goToInitialPage={onGoToInitialPage}
        goToLastPage={onGoToLastPage}
        goToNextPage={onGoToNextPage}
        goToPreviousPage={onGoToPreviousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageSize={paginatedData.pageSize}
        onDecrementPageSize={onDecrementPageSize}
        onIncrementPageSize={onIncrementPageSize}
        onChangePageSize={onChangePageSize}
        totalPages={totalPages}
        maxPerPage={maxPerPage}
        minPerPage={minPerPage}
        logFilterValues={logFilterValues}
        isFetchingData={isFetchingData}
        isDisabledFilter={isDisabledFilter}
        sortedByField={orderBy.field}
        sortingType={orderBy.order} 
        onChangeFilterOption={onChangeFilterOption}
        onChangeMessage={onChangeMessage}
        onSortAsc={onSortAsc}
        onSortDesc={onSortDesc}
        onFilter={onFilter}
        onRefreshLogs={onRefreshLogs} />} />
  )
}

export default UserSyncLogsTable