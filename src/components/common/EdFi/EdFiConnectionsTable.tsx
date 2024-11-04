import ControlTable from '../ControlTable'

interface EdFiConnectionsTableProps {
    headers: JSX.Element[]
    rows: JSX.Element
    itemsCount: number
    loading: boolean 
    pagination: JSX.Element
}

const EdFiConnectionsTable = ({ headers, itemsCount, rows, loading, pagination }: EdFiConnectionsTableProps) => {
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

export default EdFiConnectionsTable