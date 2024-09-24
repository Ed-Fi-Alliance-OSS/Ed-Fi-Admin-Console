import { SearchIcon } from "@chakra-ui/icons"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Button,
    FormControl,
    Flex,
  } from '@chakra-ui/react'
import { ChangeEvent } from "react"
import { CustomFormLabel, CustomSelect, CustomInput } from "@edwire/edx-portal-shared"

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
                    minWidth='auto'
                    aria-aria-labelledby="search-btn">
                        <span id="search-btn" hidden>Search</span>
                        <SearchIcon 
                            color='gray.700'
                            fontSize='18px'
                            aria-hidden="true" focusable="false" />
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                w='200px'>
                    <PopoverBody
                        padding='16px'>
                            <FormControl>
                                <CustomFormLabel
                                    htmlFor="filter"
                                    text="Filter for" />
                                <CustomInput
                                    id="filter"
                                    value={textFilter}
                                    placeholder='Type your search here'
                                    onChange={onChangeText} />
                                <Flex mt='10px'>
                                    <CustomSelect 
                                        options={options.map(option => ({ value: option, text: option }))}
                                        value={selectedOption}
                                        onChange={onChangeFilterOption} />
                                </Flex>
                            </FormControl>
                            <Button
                                onClick={onFilter}
                                variant='primaryBlue600'
                                mt='10px'
                                size='sm'
                                w='full'>
                                    Filter 
                            </Button>
                            <Button
                                onClick={onResetFilter}
                                variant='secondaryBlue600'
                                mt='10px'
                                size='sm'
                                w='full'>
                                    Reset Filters
                            </Button>
                    </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ODSInstanceManagementTableFilterPopover