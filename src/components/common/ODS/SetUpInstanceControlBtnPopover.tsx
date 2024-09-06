import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react"
import { ODSInstance } from "../../../core/ODSInstance.types"
import { UpdatingIsDefaultStatus } from "../../../hooks/odsInstances/useOdsInstanceTable.types"

interface SetUpInstanceControlBtnPopoverProps {
    instance: ODSInstance 
    updatingIsDefault: UpdatingIsDefaultStatus
    onOpenSetUpModal: (instanceId: string) => void
}

const SetUpInstanceControlBtnPopover = ({ instance, updatingIsDefault, onOpenSetUpModal }: SetUpInstanceControlBtnPopoverProps) => {
    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <Button 
                    onClick={() => null}
                    isDisabled={updatingIsDefault.loading}
                    size='xs'
                    borderRadius='0px 4px 4px 0px'
                    variant='primaryBlue500'
                    ml='1px'
                    minW='24px'
                    maxW='24px'
                    padding='0'
                    aria-labelledby={`show-options-${instance.instanceId}`}>
                        <span id={`show-options-${instance.instanceId}`} hidden>
                            Show Instance Options
                        </span> 
                        <ChevronDownIcon 
                            fontSize='18px'    
                            aria-hidden="true" 
                            focusable="false" /> 
                </Button>
            </PopoverTrigger>
            <PopoverContent w='160px'>
                <PopoverBody padding='0' w='full'>
                    <Button
                        onClick={() => onOpenSetUpModal(instance.instanceId)}
                        isDisabled={updatingIsDefault.loading}
                        isLoading={false}
                        fontFamily='Open sans'
                        display='flex'
                        bg='white'
                        color='gray.800'
                        fontWeight='400'
                        borderRadius='4px'
                        size='xs'
                        h='25px'
                        mx='auto'
                        minW='80px'
                        _hover={{ background: "white" }}>
                            Set as Default School Year
                    </Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default SetUpInstanceControlBtnPopover