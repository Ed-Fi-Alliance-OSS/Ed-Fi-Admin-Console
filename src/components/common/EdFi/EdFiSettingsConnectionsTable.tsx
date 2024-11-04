import { Flex } from '@chakra-ui/react'
import { TablePagination } from '@edfi/admin-console-shared-sdk'
import useEdFiSettingsConnectionsTable from '../../../hooks/adminActions/externalods/useEdFiSettingsConnectionsTable'
import ConsoleModal from '../ConsoleModal'
import ControlTableHeader from '../ControlTableHeader'
import EdFiConfirmConnectionActionModal from './EdFiConfirmConnectionActionModal'
import EdFiConnectionsTable from './EdFiConnectionsTable'
import EdFiModalContentConnectionForm from './EdFiModalContentConnectionForm'
import EdFiSettingsConnectionTableRows from './EdFiSettingsConnectionTableRows'
import EdFiSettingsConnectSection from './EdFiSettingsConnectSection'

const EdFiSettingsConnectionsTable = () => {
  const {
    paginatedData, 
    minPerPage,
    maxPerPage,
    totalPages,
    isFetchingData,
    onDecrementPageSize,
    onIncrementPageSize,
    canNextPage,
    canPreviousPage,
    onGoToInitialPage,
    onGoToLastPage,
    onGoToNextPage,
    onGoToPreviousPage,
    orderBy,
    onSortAsc,
    onSortDesc,
    connectionStatusList,
    mode,
    isLoadingConnectionStatus,
    connectionDataToEdit,
    showConfirmationModal,
    showConnectionModal,
    onConfirmClose,
    onShowConnectionModal,
    onShowConfirmModal,
    onHideConfirmationModal,
    onHideConnectionModal
  } = useEdFiSettingsConnectionsTable()

  return (
    <>
      <ConsoleModal 
        content={<EdFiModalContentConnectionForm 
          mode={mode}
          initialData={connectionDataToEdit}
          onAfterEdit={() => null}
          onClose={onHideConnectionModal}
          onConfirmClose={onShowConfirmModal} />}
        show={showConnectionModal} 
        onClose={onHideConnectionModal} />
      <EdFiConfirmConnectionActionModal
        show={showConfirmationModal}
        isSaving={false}
        onAction={onConfirmClose}
        onClose={onHideConfirmationModal} />
      <Flex flexDir='column' w='full'>
        <EdFiConnectionsTable
          headers={[
            <ControlTableHeader headerData={{ text: 'Application', fieldName: 'connectionName', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: 'Status', fieldName: 'status', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />,
            <ControlTableHeader headerData={{ text: '', fieldName: 'controls', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc, onSortDesc }} />
          ]}
          itemsCount={paginatedData.data.length}
          loading={isFetchingData}
          rows={<EdFiSettingsConnectionTableRows
            connections={paginatedData.data}
            connectionStatusList={connectionStatusList}
            isLoadingConnectionStatus={isLoadingConnectionStatus}
            onShowConnectionModal={onShowConnectionModal} />}
          pagination={<Flex ml='auto' w='auto'>
            <TablePagination 
              currentPage={paginatedData.pageIndex + 1}
              goToInitialPage={onGoToInitialPage}
              goToLastPage={onGoToLastPage}
              goToNextPage={onGoToNextPage}
              goToPreviousPage={onGoToPreviousPage}
              canNextPage={canNextPage}
              canPreviousPage={canPreviousPage}
              pageSize={paginatedData.pageSize}
              onDecrementPageSize={onDecrementPageSize}
              onIncrementPageSize={onIncrementPageSize}
              totalPages={totalPages}
              maxPageSize={maxPerPage}
              minPageSize={minPerPage} 
              onChangePageSize={() => console.log('null')} />
          </Flex>} />
      </Flex>
      { false && paginatedData.data.length === 0 && <EdFiSettingsConnectSection 
        onConnect={onShowConnectionModal} /> }
    </>
  )
}

export default EdFiSettingsConnectionsTable