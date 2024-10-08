import { Button, Flex, FormControl, Popover, PopoverBody, PopoverContent, PopoverTrigger,  } from "@chakra-ui/react"
import { CustomFormLabel, CustomInput, CustomSelect } from "@edfi/admin-console-shared-sdk"
import { ChangeEvent } from "react"
import { MdFilterList } from "react-icons/md"
import { LogFilterTypeOption, LogFilterValues } from "./LogsInnerTable.types"

interface LogsInnerTableFilterPopoverProps {
    logFilterValues: LogFilterValues
    isDisabledFilter: boolean 
    options: LogFilterTypeOption[]
    isFetchingData: boolean 
    onChangeMessage: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeFilterOption: (e: ChangeEvent<HTMLSelectElement>) => void
    onFilter: () => void
    onResetFilter: () => void
}

const LogsInnerTableFilterPopover = ({ logFilterValues, options, isDisabledFilter, isFetchingData, onChangeMessage, onChangeFilterOption, onFilter, onResetFilter }: LogsInnerTableFilterPopoverProps) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    minWidth='auto'
                    aria-labelledby="search-btn">
                        <span id="search-btn" hidden>Filter</span>
                        <MdFilterList
                            fontSize='20px' />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                aria-label="Filter Popover"
                w='200px'>
                    <PopoverBody
                        padding='16px'>
                            <FormControl>
                                <CustomFormLabel
                                    htmlFor="messageType"
                                    text="Type" />
                                <CustomSelect 
                                    id="messageType"
                                    disabled={isFetchingData}
                                    options={options.map(option => ({ value: option.value, text: option.text }))}
                                    value={logFilterValues.messageType}
                                    onChange={onChangeFilterOption} />
                            </FormControl>
                            <FormControl mt='16px'>
                                <CustomFormLabel
                                    htmlFor="message"
                                    text="Message" />
                                <CustomInput
                                    id="message"
                                    disabled={isFetchingData}
                                    value={logFilterValues.messageText}
                                    placeholder='Type your search here'
                                    onChange={onChangeMessage} />
                            </FormControl>
                            <Flex flexDir='column'>
                                <Button
                                    onClick={onFilter}
                                    isDisabled={isDisabledFilter || isFetchingData}
                                    variant='primaryBlue600'
                                    mt='10px'
                                    size='sm'
                                    w='full'>
                                        Filter
                                </Button>
                                <Button
                                    onClick={onResetFilter}
                                    variant='secondaryBlue600'
                                    isDisabled={isFetchingData}
                                    mt='10px'
                                    size='sm'
                                    w='full'>
                                        Reset Filters
                                </Button>
                            </Flex>
                    </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default LogsInnerTableFilterPopover