import { Invitation } from "../../../../core/invitations/Invitation.types"
import useControlTableSorting from "../../../../hooks/controlTable/useControlTableSorting"
import ControlTable from "../../ControlTable"
import ControlTableHeader from "../../ControlTableHeader"
import InviteUsersTableRows from "./InviteUsersTableRows"

interface InviteUsersTableProps {
    invitationsList: Invitation[]
    isLoading: boolean 
}

const array = []

const InviteUsersTable = ({ invitationsList, isLoading }: InviteUsersTableProps) => {
    const {
        sortedData,
        sortingType,
        sortedByField,
        sortTextAsc,
        sortTextDesc
    } = useControlTableSorting({ data: invitationsList? invitationsList : array })

    return (
        <ControlTable
            headers={[
                <ControlTableHeader headerData={{ fieldName: 'email', text: 'Email', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
                <ControlTableHeader headerData={{ fieldName: 'firstName', text: 'First Name', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
                <ControlTableHeader headerData={{ fieldName: 'lastName', text: 'Last Name', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
                <ControlTableHeader headerData={{ fieldName: 'role', text: 'Role', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
                <ControlTableHeader headerData={{ fieldName: 'invitationStatus', text: 'Status', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />
            ]}
            itemsCount={sortedData.length}
            loading={isLoading}
            rows={<InviteUsersTableRows invitationsList={sortedData} />}
            thPadding='auto' />
    )
}

export default InviteUsersTable