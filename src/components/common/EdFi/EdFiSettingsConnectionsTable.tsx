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
          initialData={connectionDataToEdit}
          mode={mode}
          onAfterEdit={() => null}
          onClose={onHideConnectionModal}
          onConfirmClose={onShowConfirmModal}
        />}
        show={showConnectionModal} 
        onClose={onHideConnectionModal}
      />

      <EdFiConfirmConnectionActionModal
        isSaving={false}
        show={showConfirmationModal}
        onAction={onConfirmClose}
        onClose={onHideConfirmationModal}
      />

      <Flex
        flexDir='column'
        w='full'
      >
        <EdFiConnectionsTable
          headers={[
            <ControlTableHeader headerData={{
              text: 'Application',
              fieldName: 'connectionName',
              sortedByField: orderBy.field,
              showSorting: true,
              sortingType: orderBy.order,
              onSortAsc,
              onSortDesc 
            }}
            />,
            <ControlTableHeader headerData={{
              text: 'Status',
              fieldName: 'status',
              sortedByField: orderBy.field,
              showSorting: false,
              sortingType: orderBy.order,
              onSortAsc,
              onSortDesc 
            }}
            />,
            <ControlTableHeader headerData={{
              text: '',
              fieldName: 'controls',
              sortedByField: orderBy.field,
              showSorting: false,
              sortingType: orderBy.order,
              onSortAsc,
              onSortDesc 
            }}
            />
          ]}
          pagination={<Flex
            ml='auto'
            w='auto'
          >
            <TablePagination 
              canNextPage={canNextPage}
              canPreviousPage={canPreviousPage}
              currentPage={paginatedData.pageIndex + 1}
              goToInitialPage={onGoToInitialPage}
              goToLastPage={onGoToLastPage}
              goToNextPage={onGoToNextPage}
              goToPreviousPage={onGoToPreviousPage}
              maxPageSize={maxPerPage}
              minPageSize={minPerPage}
              pageSize={paginatedData.pageSize}
              totalPages={totalPages}
              onChangePageSize={() => console.log('null')}
              onDecrementPageSize={onDecrementPageSize} 
              onIncrementPageSize={onIncrementPageSize}
            />
          </Flex>}
          rows={<EdFiSettingsConnectionTableRows
            connections={paginatedData.data}
            connectionStatusList={connectionStatusList}
            isLoadingConnectionStatus={isLoadingConnectionStatus}
            onShowConnectionModal={onShowConnectionModal}
          />}
          itemsCount={paginatedData.data.length}
          loading={isFetchingData}
        />
      </Flex>

      { false && paginatedData.data.length === 0 && <EdFiSettingsConnectSection onConnect={onShowConnectionModal} /> }
    </>
  )
}

export default EdFiSettingsConnectionsTable