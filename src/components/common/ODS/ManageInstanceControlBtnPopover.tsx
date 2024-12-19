import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'

interface ManageInstanceControlBtnPopoverProps {
    instanceId: string 
    isDefault: boolean 
    canSetAsDefault: boolean
    updatingIsDefault: UpdatingIsDefaultStatus
    onOpenSetDefaultModal: (instanceId: string) => void
}

const ManageInstanceControlBtnPopover = ({ instanceId, isDefault, canSetAsDefault, updatingIsDefault, onOpenSetDefaultModal }: ManageInstanceControlBtnPopoverProps) => {
  return (
    <></>
  )
}

export default ManageInstanceControlBtnPopover