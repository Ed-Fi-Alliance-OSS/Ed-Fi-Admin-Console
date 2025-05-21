// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdSearch } from 'react-icons/md'
import {
  Box,
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
    <Box 
      css={{
        position: 'relative',
        display: 'inline-block'
      }}
      aria-label="Filter Popover"
    >
      {/* Trigger Button */}
      <Button
        aria-labelledby="search-btn"
        css={{
          minWidth: 'auto',
          background: 'transparent',
          padding: '8px',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.05)'
          },
          '&:focus': {
            boxShadow: 'none'
          },
          '&[aria-expanded="true"] + div': {
            display: 'block'
          }
        }}
        data-state="closed"
        onClick={(e) => {
          const btn = e.currentTarget;
          const expanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          btn.setAttribute('data-state', expanded ? 'closed' : 'open');
        }}
      >
        <span
          hidden
          id="search-btn"
        >
          Search
        </span>

        <Box 
          as={MdSearch}
          aria-hidden="true"
          color="gray.700"
          css={{
            fontSize: '18px'
          }}
        />
      </Button>

      {/* Popover Content */}
      <Box
        css={{
          position: 'absolute',
          top: 'calc(100% + 5px)',
          right: 0,
          zIndex: 1000,
          width: '200px',
          display: 'none',
          background: 'white',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          padding: '16px'
        }}
        aria-label="Filter dialog"
      >
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
            css={{
              marginTop: '10px'
            }}
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
          disabled={disableFilterBtn()}
          css={{
            marginTop: '10px',
            width: '100%',
            size: 'sm',
            background: '#0066cc',
            color: 'white',
            '&:hover:not(:disabled)': {
              background: '#0055aa'
            },
            '&:disabled': {
              opacity: 0.6,
              cursor: 'not-allowed'
            }
          }}
          onClick={onFilter}
        >
          Filter
        </Button>

        <Button
          css={{
            marginTop: '10px',
            width: '100%',
            size: 'sm',
            border: '1px solid #0066cc',
            color: '#0066cc',
            background: 'transparent',
            '&:hover': {
              background: 'rgba(0, 102, 204, 0.1)'
            }
          }}
          onClick={onResetFilter}
        >
          Reset Filters
        </Button>
      </Box>
    </Box>
  )
}

export default ControlTableFilterPopover