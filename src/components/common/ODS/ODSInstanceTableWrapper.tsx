// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Heading
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ODSInstance } from '../../../core/ODSInstance.types'
import { Tenant } from '../../../core/Tenant.types'
import useOdsInstanceTable from '../../../hooks/odsInstances/useOdsInstanceTable'
import useOdsInstanceTableSorting from '../../../hooks/odsInstances/useOdsInstanceTableSorting'
import { usePluginContext } from '../../../plugins/BasePlugin'
import ControlTableHeader from '../ControlTableHeader'
import ConfirmSetDefaultInstanceModal from './ConfirmSetDefaultInstanceModal'
import { ODSInstanceTableMode } from './ODSInstanceTable.types'
import ODSInstanceManagementTable from './ODSIntanceManagementTable'
import SetUpInstanceModal from './SetUpInstanceModal'

interface ODSInstanceTableWrapperProps {
  tableMode: ODSInstanceTableMode
  tenants: Tenant[]
  pickedInstance: ODSInstance | null
  onSelectInstance: (instance: ODSInstance) => void
  onUpdateInstancesCount: (count: number) => void
}

const ODSInstanceTableWrapper = ({ tenants, tableMode, pickedInstance, onSelectInstance, onUpdateInstancesCount }: ODSInstanceTableWrapperProps) => {
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
    onOpenSetUpModal,
    onFetchInstancesData
  } = useOdsInstanceTable()

  const {
    getSortedInstances,
    orderBy,
    onOrderBy,
  } = useOdsInstanceTableSorting()

  const { getString } = usePluginContext()
  const nav = useNavigate()

  useEffect(() => {
    onUpdateInstancesCount(paginatedData.data?.length ?? 0)
  }, [ paginatedData.data ])

  function onAddBtnClick() {
    nav('/addinstance')
  }

  async function onRefreshBtnClick() {
    await onFetchInstancesData()
  }

  return (
    <>
      {selectedInstance && <ConfirmSetDefaultInstanceModal
        instance={selectedInstance}
        show={showConfirmSetDefaultModal}
        updatingInstance={updatingIsDefault.loading}
        onClose={onCloseConfirmSetDefaultModal}
        onSetIsDefault={onSetIsDefault}
      />}

      {selectedInstance && <SetUpInstanceModal
        instance={selectedInstance}
        show={showSetUpWizardModal}
        onClose={onCloseSetUpWizardModal}
      />}

      {tableMode == 'Display' && <Flex
        alignItems='center'
        justifyContent='space-between'
      >
        <Flex
          alignItems='flex-end'
          justifyContent='space-between'
          width='full'
        >
          <Heading size='lg'>
            {getString('app.ODS_INSTANCES')}
          </Heading>

          <Flex
            alignItems='flex-end'
            justifyContent='end'
            width='full'
          >            <Button
            _hover={{
                bg: 'blue.50',
                borderColor: 'blue.600',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' 
              }}
            bg='white'
            border='1px'
            borderColor={isFetchingData ? 'gray.400' : 'secondaryBlue600'}
            boxShadow='0 0 0 3px rgba(59, 130, 246, 0.3)'
            color={isFetchingData ? 'gray.600' : 'secondaryBlue600'}
            ml='16px'
            padding='10px'
            size='sm'
            type="button"
            variant='outline'
            onClick={onRefreshBtnClick}
          >
            { isFetchingData ? 'Loading...' : 'Refresh' }
          </Button>            <Button
              _hover={{
                bg: 'blue.50',
                borderColor: 'blue.600',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' 
              }}
              bg='white'
              border='1px'
              borderColor='primaryBlue400'
              boxShadow='0 0 0 3px rgba(59, 130, 246, 0.3)'
              color='primaryBlue600'
              ml='16px'
              padding='10px'
              size='sm'
              type="button"
              variant='outline'
              onClick={onAddBtnClick}
            >
              Add Instance
            </Button>
          </Flex>

        </Flex>
      </Flex>}      <Flex
        borderRadius="md"
        boxShadow="md"
        mt='16px'
        overflow="hidden"
        w='full'
      >        <ODSInstanceManagementTable
          tableHeaders={[
          <ControlTableHeader headerData={{
              text: '',
              fieldName: '',
              sortedByField: orderBy.field,
              showSorting: true,
              sortingType: orderBy.order,
              onSortAsc: () => {}, // No sorting for empty column
              onSortDesc: () => {}
            }}
            />,
          <ControlTableHeader headerData={{
              text: 'Instance Name',
              fieldName: 'InstanceName',
              sortedByField: orderBy.field,
              showSorting: true,
              sortingType: orderBy.order,
              onSortAsc: () => onOrderBy('InstanceName', 'asc'),
              onSortDesc: () => onOrderBy('InstanceName', 'desc')
            }}
            />,
          <ControlTableHeader headerData={{
              text: 'Ed-Fi Version',
              fieldName: 'EdFiVersion',
              sortedByField: orderBy.field,
              showSorting: true,
              sortingType: orderBy.order,
              onSortAsc: () => onOrderBy('EdFiVersion', 'asc'),
              onSortDesc: () => onOrderBy('EdFiVersion', 'desc')
            }}
            />,
          <ControlTableHeader headerData={{
              text: 'Ed-Fi Data Models',
              fieldName: 'EdFiDataModels',
              sortedByField: orderBy.field,
              showSorting: true,
              sortingType: orderBy.order,
              onSortAsc: () => onOrderBy('EdFiDataModels', 'asc'),
              onSortDesc: () => onOrderBy('EdFiDataModels', 'desc')
            }}
            />,
          <ControlTableHeader headerData={{
              text: 'Ed-Fi Status',
              fieldName: 'Status',
              sortedByField: orderBy.field,
              showSorting: true,
              sortingType: orderBy.order,
              onSortAsc: () => onOrderBy('Status', 'asc'),
              onSortDesc: () => onOrderBy('Status', 'desc')
            }}
            />,
          <ControlTableHeader headerData={{
              text: 'Worker Status',
              fieldName: 'WorkerStatus',
              sortedByField: orderBy.field,
              showSorting: true,
              sortingType: orderBy.order,
              onSortAsc: () => onOrderBy('WorkerStatus', 'asc'),
              onSortDesc: () => onOrderBy('WorkerStatus', 'desc')
            }}
            />,
          <ControlTableHeader headerData={{
              text: '',
              fieldName: '',
              sortedByField: orderBy.field,
              showSorting: false,
              sortingType: orderBy.order,
              onSortAsc: () => {}, // No sorting for action column
              onSortDesc: () => {}
            }}
            />
          ]}
          instanceList={getSortedInstances(paginatedData.data)}
          loading={isFetchingData}
          selectedInstance={pickedInstance}
          tableMode={tableMode}
          tenants={tenants}
          updatingIsDefault={updatingIsDefault}
          onOpenSetDefaultModal={onOpenSetDefaultModal}
          onOpenSetUpModal={onOpenSetUpModal}
          onSelectInstance={onSelectInstance}
        />
      </Flex>
    </>
  )
}

export default ODSInstanceTableWrapper