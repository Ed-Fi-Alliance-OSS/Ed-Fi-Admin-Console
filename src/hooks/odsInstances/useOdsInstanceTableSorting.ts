import { useState } from 'react'
import { ControlTableSort, ControlTableSortType } from '../../core/controlTable'
import { ExtendedODSInstance } from '../../core/ODSInstance.types'
import useOdsInstanceYear from './useOdsInstanceYear'

type ODSInstanceTableSortingField = 'Year' | 'Status' | 'EdFiVersion' | 'TsdsVersion'

const useOdsInstanceTableSorting = () => {
  const [ orderBy, setOrderBy ] = useState<ControlTableSort>({ 
    field: 'Year',
    order: 'desc',
  })

  const { getInstanceYear } = useOdsInstanceYear()

  const sortByYear = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({...instance}))
      .sort((instancea, instanceb) => {
        const instanceaYear = getInstanceYear(instancea)
        const instancebYear = getInstanceYear(instanceb)

        if (instanceaYear == null || instancebYear == null)
          return 0

        if (instanceaYear == null && instancebYear != null)
          return 1

        if (instanceaYear != null && instancebYear == null)
          return -1 

        if (orderBy.order == 'desc')
          return instancebYear - instanceaYear

        return instanceaYear - instancebYear
      })
  }

  const sortByStatus = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({...instance}))
      .sort((instancea, instanceb) => {
        
        if (orderBy.order == 'desc')
          return instancea.edFiStatus.operationStatus.localeCompare(instanceb.edFiStatus.operationStatus)

        return instanceb.edFiStatus.operationStatus.localeCompare(instancea.edFiStatus.operationStatus)
      })
  }

  const sortByEdFiVersion = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({...instance}))
      .sort((instancea, instanceb) => {
        if (orderBy.order == 'desc')
          return instanceb.edFiVersion.localeCompare(instancea.edFiVersion)

        return instancea.edFiVersion.localeCompare(instanceb.edFiVersion)
      })
  }

  const sortByTsdsVersion = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({...instance}))
      .sort((instancea, instanceb) => {
        if (orderBy.order == 'desc')
          return instanceb.tsdsVersion.localeCompare(instancea.tsdsVersion)

        return instancea.tsdsVersion.localeCompare(instanceb.tsdsVersion)
      })
  }

  const getSortedInstances = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    if (orderBy.field == 'Year')
      return sortByYear(instances)

    if (orderBy.field == 'Status')
      return sortByStatus(instances)

    if (orderBy.field == 'EdFiVersion')
      return sortByEdFiVersion(instances)

    if (orderBy.field == 'TsdsVersion')
      return sortByTsdsVersion(instances)

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