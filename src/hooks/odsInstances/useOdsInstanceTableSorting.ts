import { useState } from 'react'
import { ControlTableSort, ControlTableSortType } from '../../core/controlTable'
import { ExtendedODSInstance } from '../../core/ODSInstance.types'
import useOdsInstanceYear from './useOdsInstanceYear'
import useOdsInstanceEdFiStatus from './useOdsInstanceEdFiStatus'

type ODSInstanceTableSortingField = 'Year' | 'Status' | 'IsDefault' | 'EdFiVersion' | 'TsdsVersion' | 'Provider'

const useOdsInstanceTableSorting = () => {
  const [ orderBy, setOrderBy ] = useState<ControlTableSort>({ 
    field: 'Year',
    order: 'desc',
  })

  const { getInstanceYear } = useOdsInstanceYear()

  const { getOnboardingStatusFromInstance } = useOdsInstanceEdFiStatus({
    instance: null,
    edFiMetadata: null
  })

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
        const instanceaStatus = getOnboardingStatusFromInstance(instancea)
        const instancebStatus = getOnboardingStatusFromInstance(instanceb)

        if (orderBy.order == 'desc')
          return instancebStatus.localeCompare(instanceaStatus)

        return instanceaStatus.localeCompare(instancebStatus)
      })
  }

  const sortByIsDefault = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({...instance}))
      .sort((instancea, instanceb) => {
        const vala = instancea.isDefault? 1 : 0
        const valb = instanceb.isDefault? 1 : 0

        if (orderBy.order == 'desc')
          return valb - vala

        return vala - valb
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

  const sortByProvider = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    return instances
      .map(instance => ({...instance}))
      .sort((instancea, instanceb) => {
        if (orderBy.order == 'desc')
          return instanceb.provider.localeCompare(instancea.provider)

        return instancea.provider.localeCompare(instanceb.provider)
      })
  }

  const getSortedInstances = (instances: ExtendedODSInstance[]): ExtendedODSInstance[] => {
    if (orderBy.field == 'Year')
      return sortByYear(instances)

    if (orderBy.field == 'Status')
      return sortByStatus(instances)

    if (orderBy.field == 'IsDefault')
      return sortByIsDefault(instances)

    if (orderBy.field == 'EdFiVersion')
      return sortByEdFiVersion(instances)

    if (orderBy.field == 'TsdsVersion')
      return sortByTsdsVersion(instances)

    if (orderBy.field == 'Provider')
      return sortByProvider(instances)

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