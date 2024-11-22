import {
  useEffect, useState 
} from 'react'
import { AppUser } from '../../core/AppUser.types'
import { ControlTableSortType } from '../../core/controlTable'

interface UseControlTableSortingProps {
    data: any[]
}

export interface SortByParams {
    field: string 
}

const useControlTableSorting = ({ data }: UseControlTableSortingProps) => {
  const [ sortedData, setSortedData ] = useState([ ...data ])
  const [ sortedByField, setSortedByField ] = useState('')
  const [ sortingType, setSortingType ] = useState<ControlTableSortType>('asc')

  const sortTextDesc = ({ field }: SortByParams) => {
    const nsortedData = [ ...data ]

    nsortedData.sort((a, b) => b[field].localeCompare(a[field]))

    setSortedData(nsortedData)
    setSortedByField(field)
    setSortingType('desc')
  }

  const sortTextAsc = ({ field }: SortByParams) => {
    const nsortedData = [ ...data ]

    nsortedData.sort((a, b) => a[field].localeCompare(b[field]))

    setSortedData(nsortedData)
    setSortedByField(field)
    setSortingType('asc')
  }

  const sortNumericDesc = ({ field }) => {
    const nsortedData = [ ...data ]

    nsortedData.sort((a, b) => b[field] - a[field])

    setSortedData(nsortedData)
    setSortedByField(field)
    setSortingType('desc')
  }

  const sortNumericAsc = ({ field }) => {
    const nsortedData = [ ...data ]

    nsortedData.sort((a, b) => a[field] - b[field])

    setSortedData(nsortedData)
    setSortedByField(field)
    setSortingType('asc')
  }

  const sortByRoleDesc = ({ field }) => {
    const nsortedData: AppUser[] = [ ...data ]

    nsortedData.sort((a, b) => b.roles[0].localeCompare(a.roles[0]))

    setSortedData(nsortedData)
    setSortedByField(field)
    setSortingType('desc')
  }

  const sortByRoleAsc = ({ field }) => {
    const nsortedData: AppUser[] = [ ...data ]

    nsortedData.sort((a, b) => a.roles[0].localeCompare(b.roles[0]))

    setSortedData(nsortedData)
    setSortedByField(field)
    setSortingType('asc')
  }

  const sortByNumberOfAppsDesc = ({ field }) => {
    console.log('sort num desc')
    const nsortedData: AppUser[] = [ ...data ]

    nsortedData.sort((a, b) => b.licenses.length - a.licenses.length)

    setSortedData(nsortedData)
    setSortedByField(field)
    setSortingType('desc')
  }

  const sortByNumberOfAppsAsc = ({ field }) => {
    console.log('sort num asc')
    const nsortedData: AppUser[] = [ ...data ]

    nsortedData.sort((a, b) => a.licenses.length - b.licenses.length)

    setSortedData(nsortedData)
    setSortedByField(field)
    setSortingType('asc')
  }

  useEffect(() => {
    setSortedData([ ...data ])
  }, [ data ])

  return {
    sortedData,
    sortTextAsc,
    sortTextDesc,
    sortNumericDesc,
    sortNumericAsc,
    sortByNumberOfAppsAsc,
    sortByNumberOfAppsDesc,
    sortByRoleAsc,
    sortByRoleDesc,
    sortedByField,
    sortingType
  }
}

export default useControlTableSorting