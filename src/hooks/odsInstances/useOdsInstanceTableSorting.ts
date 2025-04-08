// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useState } from 'react'
import {
  ControlTableSort, ControlTableSortType
} from '../../core/controlTable'
import { ExtendedODSInstance } from '../../core/ODSInstance.types'

type ODSInstanceTableSortingField = 'Year' | 'Status' | 'InstanceName' | 'EdFiVersion' | 'EdFiDataModels' | 'WorkerStatus'

const useOdsInstanceTableSorting = () => {
  const [ orderBy, setOrderBy ] = useState<ControlTableSort>({ 
    field: 'Year',
    order: 'desc',
  })

  const sortByStatus = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({ ...instance }))
      .sort((instancea, instanceb) => {
        
        if (orderBy.order == 'desc') {
          return instancea.edFiStatus.operationStatus.localeCompare(instanceb.edFiStatus.operationStatus)
        }

        return instanceb.edFiStatus.operationStatus.localeCompare(instancea.edFiStatus.operationStatus)
      })
  }

  const sortByEdFiVersion = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({ ...instance }))
      .sort((instancea, instanceb) => {
        if (orderBy.order == 'desc') {
          return instanceb.edFiVersion.toString().localeCompare(instancea.edFiVersion.toString())
        }

        return instancea.edFiVersion.toString().localeCompare(instanceb.edFiVersion.toString())
      })
  }

  const sortByTsdsVersion = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({ ...instance }))
      .sort((instancea, instanceb) => {
        if (orderBy.order == 'desc') {
          return instanceb.tsdsVersion.toString().localeCompare(instancea.tsdsVersion.toString())
        }

        return instancea.tsdsVersion.toString().localeCompare(instanceb.tsdsVersion.toString())
      })
  }

  const getSortedInstances = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    
    if (orderBy.field == 'Status') {
      return sortByStatus(instances)
    }

    if (orderBy.field == 'EdFiVersion') {
      return sortByEdFiVersion(instances)
    }

    if (orderBy.field == 'TsdsVersion') {
      return sortByTsdsVersion(instances)
    }

    return instances
  }

  const onOrderBy = (field: ODSInstanceTableSortingField, order: ControlTableSortType) => {
    setOrderBy({ 
      field, 
      order 
    })
  }

  return {
    orderBy,
    getSortedInstances,
    onOrderBy
  }
}

export default useOdsInstanceTableSorting