import ControlTable from '../ControlTable'

interface ManageSubscriptionsTableProps {
    headers: JSX.Element[]
    rows: JSX.Element
    itemsCount: number
    loading: boolean 
    pagination: JSX.Element
}

const ManageSubscriptionsTable = ({ headers, rows, loading, itemsCount, pagination }: ManageSubscriptionsTableProps) => {
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

export default ManageSubscriptionsTable