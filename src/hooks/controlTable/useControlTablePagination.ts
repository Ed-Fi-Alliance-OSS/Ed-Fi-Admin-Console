import { ChangeEvent, useEffect, useState } from "react"

interface UseControlTablePaginationProps {
    data: any[]
}

const useControlTablePagination = ({ data }: UseControlTablePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [minPerPage, setMinPerPage] = useState(1)
    const [maxPerPage, setMaxPerPage] = useState(100)
    
    const totalPages = Math.ceil(data.length / pageSize)
    const indexOfLastItem = currentPage * pageSize
    const indexOfFirstItem = indexOfLastItem - pageSize
    const paginatedItems= [...data].slice(indexOfFirstItem, indexOfLastItem)

    const goToInitialPage = () => setCurrentPage(1)
    const gotToLastPage = () => setCurrentPage(totalPages)
    const goToNextPage = () => {
        if (currentPage < totalPages)
            setCurrentPage(currentPage + 1)
    }
    const goToPreviousPage = () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1)
    }

    const canNextPage = () => {
        if (currentPage < totalPages)
            return true

        return false
    }

    const canPreviousPage = () => {
        if (currentPage > 1)
            return true 
        
        return false
    }

    const onDecrementPageSize = () => {
        if (pageSize > minPerPage) {
            setCurrentPage(1)
            setPageSize(pageSize - 1)
        }
    }

    const onIncrementPageSize = () => {
        if (pageSize < maxPerPage) {
            setCurrentPage(1)
            setPageSize(pageSize + 1)
        }
    }

    const onChangePageSize = (value: string | null | undefined) => {
        if (!value) {
            setCurrentPage(1)
            setPageSize(0)
            return 
        }

        if (isNaN(value as any))
            return 

        const numberValue = parseInt(value)

        if (numberValue <= maxPerPage) {
            setCurrentPage(1)
            setPageSize(numberValue)
        }
    }

    useEffect(() => {
        if (currentPage > totalPages)
            return setCurrentPage(totalPages)

        if (currentPage === 0 && totalPages > 0)
            return setCurrentPage(1)
    }, [ data ])
    
    return {
        currentPage,
        pageSize,
        paginatedItems,
        totalPages,
        goToInitialPage,
        gotToLastPage,
        goToNextPage,
        goToPreviousPage,
        canNextPage,
        canPreviousPage,
        onDecrementPageSize,
        onIncrementPageSize,
        onChangePageSize,
        minPerPage,
        maxPerPage
    }
}

export default useControlTablePagination