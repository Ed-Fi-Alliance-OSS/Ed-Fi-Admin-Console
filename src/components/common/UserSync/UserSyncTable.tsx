import ControlTable from '../ControlTable'

interface UserSyncTableProps {
    headers: JSX.Element[]
    rows: JSX.Element
    itemsCount: number
    loading: boolean 
    pagination: JSX.Element
}

const UserSyncTable = ({ headers, itemsCount, rows, loading, pagination }: UserSyncTableProps) => {
  return (
    <ControlTable 
      headers={headers}
      itemsCount={itemsCount}
      rows={rows}
      thPadding="16px"
      loading={loading}
      pagination={pagination} />
  )
}

export default UserSyncTable