export interface PaginatedItemsViewModel<TData> {
    pageIndex: number 
    pageSize: number 
    count: number 
    data: TData[]
}