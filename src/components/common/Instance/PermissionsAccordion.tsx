import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex, Text } from "@chakra-ui/react"
import usePermissionsAccordion from "../../../hooks/adminActions/ods/usePermissionsAccordion"
import AccordionItemSkeleton from "../AccordionItemSkeleton"
import PermissionsAccordionTable from "./PermissionsAccordionTable"

const PermissionsAccordion = () => {
    const { permissions } = usePermissionsAccordion()

    return (
        <Flex flexDir='column' w='full'>
            <Text
                border='1px'
                borderColor='gray.300'
                fontFamily='Open sans'
                fontWeight='700'
                padding='10px 50px'
                size='sm'>
                    Claim Set
            </Text>
            <Accordion   
                    border='1px'
                    borderColor='gray.300' p='0' w='full'>
                    {permissions.map((permissionInfo, index) => 
                        <AccordionItem   
                            border='1px'
                            borderColor='gray.300' 
                            key={index}>
                                <Flex alignItems='center' w='full'>
                                    <AccordionButton border='none' w='full'>
                                        <AccordionIcon aria-hidden="true" focusable="false" />
                                        <Text 
                                            color='blue.600'
                                            fontFamily='Open sans'
                                            fontWeight='700'
                                            ml='10px'>
                                                {permissionInfo.name}
                                        </Text>
                                    </AccordionButton>
                                </Flex>
                                <AccordionPanel px='50px' w='full'>
                                    <Flex flexDir='column' w='full'>
                                        <Text
                                            color='blue.600'
                                            fontFamily='Open sans'
                                            fontWeight='700'
                                            size='lg'
                                            mb='16px'>
                                                Resources
                                        </Text>
                                        <PermissionsAccordionTable 
                                            resourceInfo={{ 
                                                systemDescriptors: { name: permissionInfo.name  }, 
                                                types: { name: "Types" },
                                                educationOrganizations: { name: "Education Organizations" }
                                            }} />
                                    </Flex>
                                </AccordionPanel>
                        </AccordionItem>
                    )}
                    <AccordionItemSkeleton itemsCount={permissions.length} />
            </Accordion>
        </Flex>
    )
}

export default PermissionsAccordion