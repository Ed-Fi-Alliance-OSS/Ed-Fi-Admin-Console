import { Flex, Heading } from '@chakra-ui/react'
import useOdsInstanceTable from '../../../hooks/odsInstances/useOdsInstanceTable'
import ControlTableHeader from '../ControlTableHeader'
import ConfirmSetDefaultInstanceModal from './ConfirmSetDefaultInstanceModal'
import ODSInstanceManagementTable from './ODSIntanceManagementTable'
import SetUpInstanceModal from './SetUpInstanceModal'
import useOdsInstanceTableSorting from '../../../hooks/odsInstances/useOdsInstanceTableSorting'
import { ODSInstanceTableMode } from './ODSInstanceTable.types'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'
import { useEffect } from 'react'
import { usePluginContext } from '../../../plugins/BasePlugin'

interface ODSInstanceTableWrapperProps {
    tableMode: ODSInstanceTableMode
    pickedInstance: ExtendedODSInstance | null
    onSelectInstance: (instance: ExtendedODSInstance) => void
    onUpdateInstancesCount: (count: number) => void
}

const ODSInstanceTableWrapper = ({ tableMode, pickedInstance, onSelectInstance, onUpdateInstancesCount }: ODSInstanceTableWrapperProps) => {
  const {
    paginatedData,
    selectedInstance,
    isFetchingData,
    updatingIsDefault,
    showConfirmSetDefaultModal,
    onSetIsDefault,
    onOpenSetDefaultModal,
    onCloseConfirmSetDefaultModal,
    showSetUpWizardModal,
    onCloseSetUpWizardModal,
    onOpenSetUpModal
  } = useOdsInstanceTable()

  const {
    getSortedInstances,
    orderBy,
    onOrderBy,
  } = useOdsInstanceTableSorting()

  const { getString } = usePluginContext()

  useEffect(() => {
    onUpdateInstancesCount(paginatedData.data.length)
  }, [ paginatedData.data ])

  return (
    <> 
      { selectedInstance && <ConfirmSetDefaultInstanceModal
        show={showConfirmSetDefaultModal}
        instance={selectedInstance}
        updatingInstance={updatingIsDefault.loading}
        onSetIsDefault={onSetIsDefault}
        onClose={onCloseConfirmSetDefaultModal} /> }

      { selectedInstance && <SetUpInstanceModal 
        instance={selectedInstance} 
        show={showSetUpWizardModal} 
        onClose={onCloseSetUpWizardModal} /> }

      { tableMode == 'Display' && <Flex alignItems='center' justifyContent='space-between'>
        <Flex alignItems='flex-end'>
          <Heading size='lg'>
            {getString('app.ODS_INSTANCES')}
          </Heading>
        </Flex>
      </Flex> }  
            
      <Flex mt='16px' w='full'>
        <ODSInstanceManagementTable 
          tableMode={tableMode}
          tableHeaders={[
            <ControlTableHeader headerData={{ text: '', fieldName: '', sortedByField: orderBy.field, showSorting: false, sortingType: orderBy.order, onSortAsc: () => onOrderBy('Year', 'asc'), onSortDesc: () => onOrderBy('Year', 'desc') }} />,
            <ControlTableHeader headerData={{ text: 'Year', fieldName: 'Year', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc: () => onOrderBy('Year', 'asc'), onSortDesc: () => onOrderBy('Year', 'desc') }} />,
            <ControlTableHeader headerData={{ text: 'Ed-Fi Version', fieldName: 'EdFiVersion', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc: () => onOrderBy('EdFiVersion', 'asc'), onSortDesc: () => onOrderBy('EdFiVersion', 'desc') }} />,
            <ControlTableHeader headerData={{ text: 'Extension', fieldName: 'TsdsVersion', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc: () => onOrderBy('TsdsVersion', 'asc'), onSortDesc: () => onOrderBy('TsdsVersion', 'desc') }} />,
            <ControlTableHeader headerData={{ text: 'Ed-Fi Status', fieldName: 'Status', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc: () => onOrderBy('Status', 'asc'), onSortDesc: () => onOrderBy('Status', 'desc') }} />,
            <ControlTableHeader headerData={{ text: '', fieldName: '', sortedByField: orderBy.field, showSorting: true, sortingType: orderBy.order, onSortAsc: () => onOrderBy('Year', 'asc'), onSortDesc: () => onOrderBy('Year', 'desc') }} />
          ]}
          selectedInstance={pickedInstance}
          instanceList={getSortedInstances(paginatedData.data)}
          loading={isFetchingData} 
          onSelectInstance={onSelectInstance}
          onOpenSetDefaultModal={onOpenSetDefaultModal}
          onOpenSetUpModal={onOpenSetUpModal}
          updatingIsDefault={updatingIsDefault} />
      </Flex>
    </>
  )
}

export default ODSInstanceTableWrapper