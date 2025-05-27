// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Accordion,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'
import { TablePagination } from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { DeletingState } from '../../../core/deletingState.types'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'
import { EdfiVendorWithApplications } from '../../../hooks/adminActions/edfi/usePartnersAndApplicationsAccordion.types'
import useControlTablePagination from '../../../hooks/controlTable/useControlTablePagination'
import useControlTableSorting from '../../../hooks/controlTable/useControlTableSorting'
import AccordionItemSkeleton from '../AccordionItemSkeleton'
import ApplicationDetailsTable from './ApplicationDetailsTable'
import PartnersAndApplicationAccordionHeader from './PartnersAndApplicationAccordionHeader'

interface PartnersAndApplicationAccordionProps {
    vendorsWithApplicationsList: EdfiVendorWithApplications[]
    loading: boolean 
    isDeletingVendor: DeletingState 
    isDeletingApplication: DeletingState
    onSelectVendor: (partnerId: number) => void
    onEditVendor: (partner: EdfiVendorWithApplications) => void
    onEditApplication: (application: EdfiApplication) => void
    onDeleteVendor: (partnerId: string) => void
    onDeleteApplication: (applicationId: string) => void
    onAddApplication: () => void
}

const PartnersAndApplicationAccordion = ({ 
  vendorsWithApplicationsList, 
  loading, 
  isDeletingApplication, 
  isDeletingVendor: isDeletingPartner, 
  onSelectVendor: onSelectPartner, 
  onEditVendor, 
  onDeleteVendor, 
  onDeleteApplication, 
  onEditApplication, 
  onAddApplication 
}: PartnersAndApplicationAccordionProps) => {
  const adminConfig = useContext(adminConsoleContext)

  const {
    sortedData,
    sortTextAsc,
    sortTextDesc,
    sortNumericDesc,
    sortNumericAsc,
    sortedByField,
    sortingType
  } = useControlTableSorting({ data: vendorsWithApplicationsList })

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
  } = useControlTablePagination({ data: sortedData })

  // Render the ItemContent node outside the return to avoid nesting issues
  const renderItemContent = (partner: EdfiVendorWithApplications) => {
    return (
      <Flex
        flexDir='column'
        mt='16px'
        pb={4}
        w='full'
      >
        <Flex
          justifyContent='flex-end'
          mb='18px'
          w='full'
        >
          <Button
            colorScheme='blue'
            size='xs'
            variant='solid'
            w='151px'
            onClick={onAddApplication}
          >
            Add Application
          </Button>
        </Flex>

        <ApplicationDetailsTable 
          applicationsList={partner.applications}
          isDeleting={isDeletingApplication}
          onDeleteApplication={onDeleteApplication}
          onEditApplication={onEditApplication}
        />
      </Flex>
    )
  }

  // Render the Accordion structure
  return (
    <> 
      {!loading && vendorsWithApplicationsList.length === 0 ? (
        <Flex justifyContent="center" padding="16px">
          <Text color="gray.500">No vendors available.</Text>
        </Flex>
      ) : (
        <Flex 
          border='1px'
          borderColor='gray.300'
          borderRadius='4px' 
          flexDir='column' 
          w='full'
        >
          <PartnersAndApplicationAccordionHeader
            sortByPartnerAsc={sortTextAsc}
            sortByPartnerDesc={sortTextDesc}
            sortingType={sortingType}
          />
          
          <Accordion.Root
            w='full'
          >            {paginatedItems.map((partner, index) => {
              return (
                <Accordion.Item
                  key={index}
                  value={index}
                >
                  <Flex
                    alignItems='center'
                    padding='16px'
                    w='full'
                  >
                    <Accordion.ItemTrigger
                      w='250px'
                      onClick={() => onSelectPartner(partner.vendorId ?? 0)}>

                    <Flex alignItems='center'>
                      <Accordion.ItemIndicator />
                      
                      <Text
                        color='blue.600'
                        maxW='200px'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        whiteSpace='nowrap'
                      >
                        {partner.company}
                      </Text>
                    </Flex>
                    </Accordion.ItemTrigger>
                    <Flex
                      ml='45px'
                      w='500px'
                    >
                      <Text 
                        overflow='hidden' 
                        textOverflow='ellipsis' 
                        whiteSpace='nowrap'
                      >
                        {partner.namespacePrefixes}
                      </Text>
                    </Flex>

                    <Flex
                      justifyContent='flex-end'
                      w='250px'
                    >
                      <Text
                        color='gray.700'
                        fontSize='sm'
                      >
                        {partner.applications.length}
                      </Text>
                    </Flex>

                    <Flex
                      justifyContent='center'
                      ml='auto'
                      w='150px'
                    >
                      <Button 
                        colorScheme='blue'
                        minW='39px'
                        size='xs'
                        variant='solid'
                        onClick={() => onEditVendor(partner)}
                      >
                        Edit
                      </Button>
                    </Flex>
                  </Flex>

                  <Accordion.ItemContent>
                    {renderItemContent(partner)}
                  </Accordion.ItemContent>
                </Accordion.Item>
              )
            })}

            <AccordionItemSkeleton              itemsCount={
                !loading 
                  ? vendorsWithApplicationsList.length ?? -1 
                  : 0
              }
            />

            <Flex 
              alignItems='flex-end'
              border='1px'
              borderColor='gray.300'
              justifyContent='flex-end'
              padding='20px'
            >
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
              </Flex>
            </Flex>
          </Accordion.Root>
        </Flex>
      )}
    </>
  )
}

export default PartnersAndApplicationAccordion
