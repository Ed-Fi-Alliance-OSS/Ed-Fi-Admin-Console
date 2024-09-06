import { Flex } from "@chakra-ui/react"
import { TablePagination } from "@edwire/edx-portal-shared"
import useDescriptors from "../../../hooks/adminActions/ods/useDescriptors"
import useControlTablePagination from "../../../hooks/controlTable/useControlTablePagination"
import useControlTableSorting from "../../../hooks/controlTable/useControlTableSorting"
import ControlTable from "../ControlTable"
import ControlTableHeader from "../ControlTableHeader"
import DescriptorsTableRows from "./DescriptorsTableRows"

const DescriptorsTable = () => {
    const { descriptorsList, isFetchingdescriptors } = useDescriptors()
    const {
        sortedData,
        sortTextAsc,
        sortTextDesc,
        sortedByField,
        sortingType
    } = useControlTableSorting({ data: descriptorsList })
    const {
        paginatedItems,
        pageSize,
        currentPage,
        goToInitialPage,
        goToNextPage,
        goToPreviousPage,
        gotToLastPage,
        onDecrementPageSize,
        onIncrementPageSize,
        onChangePageSize,
        maxPerPage,
        minPerPage,
        canNextPage,
        canPreviousPage,
        totalPages
    } = useControlTablePagination({ data: sortedData })

    return (
        <ControlTable 
            headers={[
                <ControlTableHeader headerData={{ text: 'Namespace', fieldName: 'namespace', showSorting: true, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
                <ControlTableHeader headerData={{ text: 'Code Value', fieldName: 'codeValue', showSorting: false, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
                <ControlTableHeader headerData={{ text: 'Description', fieldName: 'description', showSorting: false, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />,
                <ControlTableHeader headerData={{ text: 'Short Description', fieldName: 'shortDescription', showSorting: false, sortedByField, sortingType, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc }} />
            ]}
            itemsCount={paginatedItems.length}
            thPadding='auto'
            rows={<DescriptorsTableRows descriptorsList={paginatedItems} />}
            loading={isFetchingdescriptors}
            pagination={
                <Flex ml='auto' w='auto'>
                    <TablePagination 
                        currentPage={currentPage}
                        goToInitialPage={goToInitialPage}
                        goToLastPage={gotToLastPage}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                        canNextPage={canNextPage}
                        canPreviousPage={canPreviousPage}
                        pageSize={pageSize}
                        onDecrementPageSize={onDecrementPageSize}
                        onIncrementPageSize={onIncrementPageSize}
                        totalPages={totalPages}
                        maxPageSize={maxPerPage}
                        minPageSize={minPerPage} 
                        onChangePageSize={() => console.log('null')} />
                </Flex>} />
    )
}

export default DescriptorsTable