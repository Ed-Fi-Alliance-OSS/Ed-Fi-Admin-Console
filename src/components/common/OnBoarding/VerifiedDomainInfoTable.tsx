import { VerifiedDomainInfo } from "../../../core/verifyDomain/VerifyDomain.types"
import useControlTableSorting from "../../../hooks/controlTable/useControlTableSorting"
import ControlTable from "../ControlTable"
import ControlTableHeader from "../ControlTableHeader"
import VerifiedDomainTableRows from "./VerifiedDomainTableRows"

interface VerifiedDomainInfoTableProps {
    verifiedDomainsList: VerifiedDomainInfo[]
}

const VerifiedDomainInfoTable = ({ verifiedDomainsList }: VerifiedDomainInfoTableProps) => {
    const { 
        sortedData,
        sortedByField,
        sortingType,
        sortTextAsc,
        sortTextDesc
    } = useControlTableSorting({ data: verifiedDomainsList })

    return (
        <ControlTable
            headers={[
                <ControlTableHeader headerData={{ fieldName: 'lea', text: 'LEA', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
                <ControlTableHeader headerData={{ fieldName: 'domain', text: 'Domain', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
                <ControlTableHeader headerData={{ fieldName: 'status', text: 'Status', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
            ]}
            itemsCount={sortedData.length}
            loading={false}
            rows={<VerifiedDomainTableRows 
                verifiedDomains={sortedData} />}
            thPadding='auto' />
    )
}

export default VerifiedDomainInfoTable