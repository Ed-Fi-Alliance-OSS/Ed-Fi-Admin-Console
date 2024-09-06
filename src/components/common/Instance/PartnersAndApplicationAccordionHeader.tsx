import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { Button, Flex, Text } from "@chakra-ui/react"
import { SortByParams } from "../../../hooks/controlTable/useControlTableSorting"

interface PartnersAndApplicationAccordionHeaderProps {
    sortingType: 'asc' | 'desc'
    sortByPartnerDesc: ({ field }: SortByParams) => void
    sortByPartnerAsc: ({ field }: SortByParams) => void
}

const PartnersAndApplicationAccordionHeader = ({ sortByPartnerDesc, sortByPartnerAsc, sortingType }: PartnersAndApplicationAccordionHeaderProps) => {
    return (
        <Flex
            padding='16px 32px'>
                <Flex flexDir='column' justifyContent='center' w='20px'>
                    <Button 
                            onClick={() => sortByPartnerAsc({ field: "company" })}
                            aria-labelledby={`sort-asc-company`}
                            data-testid={`sort-asc-company`}
                            color={sortingType === 'asc'? 'gray.700' : 'gray.500'}
                            h='3px'
                            minW='5px'>
                                <span id={`sort-asc-company`} hidden>Sort ascending</span>
                                <TriangleUpIcon 
                                    fontSize='10px'
                                    aria-label="Sort field ascending"
                                    focusable="true" />
                    </Button>
                    <Button 
                        onClick={() => sortByPartnerDesc({ field: 'company' })}
                        aria-labelledby={`sort-desc-company`}
                        data-testid={`sort-desc-company`}
                        color={sortingType === 'desc' ? 'gray.700' : 'gray.500'}
                        h='3px'
                        minW='5px'
                        mt='5px'>
                            <span id={`sort-desc-company`} hidden>Sort descending</span>
                            <TriangleDownIcon 
                                fontSize='10px' 
                                aria-label="Sort field descending"
                                focusable="true"/>
                    </Button>
                </Flex>
                <Text 
                    fontFamily='Open sans'
                    fontWeight='700'
                    w='250px'>
                        Partner
                </Text>
                <Text 
                    fontFamily='Open sans'
                    fontWeight='700'
                    ml='40px'
                    w='650px'>
                        Namespace Prefixes
                </Text>
                <Text 
                    fontFamily='Open sans'
                    fontWeight='700'
                    w='25%'>
                        Application Count
                </Text>
        </Flex>
    )
}

export default PartnersAndApplicationAccordionHeader