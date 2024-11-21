import { CloseIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react'
import { EdfiVendorWithApplications } from '../../../hooks/adminActions/edfi/usePartnersAndApplicationsAccordion.types'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'
import AccordionItemSkeleton from '../AccordionItemSkeleton'
import ApplicationDetailsTable from './ApplicationDetailsTable'
import PartnersAndApplicationAccordionHeader from './PartnersAndApplicationAccordionHeader'
import { DeletingState } from '../../../core/deletingState.types'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { TablePagination } from '@edfi/admin-console-shared-sdk'
import useControlTableSorting from '../../../hooks/controlTable/useControlTableSorting'
import useControlTablePagination from '../../../hooks/controlTable/useControlTablePagination'

interface PartnersAndApplicationAccordionProps {
    vendorsWithApplicationsList: EdfiVendorWithApplications[]
    isDeletingPartner: DeletingState 
    isDeletingApplication: DeletingState
    onSelectPartner: (partnerId: number) => void
    onEditPartner: () => void
    onEditApplication: (application: EdfiApplication) => void
    onDeletePartner: (partnerId: string) => void
    onDeleteApplication: (applicationId: string) => void
    onAddApplication: () => void
}

const PartnersAndApplicationAccordion = ({ vendorsWithApplicationsList, isDeletingApplication, isDeletingPartner, onSelectPartner, onEditPartner, onDeletePartner, onDeleteApplication, onEditApplication, onAddApplication }: PartnersAndApplicationAccordionProps) => {
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

  return (
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

      <Accordion
        allowMultiple
        allowToggle
        w='full'
      >
        {paginatedItems.map((partner, index) => 
          <AccordionItem
            key={index}
            padding='16px'
          >
            <Flex
              alignItems='center'
              w='full'
            >
              <AccordionButton
                w='250px'
                onClick={() => onSelectPartner(partner.vendorId ?? 0)}
              >
                <AccordionIcon
                  aria-hidden="true"
                  focusable="false"
                />

                <Text
                  color='blue.600'
                  noOfLines={15}
                >
                  {partner.company}
                </Text>
              </AccordionButton>

              <Flex
                ml='45px'
                w='500px'
              >
                <Text noOfLines={15}>
                  {partner.namespacePrefixes}
                </Text>
              </Flex>

              <Flex
                justifyContent='flex-end'
                w='250px'
              >
                <Text
                  color='gray.700'
                  size='sm'
                >
                  {partner.applications.length}
                </Text>
              </Flex>

              { adminConfig && adminConfig.showEdfiPartnerDelete && <Flex
                justifyContent='center'
                ml='auto'
                w='150px'
              >
                <Button 
                  _hover={{ background: 'red.600' }}
                  aria-labelledby="delete-partner-btn"
                  bg='red.600'
                  color='white'
                  h='20px'
                  isLoading={isDeletingPartner.deleting && isDeletingPartner.id === partner.vendorId?.toString()}
                  maxW='20px'
                  minW='20px'
                  w='20px'
                  onClick={() => onDeletePartner(partner.vendorId? partner.vendorId.toString() : 'x')}
                >
                  <span
                    hidden
                    id="delete-partner-btn"
                  >Close
                  </span>

                  <CloseIcon
                    aria-hidden="true"
                    focusable="false"
                  />
                </Button>
              </Flex> }
            </Flex>

            <AccordionPanel pb={4}>
              <Flex
                flexDir='column'
                mt='16px'
                w='full'
              >
                <Flex
                  justifyContent='flex-end'
                  mb='18px'
                  w='full'
                >
                  <Button
                    size='xs'
                    variant='primaryBlue600'
                    w='151px'
                    onClick={onAddApplication}
                  >Add Application
                  </Button>
                </Flex>

                <ApplicationDetailsTable 
                  applicationsList={partner.applications}
                  isDeleting={isDeletingApplication}
                  onDeleteApplication={onDeleteApplication}
                  onEditApplication={onEditApplication}
                />
              </Flex>
            </AccordionPanel>
          </AccordionItem>)}

        <AccordionItemSkeleton itemsCount={vendorsWithApplicationsList.length} />

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
      </Accordion>
    </Flex>
  )
}

export default PartnersAndApplicationAccordion