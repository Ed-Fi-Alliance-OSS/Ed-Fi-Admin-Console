import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Flex } from "@chakra-ui/react"

interface PartnerAccordionControlProps {
    onEditPartner: () => void
}

const PartnerAccordionControl = ({ onEditPartner }: PartnerAccordionControlProps) => {
    return (
        <Flex w='80px'>
            <Button 
                onClick={onEditPartner}
                size='xs'
                borderRadius='4px 0px 0px 4px'
                variant='primaryBlue600'
                minW='39px'>
                    Edit
            </Button>
            <Button 
                size='xs'
                borderRadius='0px 4px 4px 0px'
                variant='primaryBlue600'
                ml='1px'
                minW='24px'
                aria-labelledby="show-options-btn">
                    <span id="show-options-btn" hidden>Show Options</span>
                    <ChevronDownIcon fontSize='18px' aria-hidden="true" focusable="false" />
            </Button>
        </Flex>
    )
}

export default PartnerAccordionControl