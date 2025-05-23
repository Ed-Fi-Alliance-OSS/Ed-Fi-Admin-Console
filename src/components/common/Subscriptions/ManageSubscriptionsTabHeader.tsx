// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex 
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import ControlTableFilterPopover from '../ControlTableFilterPopover'
import TabHeading from '../TabHeading'

interface ManageSubscriptionsTabHeaderProps {
    filterValue: string
    filterOptionsList: string[]
    selectedFilter?: string 
    onChangeFilter: (e: ChangeEvent<HTMLSelectElement>) => void
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
    onFilter: () => void
    onResetFilter: () => void
    onRefreshData: () => void
    onAddSubscription: () => void
}

const ManageSubscriptionsTabHeader = ({ filterOptionsList, filterValue, selectedFilter, onChangeFilter, onChangeValue, onFilter, onResetFilter, onRefreshData, onAddSubscription }: ManageSubscriptionsTabHeaderProps) => {
  const optionTextList = [
    'Application',
    'Licenses',
    'Starts',
    'Ends',
    'License Type',
    'Status'
  ]

  const selectUITextOption = (option: string) => {
    console.log(option)

    if (option === 'applicationName') {
      return optionTextList[0]
    }

    if (option === 'licensesAmount') {
      return optionTextList[1]
    }

    if (option === 'startDateTime') {
      return optionTextList[2]
    }

    if (option === 'endDateTime') {
      return optionTextList[3]
    }

    if (option === 'licenseType') {
      return optionTextList[4]
    }

    if (option === 'subscriptionStatus') {
      return optionTextList[5]
    }

    return 'select filter'
  }

  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Flex alignItems='flex-end'>
        <TabHeading text="Licenses" />

        <Flex
          alignItems='center'
          justifyContent='flex-end'
          mb='6px'
          ml='5px'
        >
          <ControlTableFilterPopover
            options={filterOptionsList}
            selectedOption={selectedFilter}
            selectUITextOption={selectUITextOption}
            textFilter={filterValue}
            onChangeFilterOption={onChangeFilter}
            onChangeText={onChangeValue}
            onFilter={onFilter}
            onResetFilter={onResetFilter}
          />
        </Flex>
      </Flex>

      <Flex
        alignItems='center'
        mt='5px'
      >
        <Button
          color='secondaryBlue600'
          fontSize='xs'
          minW='5px'
          p='0 25px'
          variant='solid'
          onClick={onRefreshData}
        >
          Refresh List
        </Button>

        <Button
          color='primaryBlue600'
          fontSize='xs'
          minW='5px'
          ml='8px'
          p='0 25px'
          variant='solid'
          onClick={onAddSubscription}
        >
          Add License
        </Button>
      </Flex>
    </Flex>
  )
}

export default ManageSubscriptionsTabHeader