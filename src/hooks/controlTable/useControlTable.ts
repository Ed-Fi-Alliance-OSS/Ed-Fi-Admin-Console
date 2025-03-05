// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  ChangeEvent, useState 
} from 'react'
import {
  ControlTableFilter, ControlTablePagination, ControlTableSort, ControlTableSortType, SortByParams 
} from '../../core/controlTable'

const initialPaginatedData = {
  pageIndex: 0,
  pageSize: 10,
  count: 0,
  data: [] 
}

interface UseControlTableParams {
    initialOrder: string
    initialOrderType?: 'asc' | 'desc'
    initialMinPerPage?: number 
    initialMaxPerPage?: number
    initialPageSize?: number 
}

const useControlTable = <TData, TDataFilters>({ initialOrder, initialOrderType, initialMaxPerPage, initialMinPerPage, initialPageSize }: UseControlTableParams) => {
  const [ filterBy, setFilterBy ] = useState<ControlTableFilter<TDataFilters> | null>(null)

  const [ orderBy, setOrderBy ] = useState<ControlTableSort>({
    field: initialOrder,
    order: initialOrderType ?? 'asc' 
  })

  const [ paginatedData, setPaginatedData ] = useState<ControlTablePagination<TData>>({
    ...initialPaginatedData,
    pageSize: initialPageSize ?? 10 
  })

  const [ isFetchingData, setIsFetchingData ] = useState(false)
  const [ minPerPage, setMinPerPage ] = useState(initialMinPerPage ?? 1)
  const [ maxPerPage, setMaxPerPage ] = useState(initialMaxPerPage ?? 100)
  const totalPages = Math.ceil(paginatedData.count / paginatedData.pageSize)

  const onSelectOrderBy = async (field: string, order: ControlTableSortType) => setOrderBy({
    field,
    order 
  })

  const onSortAsc = async (params: SortByParams) => await onSelectOrderBy(params.field, 'asc')
  const onSortDesc = async (params: SortByParams) => await onSelectOrderBy(params.field, 'desc')

  const onChangeFilterValue = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log('filter value', e.target.value)

    setFilterBy({
      field: filterBy? filterBy.field : 'select filter' as TDataFilters,
      value: e.target.value
    })
  }

  const onSelectFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    // console.log("select filter", e.target.value)
        
    if (e.target.value !== 'select filter') {
      setFilterBy({ 
        field: e.target.value as any,
        value: filterBy? filterBy.value : ''
      })
    }
  }

  const goToInitialPage = () => setPaginatedData({
    ...paginatedData,
    pageIndex: 0,
    data: [] 
  })

  const gotToLastPage = () => setPaginatedData({
    ...paginatedData,
    pageIndex: totalPages - 1,
    data: [] 
  })

  const goToNextPage = () => {
    if (paginatedData.pageIndex < totalPages) {
      setPaginatedData({
        ...paginatedData,
        pageIndex: paginatedData.pageIndex + 1,
        data: [] 
      })
    }
  }

  const goToPreviousPage = () => {
    if (paginatedData.pageIndex > 0) {
      setPaginatedData({
        ...paginatedData,
        pageIndex: paginatedData.pageIndex - 1,
        data: [] 
      })
    }
  }

  const canNextPage = () => {
    if (paginatedData.pageIndex < totalPages - 1) {
      return true
    }

    return false
  }

  const canPreviousPage = () => {
    if (paginatedData.pageIndex > 0) {
      return true
    } 
        
    return false
  }

  const onDecrementPageSize = () => {
    if (paginatedData.pageSize > minPerPage) {
      setPaginatedData({
        ...paginatedData,
        pageSize: paginatedData.pageSize - 1,
        pageIndex: 0 
      })
    }
  }

  const onIncrementPageSize = () => {
    if (paginatedData.pageSize < maxPerPage) {
      setPaginatedData({
        ...paginatedData,
        pageSize: paginatedData.pageSize + 1,
        pageIndex: 0 
      })
    }
  }

  const onChangePageSize = (value: string | null | undefined) => {
    if (!value) {
      return setPaginatedData({ 
        ...paginatedData, 
        pageSize: value as any, 
        pageIndex: 0 
      })
    }

    if (isNaN(value as any)) {
      return
    } 

    const numberValue = parseInt(value)

    if (numberValue <= maxPerPage) {
      setPaginatedData({ 
        ...paginatedData, 
        pageSize: numberValue, 
        pageIndex: 0 
      })
    }
  }

  return {
    orderBy,
    filterBy,
    setFilterBy,
    initialPaginatedData,
    paginatedData,
    setPaginatedData,
    isFetchingData,
    setIsFetchingData,
    minPerPage,
    maxPerPage,
    totalPages,
    onSelectOrderBy,
    onSelectFilter,
    onSortAsc,
    onSortDesc,
    onChangeFilterValue,
    gotToLastPage,
    goToInitialPage,
    goToNextPage,
    goToPreviousPage,
    canNextPage,
    canPreviousPage,
    onDecrementPageSize,
    onIncrementPageSize,
    onChangePageSize
  }
}

export default useControlTable