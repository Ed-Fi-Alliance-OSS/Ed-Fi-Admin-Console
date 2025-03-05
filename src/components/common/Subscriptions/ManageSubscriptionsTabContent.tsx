// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { TablePagination } from '@edfi/admin-console-shared-sdk'
import ConsoleModal from '../ConsoleModal'
import ManageSubscriptionsTabHeader from './ManageSubscriptionsTabHeader'
import ManageSubscriptionsTable from './ManageSubscriptionsTable'
import ManageSubscriptionsTableRows from './ManageSubscriptionsTableRows'
import SubscriptionForm from './SubscriptionForm'
import ManageSubscribersForm from './ManageSubscribersForm'
import ControlTableHeader from '../ControlTableHeader'
import { Subscription } from '../../../core/Subscription.types'
import useManageSubscriptionsTable from '../../../hooks/adminActions/subscriptions/useManageSubscriptionsTable'

const ManageSubscriptionsTabContent = () => {
  const {
    subscriptionsList,
    isFetchingSubscriptions,
    onRefreshSubscriptionsList,
    sortedByField,
    sortingType,
    filterBy,
    filterOptionsList,
    onChangeFilter,
    onChangeValue,
    onFilter,
    onResetFilter,
    currentPage,
    pageSize,
    onDecrementPageSize,
    onIncrementPageSize,
    onChangePageSize,
    canNextPage,
    canPreviousPage,
    paginatedItems,
    goToInitialPage,
    goToNextPage,
    goToPreviousPage,
    gotToLastPage,
    sortNumericAsc,
    sortNumericDesc,
    sortTextAsc,
    sortTextDesc,
    totalPages,
    minPerPage,
    maxPerPage
  } = useManageSubscriptionsTable()

  const [ selectedSubscription, setSelectedSubscription ] = useState<Subscription | null>(null)
  const [ showAddSubscriptionModal, setShowAddSubscriptionModal ] = useState(false)
  const [ showEditSubscriptionModal, setShowEditSubscriptionModal ] = useState(false)
  const [ showManageSubscribersModal, setShowManageSubscribersModal ] = useState(false)

  const handleSelectSubscription = (subscriptionId: string) => {
    const nselectedSubscription = subscriptionsList.find(subscription => subscription.subscriptionId === subscriptionId)

    console.log('selected subscription', nselectedSubscription)

    if (nselectedSubscription) {
      setSelectedSubscription({ ...nselectedSubscription })
    }
  }

  const handleShowAddSubscriptionModal = () => {
    console.log('show add user modal')
    setShowAddSubscriptionModal(true)
  }

  const handleHideAddSubscriptionModal = () => setShowAddSubscriptionModal(false)

  const handleShowEditSubscriptionModal = (subscriptionId: string) => {
    handleSelectSubscription(subscriptionId)
    setShowEditSubscriptionModal(true)
  }

  const handleHideEditSubscriptionModal = () => setShowEditSubscriptionModal(false)

  const handleShowManageSubscribersModal = (subscriptionId: string) => {
    handleSelectSubscription(subscriptionId)
    setShowManageSubscribersModal(true)
  }

  const handleHideManageSubscribersModal = () => setShowManageSubscribersModal(false)

  const handleAfterSubscriptionAction = async () => {
    handleHideAddSubscriptionModal()
    handleHideEditSubscriptionModal()
    handleHideManageSubscribersModal()
    setSelectedSubscription(null)
    await onRefreshSubscriptionsList()
  }

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <ConsoleModal 
        content={<SubscriptionForm 
          currentSubscriptionsList={subscriptionsList}
          mode='Add'
          onAfterAction={handleAfterSubscriptionAction}
          onClose={handleHideAddSubscriptionModal}
        />}
        show={showAddSubscriptionModal} 
        onClose={() => setShowAddSubscriptionModal(false)}
      />

      <ConsoleModal 
        content={<SubscriptionForm
          mode='Edit'
          selectedSubscription={selectedSubscription}
          onAfterAction={handleAfterSubscriptionAction}
          onClose={handleHideEditSubscriptionModal}
        />}
        show={showEditSubscriptionModal} 
        onClose={() => setShowEditSubscriptionModal(false)}
      />

      <ConsoleModal 
        content={<ManageSubscribersForm 
          selectedSubscription={selectedSubscription}
          onAfterAction={handleAfterSubscriptionAction}
          onClose={handleHideManageSubscribersModal}
        />}
        show={showManageSubscribersModal} 
        onClose={handleHideManageSubscribersModal}
      />

      <ManageSubscriptionsTabHeader
        filterOptionsList={filterOptionsList}
        filterValue={filterBy? filterBy.value : ''}
        onAddSubscription={handleShowAddSubscriptionModal}
        onChangeFilter={onChangeFilter}
        onChangeValue={onChangeValue}
        onFilter={onFilter}
        onRefreshData={onRefreshSubscriptionsList}
        onResetFilter={onResetFilter}
      />

      <Flex
        flexDir='column'
        mt='16px'
      >
        <ManageSubscriptionsTable
          headers={[
            <ControlTableHeader headerData={{
              text: 'Application',
              fieldName: 'applicationName',
              sortedByField,
              showSorting: true,
              sortingType,
              onSortAsc: sortTextAsc,
              onSortDesc: sortTextDesc 
            }}
            />,
            <ControlTableHeader headerData={{
              text: 'Licenses',
              fieldName: 'licencesAmount',
              sortedByField,
              showSorting: true,
              sortingType,
              onSortAsc: sortNumericAsc,
              onSortDesc: sortNumericDesc 
            }}
            />,
            <ControlTableHeader headerData={{
              text: 'Starts',
              fieldName: 'startDateTime',
              sortedByField,
              showSorting: true,
              sortingType,
              onSortAsc: sortTextAsc,
              onSortDesc: sortTextDesc 
            }}
            />,
            <ControlTableHeader headerData={{
              text: 'Ends',
              fieldName: 'endDateTime',
              sortedByField,
              showSorting: true,
              sortingType,
              onSortAsc: sortTextAsc,
              onSortDesc: sortTextDesc 
            }}
            />,
            <ControlTableHeader headerData={{
              text: 'License Type',
              fieldName: 'licenseType',
              sortedByField,
              showSorting: true,
              sortingType,
              onSortAsc: sortTextAsc,
              onSortDesc: sortTextDesc 
            }}
            />,
            <ControlTableHeader headerData={{
              text: 'Status',
              fieldName: 'subscriptionStatus',
              sortedByField,
              showSorting: true,
              sortingType,
              onSortAsc: sortTextAsc,
              onSortDesc: sortTextDesc 
            }}
            />,
            <ControlTableHeader headerData={{
              text: '',
              fieldName: '',
              sortedByField,
              showSorting: false,
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
                onChangePageSize={onChangePageSize}
                onDecrementPageSize={onDecrementPageSize}
                onIncrementPageSize={onIncrementPageSize}
              />
            </Flex>}
          rows={<ManageSubscriptionsTableRows 
            subscriptionsList={paginatedItems}
            onEditSubscription={handleShowEditSubscriptionModal}
            onManageSubscribers={handleShowManageSubscribersModal}
          />}
          itemsCount={paginatedItems.length}
          loading={isFetchingSubscriptions}
        />
      </Flex>
    </Flex>
  )
}

export default ManageSubscriptionsTabContent