// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { TablePagination } from '@edfi/admin-console-shared-sdk'
import useEducationsOrganizations from '../../../hooks/adminActions/ods/useEducationOrganizations'
import useControlTablePagination from '../../../hooks/controlTable/useControlTablePagination'
import useControlTableSorting from '../../../hooks/controlTable/useControlTableSorting'
import ControlTable from '../ControlTable'
import ControlTableHeader from '../ControlTableHeader'
import EducationOrganizationsTableRows from './EducationOrganizationsTableRows'

const EducationOrganizationsTable = () => {
  const { educationOrganizationsList, isFetchingEducationOrganizations } = useEducationsOrganizations()

  const {
    sortedData,
    sortTextAsc,
    sortTextDesc,
    sortedByField,
    sortingType,
  } = useControlTableSorting({ data: educationOrganizationsList })

  const {
    paginatedItems,
    pageSize,
    currentPage,
    canNextPage,
    canPreviousPage,
    onDecrementPageSize,
    onIncrementPageSize,
    onChangePageSize,
    minPerPage,
    maxPerPage,
    totalPages,
    goToInitialPage,
    goToNextPage,
    goToPreviousPage,
    gotToLastPage
  } = useControlTablePagination({ data: sortedData })

  return (
    <ControlTable 
      headers={[
        <ControlTableHeader headerData={{
          text: 'Education Organization ID',
          fieldName: 'id',
          showSorting: true,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc,
          sortingType,
          sortedByField 
        }}
        />,
        <ControlTableHeader headerData={{
          text: 'Name of Institution',
          fieldName: 'name',
          showSorting: false,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc,
          sortingType,
          sortedByField 
        }}
        />,
        <ControlTableHeader headerData={{
          text: 'Short Name',
          fieldName: 'shortName',
          showSorting: false,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc,
          sortingType,
          sortedByField 
        }}
        />,
        <ControlTableHeader headerData={{
          text: 'Ed Org Category',
          fieldName: 'orgCategory',
          showSorting: false,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc,
          sortingType,
          sortedByField 
        }}
        />,
        <ControlTableHeader headerData={{
          text: 'LEA Category',
          fieldName: 'leaCategory',
          showSorting: false,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc,
          sortingType,
          sortedByField 
        }}
        />,
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
            onChangePageSize={onChangePageSize}
            onDecrementPageSize={onDecrementPageSize}
            onIncrementPageSize={onIncrementPageSize}
          />
        </Flex>}
      itemsCount={paginatedItems.length}
      loading={isFetchingEducationOrganizations}
      rows={<EducationOrganizationsTableRows organizationsList={paginatedItems} />}
      thPadding='auto'
    />
  )
}

export default EducationOrganizationsTable