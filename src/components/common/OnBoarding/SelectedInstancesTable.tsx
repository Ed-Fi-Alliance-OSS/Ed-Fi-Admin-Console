// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ODSInstanceTableMode } from '../ODS/ODSInstanceTable.types'
import ODSInstanceTableWrapper from '../ODS/ODSInstanceTableWrapper'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'
import SelectedInstancesTableModal from './SelectedInstancesTableModal'

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
        onClose={onClose}
        onContinue={onContinue}
      />

      <ODSInstanceTableWrapper
        pickedInstance={selectedInstance}
        tableMode={tableMode}
        onSelectInstance={onSelectInstance}
        onUpdateInstancesCount={onUpdateInstancesCount}
      />
    </>
  )
}

export default SelectedInstancesTable