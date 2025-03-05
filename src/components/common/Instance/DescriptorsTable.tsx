// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { TablePagination } from '@edfi/admin-console-shared-sdk'
import useDescriptors from '../../../hooks/adminActions/ods/useDescriptors'
import useControlTablePagination from '../../../hooks/controlTable/useControlTablePagination'
import useControlTableSorting from '../../../hooks/controlTable/useControlTableSorting'
import ControlTable from '../ControlTable'
import ControlTableHeader from '../ControlTableHeader'
import DescriptorsTableRows from './DescriptorsTableRows'

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
        <ControlTableHeader headerData={{
          text: 'Namespace',
          fieldName: 'namespace',
          showSorting: true,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />,
        <ControlTableHeader headerData={{
          text: 'Code Value',
          fieldName: 'codeValue',
          showSorting: false,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />,
        <ControlTableHeader headerData={{
          text: 'Description',
          fieldName: 'description',
          showSorting: false,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />,
        <ControlTableHeader headerData={{
          text: 'Short Description',
          fieldName: 'shortDescription',
          showSorting: false,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />
      ]}
      pagination={
        <Flex
          ml='auto'
          w='auto'
        >
          <TablePagination 
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            currentPage={currentPage}
            goToInitialPage={goToInitialPage}
            goToLastPage={gotToLastPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            maxPageSize={maxPerPage}
            minPageSize={minPerPage}
            pageSize={pageSize}
            totalPages={totalPages}
            onChangePageSize={() => console.log('null')}
            onDecrementPageSize={onDecrementPageSize} 
            onIncrementPageSize={onIncrementPageSize}
          />
        </Flex>}
      itemsCount={paginatedItems.length}
      loading={isFetchingdescriptors}
      rows={<DescriptorsTableRows descriptorsList={paginatedItems} />}
      thPadding='auto'
    />
  )
}

export default DescriptorsTable