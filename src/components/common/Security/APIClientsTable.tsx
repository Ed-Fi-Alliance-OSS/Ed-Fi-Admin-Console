import { TablePagination } from '@edfi/admin-console-shared-sdk'
import useControlTableSorting from '../../../hooks/controlTable/useControlTableSorting'
import ControlTable from '../ControlTable'
import ControlTableHeader from '../ControlTableHeader'
import APIClientsTableRows from './APIClientsTableRows'

interface APIClientsTableProps {
    apiClientList: string[]
}

const APIClientsTable = ({ apiClientList }: APIClientsTableProps) => {
  const {
    sortedData,
    sortedByField,
    sortingType,
    sortTextAsc,
    sortTextDesc
  } = useControlTableSorting({ data: apiClientList })

  return (
    <ControlTable
      headers={[
        <ControlTableHeader headerData={{ fieldName: 'lea', text: 'ClientName', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
        <ControlTableHeader headerData={{ fieldName: 'lea', text: 'ClientId', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
        <ControlTableHeader headerData={{ fieldName: 'lea', text: 'Enabled', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
        <ControlTableHeader headerData={{ fieldName: 'lea', text: 'Created At', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
      ]}
      itemsCount={apiClientList.length}
      rows={<APIClientsTableRows apiClientList={apiClientList} />}
      loading={false}
      thPadding="16px"
      pagination={<TablePagination 
        currentPage={1}
        goToInitialPage={() => null}
        goToLastPage={() => null}
        goToNextPage={() => null}
        goToPreviousPage={() => null}
        canNextPage={() => true}
        canPreviousPage={() => true}
        pageSize={5}
        onDecrementPageSize={() => null}
        onIncrementPageSize={() => null}
        totalPages={10}
        maxPageSize={5}
        minPageSize={5}
        onChangePageSize={() => null} />}
    />
  )
}

export default APIClientsTable