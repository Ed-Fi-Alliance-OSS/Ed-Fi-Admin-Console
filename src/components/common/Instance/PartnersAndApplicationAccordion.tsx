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
import { TablePagination } from '@edwire/edx-portal-shared'
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
            flexDir='column'
            borderRadius='4px'
            border='1px' 
            borderColor='gray.300' 
            w='full'>
                <PartnersAndApplicationAccordionHeader
                    sortByPartnerAsc={sortTextAsc}
                    sortByPartnerDesc={sortTextDesc}
                    sortingType={sortingType} />
                <Accordion w='full' allowMultiple allowToggle>
                    {paginatedItems.map((partner, index) => 
                        <AccordionItem padding='16px' key={index}>
                            <Flex alignItems='center' w='full'>
                                <AccordionButton onClick={() => onSelectPartner(partner.vendorId ?? 0)} w='250px'>
                                    <AccordionIcon aria-hidden="true" focusable="false" />
                                    <Text noOfLines={15} color='blue.600'>
                                        {partner.company}
                                    </Text>
                                </AccordionButton>
                                <Flex w='500px' ml='45px'>
                                    <Text noOfLines={15}>
                                        {partner.namespacePrefixes}
                                    </Text>
                                </Flex>
                                <Flex justifyContent='flex-end' w='250px'>
                                    <Text
                                        color='gray.700'
                                        size='sm'>
                                            {partner.applications.length}
                                    </Text>
                                </Flex>
                                { adminConfig && adminConfig.showEdfiPartnerDelete && <Flex justifyContent='center' ml='auto' w='150px'>
                                    <Button 
                                        onClick={() => onDeletePartner(partner.vendorId? partner.vendorId.toString() : "x")}
                                        isLoading={isDeletingPartner.deleting && isDeletingPartner.id === partner.vendorId?.toString()}
                                        color='white'
                                        bg='red.600'
                                        h='20px'
                                        w='20px'
                                        minW='20px'
                                        maxW='20px'
                                        _hover={{ background: "red.600" }}
                                        aria-labelledby="delete-partner-btn">
                                            <span id="delete-partner-btn" hidden>Close</span>
                                            <CloseIcon aria-hidden="true" focusable="false" />
                                    </Button>
                                </Flex> }
                            </Flex>
                            <AccordionPanel pb={4}>
                                <Flex flexDir='column' mt='16px' w='full'>
                                    <Flex justifyContent='flex-end' mb='18px' w='full'>
                                        <Button
                                            onClick={onAddApplication}
                                            variant='primaryBlue600'
                                            size='xs'
                                            w='151px'>Add Application</Button>
                                    </Flex>
                                    <ApplicationDetailsTable 
                                        applicationsList={partner.applications}
                                        isDeleting={isDeletingApplication}
                                        onDeleteApplication={onDeleteApplication}
                                        onEditApplication={onEditApplication} />
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>
                    )}
                    <AccordionItemSkeleton itemsCount={vendorsWithApplicationsList.length} />
                    <Flex 
                        border='1px'
                        borderColor='gray.300'
                        alignItems='flex-end'
                        justifyContent='flex-end'
                        padding='20px'>
                            <Flex 
                                ml='auto'
                                w='auto'>
                                    <TablePagination 
                                        currentPage={currentPage}
                                        pageSize={pageSize}
                                        goToInitialPage={goToInitialPage}
                                        goToLastPage={gotToLastPage}
                                        goToNextPage={goToNextPage}
                                        goToPreviousPage={goToPreviousPage}
                                        canNextPage={canNextPage}
                                        canPreviousPage={canPreviousPage}
                                        onDecrementPageSize={onDecrementPageSize}
                                        onIncrementPageSize={onIncrementPageSize}
                                        totalPages={totalPages}
                                        maxPageSize={maxPerPage}
                                        minPageSize={minPerPage}
                                        onChangePageSize={onChangePageSize} />
                            </Flex>
                    </Flex>
                </Accordion>
        </Flex>
    )
}

export default PartnersAndApplicationAccordion