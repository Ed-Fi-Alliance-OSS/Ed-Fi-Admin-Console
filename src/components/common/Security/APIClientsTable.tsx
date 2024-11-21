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
        <ControlTableHeader headerData={{
          fieldName: 'lea',
          text: 'ClientName',
          showSorting: true,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />,
        <ControlTableHeader headerData={{
          fieldName: 'lea',
          text: 'ClientId',
          showSorting: true,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />,
        <ControlTableHeader headerData={{
          fieldName: 'lea',
          text: 'Enabled',
          showSorting: true,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />,
        <ControlTableHeader headerData={{
          fieldName: 'lea',
          text: 'Created At',
          showSorting: true,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />,
      ]}
      pagination={<TablePagination 
        canNextPage={() => true}
        canPreviousPage={() => true}
        currentPage={1}
        goToInitialPage={() => null}
        goToLastPage={() => null}
        goToNextPage={() => null}
        goToPreviousPage={() => null}
        maxPageSize={5}
        minPageSize={5}
        pageSize={5}
        totalPages={10}
        onChangePageSize={() => null}
        onDecrementPageSize={() => null}
        onIncrementPageSize={() => null}
      />}
      itemsCount={apiClientList.length}
      loading={false}
      rows={<APIClientsTableRows apiClientList={apiClientList} />}
      thPadding="16px"
    />
  )
}

export default APIClientsTable