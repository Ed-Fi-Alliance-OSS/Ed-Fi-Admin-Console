// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  ExtendedODSInstance, ODSInstance
} from '../../../core/ODSInstance.types'
import { Tenant } from '../../../core/Tenant.types'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'
import useValidateSetAsDefault from '../../../hooks/odsInstances/useValidateSetAsDefault'
import ControlTableRow from '../ControlTableRow'
import ODSInstanceManagementTableRowItem from './ODSInstanceManagementTableRowItem'
import { ODSInstanceTableMode } from './ODSInstanceTable.types'

interface ODSInstanceManagementTableRowsProps {
    tableMode: ODSInstanceTableMode
    instanceList: ODSInstance[]
    tenants: Tenant[]
    updatingIsDefault: UpdatingIsDefaultStatus
    selectedInstance: ExtendedODSInstance | null
    onSelectInstance: (instance: ExtendedODSInstance) => void
    onOpenSetDefaultModal: (instanceId: string) => void
    onOpenSetUpModal: (instanceId: string) => void
}

const ODSInstanceManagementTableRows = ({ tenants, tableMode, selectedInstance, instanceList, updatingIsDefault, onSelectInstance, onOpenSetDefaultModal, onOpenSetUpModal }: ODSInstanceManagementTableRowsProps) => {
  const {
    canSetAsDefault
  } = useValidateSetAsDefault()

  

  const filterInstancesFromMode = (instance: ExtendedODSInstance) => {
    if (tableMode != 'Show Selected') {
      return true
    } 

    return instance.odsInstanceId == selectedInstance?.odsInstanceId
  }

  return (
    <>
      {instanceList?.filter(instance => filterInstancesFromMode(instance))?.map((instance, index) => 
        <ControlTableRow key={index}>
          <ODSInstanceManagementTableRowItem
            key={index}
            canSetAsDefault={canSetAsDefault(instance, instanceList)}
            instance={instance}
            selectedInstance={selectedInstance}
            tableMode={tableMode}
            tenants={tenants}
            updatingIsDefault={updatingIsDefault}
            onOpenSetDefaultModal={onOpenSetDefaultModal}
            onOpenSetUpModal={onOpenSetUpModal}
            onSelectInstance={onSelectInstance}
          />
        </ControlTableRow>)}
    </>
  )
}

export default ODSInstanceManagementTableRows