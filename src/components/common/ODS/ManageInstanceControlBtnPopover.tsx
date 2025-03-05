// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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