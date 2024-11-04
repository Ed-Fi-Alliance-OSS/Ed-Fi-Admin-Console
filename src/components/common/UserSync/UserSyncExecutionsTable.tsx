import { Flex } from '@chakra-ui/react'
import { TablePagination } from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import { ControlTableSortType, SortByParams } from '../../../core/controlTable'
import { JobExecutionListResponse } from '../../../core/UserSync/UserSync.types'
import ControlTableHeader from '../ControlTableHeader'
import UserSyncTable from './UserSyncTable'
import UserSyncTableRows from './UserSyncTableRows'

interface UserSyncTableWrapperProps {
    data: JobExecutionListResponse[]
    sortingType: ControlTableSortType 
    sortedByField: string 
    isFetchingData: boolean
    pageIndex: number 
    pageSize: number 
    minPerPage: number 
    maxPerPage: number 
    totalPages: number 
    goToInitialPage: () => void
    gotToLastPage: () => void
    goToNextPage: () => void
    goToPreviousPage: () => void
    canNextPage: () => boolean 
    canPreviousPage: () => boolean 
    onSortAsc: (params: SortByParams) => Promise<void>
    onSortDesc: (params: SortByParams) => Promise<void>
    onShowLogs: (executionId: string) => void
    onIncrementPageSize: () => void
    onDecrementPageSize: () => void
    onChangePageSize: (value: string | null | undefined) => void
}

const UserSyncExecutionsTable = ({ data, pageIndex, pageSize, totalPages, maxPerPage, minPerPage, sortedByField, sortingType, isFetchingData, canNextPage, canPreviousPage, onShowLogs, onSortAsc, onSortDesc, gotToLastPage, goToInitialPage, goToNextPage, goToPreviousPage, onDecrementPageSize, onIncrementPageSize, onChangePageSize }: UserSyncTableWrapperProps) => {
  return (
    <UserSyncTable
      headers={[
        <ControlTableHeader headerData={{ text: 'Sync Start Time', fieldName: 'jobExecutionStartDateTime', sortedByField, showSorting: true, sortingType, onSortAsc, onSortDesc }} />,
        <ControlTableHeader headerData={{ text: 'Duration', fieldName: 'duration', sortedByField, showSorting: false, sortingType, onSortAsc, onSortDesc }} />,
        <ControlTableHeader headerData={{ text: 'Sync Status', fieldName: 'jobExecutionStatus', sortedByField, showSorting: false, sortingType, onSortAsc, onSortDesc }} />,
        <ControlTableHeader headerData={{ text: 'Execution Logs', fieldName: '', sortedByField, showSorting: false, sortingType, onSortAsc, onSortDesc }} justifyContent="flex-end" />
      ]}
      itemsCount={data.length}
      loading={isFetchingData}
      rows={<UserSyncTableRows
        executionsList={data}
        onShowLogs={onShowLogs} />}
      pagination={
        <Flex ml='auto' w='auto'>
          <TablePagination 
            currentPage={pageIndex}
            goToInitialPage={goToInitialPage}
            goToLastPage={gotToLastPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            pageSize={pageSize}
            onDecrementPageSize={onDecrementPageSize}
            onIncrementPageSize={onIncrementPageSize}
            totalPages={totalPages}
            maxPageSize={maxPerPage}
            minPageSize={minPerPage}
            onChangePageSize={onChangePageSize} />
        </Flex>} />
  )
}   

export default UserSyncExecutionsTable