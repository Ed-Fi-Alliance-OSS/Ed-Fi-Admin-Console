import ControlTable from "../ControlTable"

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
            rows={rows}
            itemsCount={itemsCount}
            thPadding="16px"
            loading={loading}
            pagination={pagination} />
    )
}

export default ManageUsersTable