import ControlTable from '../ControlTable'

interface ManageUsersTableProps {
    headers: JSX.Element[]
    rows: JSX.Element
    itemsCount: number
    pagination: JSX.Element
    loading: boolean 
}

const ManageUsersTable = ({ headers, itemsCount, rows, loading, pagination }: ManageUsersTableProps) => {
  return (
    <ControlTable 
      headers={headers}
      itemsCount={itemsCount}
      loading={loading}
      pagination={pagination}
      rows={rows}
      thPadding="16px"
    />
  )
}

export default ManageUsersTable