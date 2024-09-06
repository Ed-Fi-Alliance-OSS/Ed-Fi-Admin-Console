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

        if (!isUserControl)
            return false

        if (selectedOption) {
            if (selectedOption.toLocaleLowerCase().includes('selected'))
                return true 

            return false
        }

        return true
    }

    return (
        <Popover aria-label="Filter Popover">
            <PopoverTrigger>
                <Button
                    minWidth='auto'
                    aria-labelledby="search-btn">
                        <span id="search-btn" hidden>Search</span>
                        <SearchIcon 
                            color='gray.700'
                            fontSize='18px'
                            aria-hidden="true" 
                            focusable="false" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                aria-label="Filter dialog"
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
                                <Flex aria-label="Select Field to Filter" id="selectFilterField" mt='10px'>
                                    <CustomSelect 
                                        aria-labelledby="selectFilterField"
                                        options={options.map(option => ({ value: option, text: selectUITextOption? selectUITextOption(option) : option }))}
                                        value={selectedOption}
                                        onChange={onChangeFilterOption} />
                                </Flex>
                            </FormControl>
                            <Button
                                onClick={onFilter}
                                isDisabled={disableFilterBtn()}
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

export default ControlTableFilterPopover