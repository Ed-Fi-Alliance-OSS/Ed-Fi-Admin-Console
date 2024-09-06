import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react"
import { useContext } from "react"
import { adminConsoleContext } from "../../../context/adminConsoleContext"
import { EdfiApplication } from "../../../core/Edfi/EdfiApplications"

interface ApplicationDetailsControlProps {
    data: EdfiApplication
    isDeleting: boolean 
    onDelete: (applicationId: string) => void
}

const ApplicationDetailsControl = ({ data, isDeleting, onDelete }: ApplicationDetailsControlProps) => {
    const adminConfig = useContext(adminConsoleContext)

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    size='xs'
                    borderRadius='0px 4px 4px 0px'
                    variant='primaryBlue600'
                    ml='1px'
                    minW='24px'
                    aria-labelledby={`show-options-${data.applicationName}`}>
                        <span id={`show-options-${data.applicationName}`} hidden>Show Options</span>
                        <ChevronDownIcon fontSize='18px' aria-hidden="true" focusable="false" />
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                aria-label={`options-${data.applicationName}`}
                top='0px'
                padding='0'
                w='100px'>
                    <PopoverBody padding='0'>
                            <Flex>
                                { adminConfig && adminConfig.showEdfiApplicationDelete && <Button
                                    onClick={() => onDelete(data.applicationId.toString())}
                                    isLoading={isDeleting}
                                    display='flex'
                                    bg='red.600'
                                    color='white'
                                    borderRadius='4px'
                                    justifyContent='center'
                                    size='xs'
                                    w='100px'
                                    _hover={{ background: "red.600" }}>
                                        Delete
                                </Button> }
                            </Flex>
                    </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ApplicationDetailsControl