import { ChangeEvent, useEffect, useState } from 'react'
import { Subscription } from '../../../core/Subscription.types'
import formatDate from '../../../helpers/formatDate'
import useControlTablePagination from "../../controlTable/useControlTablePagination"
import useControlTableSorting from "../../controlTable/useControlTableSorting"
import useSubscriptionsList from "./useSubscriptionsList"

type FilterFieldOptionsType = "select filter" | "applicationName" | "licensesAmount" | "startDateTime" | "endDateTime" | "licenseType" | "subscriptionStatus"

interface FilterBy {
    value: string 
    field: FilterFieldOptionsType
}

const filterFields = [
    "applicationName",
    "licensesAmount",
    "startDateTime",
    "endDateTime",
    "licenseType",
    "subscriptionStatus"
]

const filterOptionsList = [
    "select filter",
    ...filterFields
]

const useManageSubscriptionsTable = () => {
    const { subscriptionsList, isFetchingSubscriptions, onRefreshSubscriptionsList } = useSubscriptionsList()
    const {
        sortedData,
        sortTextAsc,
        sortTextDesc,
        sortNumericDesc,
        sortNumericAsc,
        sortedByField,
        sortingType
    } = useControlTableSorting({ data: subscriptionsList })

    const [ filterBy, setFilterBy ] = useState<FilterBy | null>(null)
    const [ filteredData, setFilteredData ] = useState<Subscription[]>([])

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('value', e.target.value)

        setFilterBy({
            field: filterBy? filterBy.field : "select filter",
            value: e.target.value
        })
    }

    const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterBy({
            field: e.target.value as FilterFieldOptionsType,
            value: filterBy? filterBy.value : ""
        })
    }

    const onFilter = () => {
        console.log('filter by', filterBy)

        if (filterBy) {
            const sortedCopy: Subscription[] = sortedData.map(item => ({...item}))
            let filtered: Subscription[] = []

            if (filterBy.field === 'applicationName')
                filtered = sortedCopy.filter(subscription => subscription.applicationName.toLocaleLowerCase().includes(filterBy.value.toLocaleLowerCase()))
            else if (filterBy.field === "licensesAmount") {
                const numberValue = filterBy.value.toLocaleLowerCase() === 'unlimited'? -1 : parseInt(filterBy.value)

                if (isNaN(numberValue))
                    filtered = []
                else
                    filtered = sortedCopy.filter(subscription => subscription.numberOfLicenses === numberValue)
            }
            else if (filterBy.field === 'licenseType')
                filtered = sortedCopy.filter(subscription => subscription.licenseType.toLocaleLowerCase() === filterBy.value.toLocaleLowerCase())
            else if (filterBy.field === 'subscriptionStatus')
                filtered = sortedCopy.filter(subscription => subscription.subscriptionStatus.toLocaleLowerCase() === filterBy.value.toLocaleLowerCase())
            else if (filterBy.field === 'startDateTime')
                filtered = sortedCopy.filter(subscription => formatDate(subscription.startDateTime).includes(filterBy.value))
            else if (filterBy.field === 'endDateTime')
                filtered = sortedCopy.filter(subscription => formatDate(subscription.endDateTime).includes(filterBy.value))
            else 
                return 

            setFilteredData(filtered)
        }
    }

    const onResetFilter = async () => {
        setFilterBy(null)
        setFilteredData(sortedData)
    }

    useEffect(() => {
        if (filterBy) {
            onFilter()
        }
        else {
            setFilteredData(sortedData)
        }
    }, [ sortedData ])

    const {
        currentPage,
        pageSize,
        paginatedItems,
        totalPages,
        minPerPage,
        maxPerPage,
        onDecrementPageSize,
        onIncrementPageSize,
        onChangePageSize,
        canNextPage,
        canPreviousPage,
        goToInitialPage,
        goToNextPage,
        goToPreviousPage,
        gotToLastPage
    } = useControlTablePagination({ data: filteredData })

    return {
        subscriptionsList,
        isFetchingSubscriptions,
        onRefreshSubscriptionsList,
        sortedByField,
        sortingType,
        sortTextAsc,
        sortTextDesc,
        sortNumericAsc,
        sortNumericDesc,
        filterBy,
        filterOptionsList,
        onFilter,
        onChangeFilter,
        onChangeValue,
        onResetFilter,
        currentPage,
        pageSize,
        paginatedItems,
        totalPages,
        minPerPage,
        maxPerPage,
        onDecrementPageSize,
        onIncrementPageSize,
        onChangePageSize,
        canNextPage,
        canPreviousPage,
        goToInitialPage,
        goToNextPage,
        goToPreviousPage,
        gotToLastPage
    }
}

export default useManageSubscriptionsTable