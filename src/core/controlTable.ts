export type ControlTableSortType = "asc" | "desc"

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