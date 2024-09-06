import { ODSInstanceTableMode } from "../ODS/ODSInstanceTable.types"
import ODSInstanceTableWrapper from "../ODS/ODSInstanceTableWrapper"
import { ExtendedODSInstance } from "../../../core/ODSInstance.types"
import SelectedInstancesTableModal from "./SelectedInstancesTableModal"

interface SelectedInstancesTableProps {
    tableMode: ODSInstanceTableMode
    selectedInstance: ExtendedODSInstance | null
    showConfirmInstanceModal: boolean 
    settingAsDefault: boolean 
    onSelectInstance: (instance: ExtendedODSInstance) => void
    onUpdateInstancesCount: (count: number) => void
    onContinue: () => void
    onClose: () => void
}

const SelectedInstancesTable = ({ tableMode, selectedInstance, settingAsDefault, showConfirmInstanceModal, onSelectInstance, onUpdateInstancesCount, onContinue, onClose }: SelectedInstancesTableProps) => {
    return (
        <>
            <SelectedInstancesTableModal
                selectedInstance={selectedInstance}
                settingAsDefault={settingAsDefault}
                showConfirmInstanceModal={showConfirmInstanceModal}
                onContinue={onContinue}
                onClose={onClose} />
            <ODSInstanceTableWrapper
                pickedInstance={selectedInstance}
                tableMode={tableMode}
                onSelectInstance={onSelectInstance}
                onUpdateInstancesCount={onUpdateInstancesCount} />
        </>
    )
}

export default SelectedInstancesTable