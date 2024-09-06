import { Td, Text } from "@chakra-ui/react"
import { VerifiedDomainInfo } from "../../../core/verifyDomain/VerifyDomain.types"
import ControlTableRow from "../ControlTableRow"
import DomainVerificationStatus from "./DomainVerificationStatus"

interface VerifiedDomainTableRowsProps {
    verifiedDomains: VerifiedDomainInfo[]
}

const VerifiedDomainTableRows = ({ verifiedDomains }: VerifiedDomainTableRowsProps) => {
    return (
        <>
            {verifiedDomains.map((verifiedDomainInfo, index) => 
                <ControlTableRow key={index}>
                    <Td w='50%'>
                        <Text
                            color='blue.600'
                            fontFamily='Open sans'
                            fontWeight='700'
                            size='md'>
                                {verifiedDomainInfo.lea}
                        </Text>
                    </Td>
                    <Td w='50%'>
                        <Text
                            color='blue.600'
                            fontFamily='Open sans'
                            fontWeight='700'
                            size='md'>
                                {verifiedDomainInfo.domain}
                        </Text>
                    </Td>
                    <Td>
                        <DomainVerificationStatus status={verifiedDomainInfo.status} />
                    </Td>
                </ControlTableRow>
            )}
        </>
    )
}

export default VerifiedDomainTableRows