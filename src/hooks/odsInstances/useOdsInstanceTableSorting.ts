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
        const statusA = instancea.edFiStatus?.operationStatus || '';
        const statusB = instanceb.edFiStatus?.operationStatus || '';
        
        if (orderBy.order == 'desc') {
          return statusB.localeCompare(statusA)
        }

        return statusA.localeCompare(statusB)
      })  }
  
  const sortByEdFiVersion = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({ ...instance }))
      .sort((instancea, instanceb) => {
        const versionA = instancea.edFiVersion?.toString() || '';
        const versionB = instanceb.edFiVersion?.toString() || '';
        
        if (orderBy.order == 'desc') {
          return versionB.localeCompare(versionA)
        }

        return versionA.localeCompare(versionB)
      })
  }
  
  const sortByTsdsVersion = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({ ...instance }))
      .sort((instancea, instanceb) => {
        const versionA = instancea.tsdsVersion?.toString() || '';
        const versionB = instanceb.tsdsVersion?.toString() || '';
        
        if (orderBy.order == 'desc') {
          return versionB.localeCompare(versionA)
        }

        return versionA.localeCompare(versionB)
      })
  }
  const sortByInstanceName = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({ ...instance }))
      .sort((instancea, instanceb) => {        const nameA = instancea.instanceName || instancea.name || '';
        const nameB = instanceb.instanceName || instanceb.name || '';
        
        if (orderBy.order == 'desc') {
          return nameB.localeCompare(nameA)
        }

        return nameA.localeCompare(nameB)
      })
  }

  const sortByEdFiDataModels = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({ ...instance }))
      .sort((instancea, instanceb) => {
        const modelsA = (instancea.edFiDataModels || []).join(',');
        const modelsB = (instanceb.edFiDataModels || []).join(',');
        
        if (orderBy.order == 'desc') {
          return modelsB.localeCompare(modelsA)
        }

        return modelsA.localeCompare(modelsB)
      })
  }

  const sortByWorkerStatus = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({ ...instance }))
      .sort((instancea, instanceb) => {
        const statusA = instancea.workerStatus || '';
        const statusB = instanceb.workerStatus || '';
        
        if (orderBy.order == 'desc') {
          return statusB.localeCompare(statusA)
        }

        return statusA.localeCompare(statusB)
      })
  }
  const getSortedInstances = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    if (!instances || instances.length === 0) {
      return [];
    }
    
    if (orderBy.field === 'Status') {
      return sortByStatus(instances);
    }

    if (orderBy.field === 'EdFiVersion') {
      return sortByEdFiVersion(instances);
    }

    if (orderBy.field === 'TsdsVersion') {
      return sortByTsdsVersion(instances);
    }

    if (orderBy.field === 'InstanceName') {
      return sortByInstanceName(instances);
    }

    if (orderBy.field === 'EdFiDataModels') {
      return sortByEdFiDataModels(instances);
    }

    if (orderBy.field === 'WorkerStatus') {
      return sortByWorkerStatus(instances);
    }

    // Default sorting or Year sorting
    return instances;
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