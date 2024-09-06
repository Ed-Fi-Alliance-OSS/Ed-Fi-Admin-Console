import { Flex } from "@chakra-ui/react"
import { TablePagination } from "@edwire/edx-portal-shared"
import { ControlTableSortType, SortByParams } from "../../../core/controlTable"
import { JobExecutionLogEntry } from "../../../core/UserSync/UserSync.types"
import ControlTableHeader from "../ControlTableHeader"
import RefreshBtn from "../RefreshBtn"
import { LogFilterTypeOption, LogFilterValues } from "./LogsInnerTable.types"
import LogsInnerTableFilterPopover from "./LogsInnerTableFilterPopover"
import LogsInnerTableRows from "./LogsInnerTableRows"
import UserSyncTable from "./UserSyncTable"

interface LogsInnerTableRowsProps {
    data: JobExecutionLogEntry[] 
    options: LogFilterTypeOption[]
    sortingType: ControlTableSortType 
    logFilterValues: LogFilterValues
    sortedByField: string 
    isFetchingData: boolean
    isDisabledFilter: boolean 
    pageIndex: number 
    pageSize: number 
    minPerPage: number 
    maxPerPage: number 
    totalPages: number 
    onChangeFilterOption: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void
    goToInitialPage: () => void
    goToLastPage: () => void
    goToNextPage: () => void
    goToPreviousPage: () => void
    canNextPage: () => boolean 
    canPreviousPage: () => boolean 
    onSortAsc: (params: SortByParams) => Promise<void>
    onSortDesc: (params: SortByParams) => Promise<void>
    onIncrementPageSize: () => void
    onDecrementPageSize: () => void
    onChangePageSize: (value: string | null | undefined) => void
    onRefreshLogs: () => void
    onFilter: () => void
}

const LogsInnerTable = ({ data, options, pageIndex, pageSize, totalPages, maxPerPage, minPerPage, logFilterValues, sortedByField, sortingType, canNextPage, canPreviousPage, isDisabledFilter, isFetchingData, onSortAsc, onSortDesc, onFilter, onChangeFilterOption, onChangeMessage, onRefreshLogs,  goToLastPage, goToInitialPage, goToNextPage, goToPreviousPage, onDecrementPageSize, onIncrementPageSize, onChangePageSize }: LogsInnerTableRowsProps) => {
    return (
        <Flex flexDir='column' w='full'>
            <Flex justifyContent='space-between' mb='12px' w='full'>
                <LogsInnerTableFilterPopover
                    logFilterValues={logFilterValues}
                    options={options}
                    isDisabledFilter={isDisabledFilter}
                    isFetchingData={isFetchingData}
                    onChangeFilterOption={onChangeFilterOption}
                    onChangeMessage={onChangeMessage}
                    onFilter={onFilter}
                    onResetFilter={onRefreshLogs} />
                <RefreshBtn 
                    id="refresh-btn" 
                    asFlex={true}
                    iconColor="gray.600"
                    isRefreshing={isFetchingData}
                    onAction={onRefreshLogs} />
            </Flex>
            <UserSyncTable
                headers={[
                    <ControlTableHeader headerData={{ text: 'Type', fieldName: 'applicationName', sortedByField, showSorting: false, sortingType, onSortAsc, onSortDesc }} />,
                    <ControlTableHeader headerData={{ text: 'Message', fieldName: 'licencesAmount', sortedByField, showSorting: false, sortingType, onSortAsc, onSortDesc }} />,
                    <ControlTableHeader headerData={{ text: 'Timestamp', fieldName: 'loggedDateTime', sortedByField, showSorting: true, sortingType, onSortAsc, onSortDesc }} />
                ]}
                itemsCount={data.length}
                loading={isFetchingData}
                rows={<LogsInnerTableRows
                    logs={data} />}
                pagination={<Flex ml='auto' w='auto'>
                <TablePagination 
                    currentPage={pageIndex + 1}
                    goToInitialPage={goToInitialPage}
                    goToLastPage={goToLastPage}
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
        </Flex>
    )
}

export default LogsInnerTable