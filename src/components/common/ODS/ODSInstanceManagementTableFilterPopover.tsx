// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button,
  Flex,
  Box,
  Portal,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import {
  CustomFormLabel, CustomSelect, CustomInput 
} from '@edfi/admin-console-shared-sdk'
import { LuSearch } from 'react-icons/lu'
import { Popover } from '@chakra-ui/react'

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
    <Popover.Root>      <Popover.Trigger>
        <Box
          as="div"
          role="button"
          aria-labelledby="search-btn"
          minWidth="auto"
          display="inline-flex"
          justifyContent="center"
          alignItems="center"
          padding="8px"
          cursor="pointer"
          borderRadius="4px"
          onClick={() => {}}
        >
          <span
            hidden
            id="search-btn"
          >Search
          </span>

          <LuSearch 
            aria-hidden={true}
            color="gray.700"
            focusable={false}
            fontSize="18px"
          />
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Content css={{ maxWidth: '200px' }}>
          <Popover.Body padding="16px">
            <Box as="form">
              <CustomFormLabel
                htmlFor="filter"
                text="Filter for"
              />

              <CustomInput
                id="filter"
                placeholder="Type your search here"
                value={textFilter}
                onChange={onChangeText}
              />

              <Flex mt="10px">
                <CustomSelect 
                  options={options.map(option => ({
                    value: option,
                    text: option 
                  }))}
                  value={selectedOption}
                  onChange={onChangeFilterOption}
                />
              </Flex>
            </Box>

            <Button
              colorPalette="blue"
              mt="10px"
              size="sm"
              variant="solid"
              width="full"
              onClick={onFilter}
            >
              Filter 
            </Button>

            <Button
              colorPalette="blue"
              mt="10px"
              size="sm"
              variant="outline"
              width="full"
              onClick={onResetFilter}
            >
              Reset Filters
            </Button>
          </Popover.Body>
        </Popover.Content>
      </Portal>
    </Popover.Root>
  )
}

export default ODSInstanceManagementTableFilterPopover
