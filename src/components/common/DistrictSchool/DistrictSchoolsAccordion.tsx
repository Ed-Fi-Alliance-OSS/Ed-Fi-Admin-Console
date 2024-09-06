import { CloseIcon } from "@chakra-ui/icons"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Flex, Spinner, Text } from "@chakra-ui/react"
import { DomainStatus, Tenant } from "../../../core/Tenant.types"
import RefreshBtn from "../RefreshBtn"
import DistrictSchoolsDataTable from "./DistrictSchoolsDataTable"

interface DistrictSchoolsAccordionProps {
    district: Tenant
    isRemovingDomain: boolean
    onRemoveDomain: (domainName: string) => void
    onShowAddDomainForm: () => void
}

const getStatusColor = (status: DomainStatus) => {
    if (status === "Verified")
        return "green.600"

    if (status === "Unverified")
        return "orange.400"

    if (status === "Rejected")
        return "red.800"

    if (status === "Error")
        return "red.800"
        
    return "gray.500"
}

const getBorderColor = (status: DomainStatus) => {
    if (status === "Verified")
        return "green.400"

    if (status === "Unverified")
        return "orange.300"

    if (status === "Rejected")
        return "red.400"

    if (status === "Error")
        return "red.400"
    
    return "gray.300"
}  

const DistrictSchoolsAccordion = ({ district, isRemovingDomain, onRemoveDomain, onShowAddDomainForm }: DistrictSchoolsAccordionProps) => {
    return (
        <Accordion   
            p='0' 
            w='full'>
                <AccordionItem>
                        <Flex alignItems='center' w='full'>
                            <AccordionButton display='flex' justifyContent='space-between' border='none' w='full'>
                                <Flex w='191px'>
                                    <AccordionIcon aria-hidden="true" focusable='false' />
                                    <Text 
                                        color='blue.600'
                                        fontFamily='Open sans'
                                        fontWeight='700'
                                        ml='10px'>
                                            {district.organizationName}
                                    </Text>
                                </Flex>
                                <Flex w='231px'>
                                    <Text
                                        color='gray.700'
                                        fontFamily='Open sans'
                                        fontWeight='300'>
                                            {district.organizationIdentifier}
                                    </Text>
                                </Flex>
                                <Flex flexDir='column' w='273px'>
                                    <Flex flexDir='column' mt='5px' w='full' zIndex='2'>
                                        {district.domains.map((domain, index) => 
                                            <Flex 
                                                key={index} 
                                                alignItems="center" 
                                                _notFirst={{ mt: '5px'}}>
                                                <Flex>
                                                    <Button
                                                        onClick={() => onRemoveDomain(domain.domainName)}
                                                        color={getStatusColor(domain.domainStatus)}
                                                        border='1px'
                                                        alignItems='center'
                                                        borderRadius='4px'
                                                        borderColor={getBorderColor(domain.domainStatus)}
                                                        fontFamily='Open sans'
                                                        aria-label={domain.domainName}
                                                        fontWeight='400'
                                                        fontSize='14px'
                                                        padding='4px 8px'>
                                                            {domain.domainName}
                                                            {isRemovingDomain?
                                                            <Spinner 
                                                                size='sm'
                                                                color={getStatusColor(domain.domainStatus)} ml='10px' />
                                                            :
                                                            <CloseIcon 
                                                                fontSize='8px' 
                                                                ml='10px' 
                                                                color={getStatusColor(domain.domainStatus)}
                                                                aria-hidden="true"
                                                                focusable='false' />}
                                                    </Button>
                                                    <RefreshBtn 
                                                        id={domain.domainName}
                                                        asFlex={true}
                                                        onAction={() => console.log('refresh domain info for', domain)} />
                                                </Flex>
                                            </Flex>
                                        )}
                                        <Flex
                                            color='blue.600'
                                            border='2px'
                                            borderRadius='4px'
                                            borderColor='blue.600'
                                            alignItems='center'
                                            justifyContent='center'
                                            mt='5px'
                                            minWidth='30px'
                                            height='25px'
                                            maxW='30px'
                                            w='auto'
                                            zIndex='2'>
                                                <Button 
                                                    color="blue.600"
                                                    onClick={onShowAddDomainForm}  
                                                    aria-label={`Add domain for ${district.organizationName}`}>
                                                        +
                                                </Button>
                                        </Flex>   
                                    </Flex>
                                </Flex>
                                <Flex w='150px'>
                                    <Text
                                        color='gray.700'
                                        fontFamily='Open sans'
                                        fontWeight='300'>
                                            {district.organizations.length}
                                    </Text>
                                </Flex>
                            </AccordionButton>
                        </Flex>
                        <AccordionPanel mt='24px' w='full'>
                            <Flex px='16px' flexDir='column' w='full'>
                                <DistrictSchoolsDataTable schools={district.organizations} />
                            </Flex>
                        </AccordionPanel>
                </AccordionItem>
        </Accordion>
    )
}

export default DistrictSchoolsAccordion