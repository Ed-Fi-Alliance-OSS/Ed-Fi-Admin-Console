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

interface ControlTableFilterPopoverProps {
    textFilter: string
    selectedOption?: string 
    options: string[]
    isUserControl?: boolean 
    onChangeText: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeFilterOption: (e: ChangeEvent<HTMLSelectElement>) => void
    onResetFilter: () => void
    selectUITextOption?: (option: string) => string
    onFilter: () => void
}

const ControlTableFilterPopover = ({ textFilter, selectedOption, options, selectUITextOption, isUserControl, onChangeFilterOption, onChangeText, onFilter, onResetFilter }: ControlTableFilterPopoverProps) => {
  const disableFilterBtn = () => {

    if (!isUserControl) {
      return false
    }

    if (selectedOption) {
      if (selectedOption.toLocaleLowerCase().includes('selected')) {
        return true
      } 

      return false
    }

    return true
  }

  return (
    <Popover aria-label="Filter Popover">
      <PopoverTrigger>
        <Button
          aria-labelledby="search-btn"
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

      <PopoverContent
        aria-label="Filter dialog"
        w='200px'
      >
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

            <Flex
              aria-label="Select Field to Filter"
              id="selectFilterField"
              mt='10px'
            >
              <CustomSelect 
                options={options.map(option => ({
                  value: option,
                  text: selectUITextOption? selectUITextOption(option) : option 
                }))}
                aria-labelledby="selectFilterField"
                value={selectedOption}
                onChange={onChangeFilterOption}
              />
            </Flex>
          </Field.Root>

          <Button
            isDisabled={disableFilterBtn()}
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

export default ControlTableFilterPopover