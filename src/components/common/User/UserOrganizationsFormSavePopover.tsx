import { ChevronDownIcon } from "@chakra-ui/icons"
import { Popover, PopoverTrigger, Button, PopoverContent, PopoverBody, Flex } from "@chakra-ui/react"

interface UserOrganizationsFormSavePopoverProps {
    onCancelAdd: () => void
}

const UserOrganizationsFormSavePopover = ({ onCancelAdd }: UserOrganizationsFormSavePopoverProps) => {
    return (
        <Popover>
        <PopoverTrigger>
            <Button 
                onClick={() => console.log("User education organizations control popover")}
                size='xs'
                borderRadius='0px 4px 4px 0px'
                variant='primaryBlue600'
                ml='1px'
                minW='24px'
                maxW='24px'
                aria-labelledby={`show-save-option}`}>
                    <span id={`show-save-option}`} hidden>Show Options</span>
                    <ChevronDownIcon 
                        fontSize='18px'    
                        aria-hidden="true" 
                        focusable="false" />
            </Button>
        </PopoverTrigger>
        <PopoverContent 
            top='0px'
            padding='0'
            w='100px'>
                <PopoverBody padding='0'>
                        <Flex 
                            border='1px'
                            borderColor='gray.400'
                            borderRadius='4px'
                            bg='white'
                            w='100px'>
                                <Button
                                    onClick={onCancelAdd}
                                    isLoading={false}
                                    fontFamily='Open sans'
                                    display='flex'
                                    bg='white'
                                    color='black'
                                    borderRadius='4px'
                                    size='xs'
                                    minW='80px'
                                    _hover={{ background: "white" }}>
                                        Cancel
                                </Button>
                        </Flex>
                </PopoverBody>
        </PopoverContent>
    </Popover>
    )
}

export default UserOrganizationsFormSavePopover