import { ExtendedODSInstance } from "../../../core/ODSInstance.types"
import { UpdatingIsDefaultStatus } from "../../../hooks/odsInstances/useOdsInstanceTable.types"
import ControlTable from "../ControlTable"
import ODSInstanceManagementTableRows from "./ODSInstanceManagementTableRows"
import { ODSInstanceTableMode } from "./ODSInstanceTable.types"

interface ODSInstanceManagementTableProps {
    tableMode: ODSInstanceTableMode
    tableHeaders: JSX.Element[]
    instanceList: ExtendedODSInstance[]
    selectedInstance: ExtendedODSInstance | null
    loading: boolean
    updatingIsDefault: UpdatingIsDefaultStatus
    onSelectInstance: (instance: ExtendedODSInstance) => void
    onOpenSetDefaultModal: (instanceId: string) => void
    onOpenSetUpModal: (instanceId: string) => void
}

const ODSInstanceManagementTable = ({ tableMode, tableHeaders, selectedInstance, instanceList, loading, updatingIsDefault, onSelectInstance, onOpenSetDefaultModal, onOpenSetUpModal }: ODSInstanceManagementTableProps) => {
    const filteredTableHeaders = (headers: JSX.Element[]) => {
        return headers.filter((header, index) => {
            if (tableMode == "Display") {
                if (index > 0)
                    return true

                return false
            }

            return index < 6
        })
    }

    return (
        <ControlTable 
            headers={filteredTableHeaders(tableHeaders)} 
            itemsCount={instanceList.length}
            thPadding='auto'
            loading={loading}
            rows={<ODSInstanceManagementTableRows 
                tableMode={tableMode}
                selectedInstance={selectedInstance}
                instanceList={instanceList}
                onSelectInstance={onSelectInstance}
                updatingIsDefault={updatingIsDefault}
                onOpenSetDefaultModal={onOpenSetDefaultModal}
                onOpenSetUpModal={onOpenSetUpModal} />} />
    )
}

export default ODSInstanceManagementTable