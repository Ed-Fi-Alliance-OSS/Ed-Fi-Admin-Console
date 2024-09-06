import { Flex, Text } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { DomainData } from "../../../hooks/adminActions/dns/useVerifyDomain"
import VerifyDomainList from "./VerifyDomainList"

interface VerifyDomainTabContentVerificationStepProps {
    domainsList: DomainData[]
    isCheckingDomainStatus: boolean 
    selectedDomain: string | null
    isRemovingDomain: boolean
    onVerifyDomain: (domainName: DomainData) => Promise<void>
    onSelectDomain: (e: ChangeEvent<HTMLInputElement>) => void
    onRemoveDomain: (domainName: string) => void
}

const VerifyDomainTabContentVerificationStep = ({ domainsList, isCheckingDomainStatus, isRemovingDomain, selectedDomain, onSelectDomain, onRemoveDomain, onVerifyDomain }: VerifyDomainTabContentVerificationStepProps) => {
    return (
        <>
            <Flex alignItems='center' bg='gray.100' padding='8px 16px' w='750px'>
                <Text
                    display='flex'
                    borderRadius='4px'
                    fontFamily='Open sans'
                    fontSize='18px'
                    fontWeight='700'
                    size='md'>
                        Step 3: Come Back and Check for Verification  
                </Text>
                <Text
                    fontFamily='Open sans'
                    fontWeight='400'
                    fontSize='16px'
                    ml='10px'>   
                        (This can take up to 24 hours)
                </Text>
            </Flex>
            <Flex mt='8px'>
                <VerifyDomainList
                    domainsList={domainsList}
                    showDomainStatus={true}
                    showCheck={false}
                    isRemovingDomain={isRemovingDomain}
                    isCheckingDomainStatus={isCheckingDomainStatus}
                    selectedDomain={selectedDomain}
                    onSelectDomain={onSelectDomain}
                    onVerifyDomain={onVerifyDomain}
                    onRemoveDomain={onRemoveDomain} />
            </Flex>
        </>
    )
}

export default VerifyDomainTabContentVerificationStep