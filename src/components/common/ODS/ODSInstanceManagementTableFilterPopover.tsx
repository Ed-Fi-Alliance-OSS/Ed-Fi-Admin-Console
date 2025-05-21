// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdSearch } from 'react-icons/md'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Field,
  Flex,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import {
  CustomFormLabel, CustomSelect, CustomInput 
} from '@edfi/admin-console-shared-sdk'

interface ODSInstanceManagementTableFilterPopoverProps {
    textFilter: string
    selectedOption: string 
    options: string[]
    onChangeText: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeFilterOption: (e: ChangeEvent<HTMLSelectElement>) => void
    onResetFilter: () => void
    onFilter: () => void
}

const ODSInstanceManagementTableFilterPopover = ({ textFilter, selectedOption, options, onChangeFilterOption, onChangeText, onFilter, onResetFilter }: ODSInstanceManagementTableFilterPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          aria-aria-labelledby="search-btn"
          minWidth='auto'
        >
          <span
            hidden
            id="search-btn"
          >Search
          </span>

          <MdSearch 
            aria-hidden="true"
            color='gray.700'
            focusable="false"
            fontSize='18px'
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent w='200px'>
        <PopoverBody padding='16px'>
          <Field.Root>
            <CustomFormLabel
              htmlFor="filter"
              text="Filter for"
            />

            <CustomInput
              id="filter"
              placeholder='Type your search here'
              value={textFilter}
              onChange={onChangeText}
            />

            <Flex mt='10px'>
              <CustomSelect 
                options={options.map(option => ({
                  value: option,
                  text: option 
                }))}
                value={selectedOption}
                onChange={onChangeFilterOption}
              />
            </Flex>
          </Field.Root>

          <Button
            mt='10px'
            size='sm'
            variant='primaryBlue600'
            w='full'
            onClick={onFilter}
          >
            Filter 
          </Button>

          <Button
            mt='10px'
            size='sm'
            variant='secondaryBlue600'
            w='full'
            onClick={onResetFilter}
          >
            Reset Filters
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ODSInstanceManagementTableFilterPopover