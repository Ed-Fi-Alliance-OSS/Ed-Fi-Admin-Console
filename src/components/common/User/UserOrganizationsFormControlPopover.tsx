import { ChevronDownIcon } from "@chakra-ui/icons"
import { Popover, PopoverTrigger, Button, PopoverContent, PopoverBody, Flex } from "@chakra-ui/react"
import { DeletingState } from "../../../core/deletingState.types"

interface UserOrganizationsFormControlPopoverProps {
    educationOrganizationId: string
    staffClassification: string
    isDeleting: DeletingState
    isDisabled: boolean
    canDelete: boolean 
    onDelete: (educationOrganizationId: string, staffClassification: string) => void
}

const UserOrganizationsFormControlPopover = ({ educationOrganizationId, staffClassification, isDisabled, canDelete, isDeleting, onDelete }: UserOrganizationsFormControlPopoverProps) => {
    return (
        <Popover>
        <PopoverTrigger>
            <Button 
                onClick={() => console.log("User education organizations control popover")}
                isDisabled={isDisabled}
                size='xs'
                borderRadius='0px 4px 4px 0px'
                variant='primaryBlue600'
                ml='1px'
                minW='24px'
                maxW='24px'
                aria-labelledby={`show-options-${educationOrganizationId}`}>
                    <span id={`show-options-${educationOrganizationId}`} hidden>Show Options</span>
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
                            flexDir='column'
                            bg='white'
                            w='100px'> 
                                { canDelete && <Button
                                    onClick={() => onDelete(educationOrganizationId, staffClassification)}
                                    isLoading={isDeleting.deleting && isDeleting.id === educationOrganizationId}
                                    fontFamily='Open sans'
                                    display='flex'
                                    bg='white'
                                    color='red.600'
                                    borderRadius='4px'
                                    size='xs'
                                    minW='80px'
                                    _hover={{ background: "white" }}>
                                        Delete
                                </Button> }
                        </Flex>
                </PopoverBody>
        </PopoverContent>
    </Popover>
    )
}

export default UserOrganizationsFormControlPopover