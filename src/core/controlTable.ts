// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export type ControlTableSortType = 'asc' | 'desc'

export interface SortByParams {
    field: string 
}

export interface ControlTableSort {
    field: string 
    order: ControlTableSortType
}

export interface ControlTableFilter<TDataFilter> {
    field: TDataFilter
    value: string
}

export interface ControlTablePagination<TData> {
    pageIndex: number 
    pageSize: number 
    count: number
    data: TData[]
}

export interface DataFetchParams<TDataFilters> {
    pageIndex: number 
    pageSize: number 
    orderBy: ControlTableSort 
    filterBy: ControlTableFilter<TDataFilters> | null
}

export interface ControlTableHeaderField {
    fieldName: string 
    text: string 
    sortedByField: string
    showSorting: boolean
    sortingType: ControlTableSortType
    onSortAsc: (sortData: SortByParams) => void
    onSortDesc: (sortData: SortByParams) => void    
}

export type ControlTableRowCol = string | JSX.Element

export interface ControlTableRow {
    [key: string]: ControlTableRowCol 
}

export type ControlTableRowList = JSX.Element