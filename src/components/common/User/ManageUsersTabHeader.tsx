// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Field, Select 
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import ControlTableFilterPopover from '../ControlTableFilterPopover'

interface ManageUsersTabHeaderProps {
    filterValue: string
    filterOptionsList: string[]
    selectedFilter?: string 
    onChangeFilter: (e: ChangeEvent<HTMLSelectElement>) => void
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
    onFilter: () => void
    onResetFilter: () => void
    onAddUser: () => void
    onRefreshData: () => void
}

const ManageUsersTabHeader = ({  filterValue, selectedFilter, filterOptionsList, onAddUser, onRefreshData,  onChangeFilter, onChangeValue, onFilter, onResetFilter }: ManageUsersTabHeaderProps) => {
  const optionTextList = [
    'First Name',
    'Last Name',
    'Email',
    'Status'
  ]

  const selectUITextOption = (option: string) => {
    if (option === 'firstName') {
      return optionTextList[0]
    }

    if (option === 'lastName') {
      return optionTextList[1]
    }

    if (option === 'email') {
      return optionTextList[2]
    }

    if (option === 'status') {
      return optionTextList[3]
    }

    return 'Select Filter'
  }

  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Flex alignItems='flex-end'>
        <Flex
          aria-label="Select Mode"
          flexDir='column'
          id="selectMode"
        >
          <Field.Root>
            <Select
              aria-labelledby="selectMode"
              border='none'
              fontFamily='Poppins'
              fontSize='32px'
              fontWeight='700' 
              lineHeight='42px'
              w='230px'
            >
              <option
                key="users"
                style={{ fontFamily: 'sans-serif' }}
                value="users"
              >Users
              </option>
            </Select>
          </Field.Root>
        </Flex>

        <Flex
          justifyContent='center'
          mb='6px'
          ml='5px'
        >
          <ControlTableFilterPopover
            isUserControl={true}
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
          minW='5px'
          p='0 25px'
          size='xs'
          variant='secondaryBlue600'
          onClick={onRefreshData}
        >
          Refresh List
        </Button>

        <Button
          minW='5px'
          ml='8px'
          p='0 25px'
          size='xs'
          variant='primaryBlue600'
          onClick={onAddUser}
        >
          Add User
        </Button>
      </Flex>
    </Flex>
  )
}

export default ManageUsersTabHeader