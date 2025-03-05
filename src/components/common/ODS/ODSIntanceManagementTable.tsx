// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ODSInstance } from '../../../core/ODSInstance.types'
import { Tenant } from '../../../core/Tenant.types'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'
import ControlTable from '../ControlTable'
import ODSInstanceManagementTableRows from './ODSInstanceManagementTableRows'
import { ODSInstanceTableMode } from './ODSInstanceTable.types'

interface ODSInstanceManagementTableProps {
    tableMode: ODSInstanceTableMode
    tableHeaders: JSX.Element[]
    tenants: Tenant[]
    instanceList: ODSInstance[]
    selectedInstance: ODSInstance | null
    loading: boolean
    updatingIsDefault: UpdatingIsDefaultStatus
    onSelectInstance: (instance: ODSInstance) => void
    onOpenSetDefaultModal: (instanceId: string) => void
    onOpenSetUpModal: (instanceId: string) => void
}

const ODSInstanceManagementTable = ({ tenants, tableMode, tableHeaders, selectedInstance, instanceList, loading, updatingIsDefault, onSelectInstance, onOpenSetDefaultModal, onOpenSetUpModal }: ODSInstanceManagementTableProps) => {
  const filteredTableHeaders = (headers: JSX.Element[]) => {
    return headers.filter((header, index) => {
      if (tableMode == 'Display') {
        if (index > 0) {
          return true
        }

        return false
      }

      return index < 6
    })
  }

  return (
    <ControlTable 
      rows={<ODSInstanceManagementTableRows 
        instanceList={instanceList}
        selectedInstance={selectedInstance}
        tableMode={tableMode}
        tenants={tenants}
        updatingIsDefault={updatingIsDefault}
        onOpenSetDefaultModal={onOpenSetDefaultModal}
        onOpenSetUpModal={onOpenSetUpModal}
        onSelectInstance={onSelectInstance}
      />} 
      headers={filteredTableHeaders(tableHeaders)}
      itemsCount={instanceList?.length ?? 0}
      loading={loading}
      thPadding='auto'
    />
  )
}

export default ODSInstanceManagementTable