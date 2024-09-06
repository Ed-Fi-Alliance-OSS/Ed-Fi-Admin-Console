import { AddIcon } from "@chakra-ui/icons"
import { Button, Flex, Text } from "@chakra-ui/react"
import { VerifiedDomainInfo } from "../../../core/verifyDomain/VerifyDomain.types"
import DomainTag from "../DomainTag"
import DomainVerificationStatus from "../OnBoarding/DomainVerificationStatus"
import RefreshBtn from "../RefreshBtn"

interface DistrictSchoolSettingsFormProps {
    districtSchoolName: string 
    districtSchoolId: string 
    tsdsId: string 
    domainsInfo: VerifiedDomainInfo[]
    isRemovingDomain: boolean 
    onRemoveDomain: (domainName: string) => void
}

const DistrictSchoolSettingsForm = ({ districtSchoolName, districtSchoolId, tsdsId, domainsInfo, isRemovingDomain, onRemoveDomain }: DistrictSchoolSettingsFormProps) => {
    return (
        <Flex flexDir='column' w='full'>
            <Text
                color='gray.700'
                fontFamily='Open sans'
                fontWeight='400'
                size='md'>
                    District/Charter School Name (Read-Only)
            </Text>
            <Text
                fontFamily='Open sans'
                fontWeight='700'
                size='md'>
                    {districtSchoolName}
            </Text>

            <Flex flexDir='column' mt='16px'>
                <Text
                    color='gray.700'
                    fontFamily='Open sans'
                    fontWeight='400'
                    size='md'>
                        District/Charter School ID (Read-Only)
                </Text>
                <Text
                    fontFamily='Open sans'
                    fontWeight='700'
                    size='md'>
                        {districtSchoolId}
                </Text>
            </Flex>

            <Flex flexDir='column' mt='16px'>
                <Text
                    color='gray.700'
                    fontFamily='Open sans'
                    fontWeight='400'
                    size='md'>
                        TSDS ID (Read-Only)
                </Text>
                <Text
                    fontFamily='Open sans'
                    fontWeight='700'
                    size='md'>
                        {tsdsId}
                </Text>
            </Flex>

            <Flex flexDir='column' mt='16px'>
                <Text
                    fontFamily='Open sans'
                    fontWeight='700'
                    size='md'>
                        Your Domain(s)
                </Text>
                <Flex flexDir='column' mt='5px' w='full'>
                    {domainsInfo.map(domain => 
                        <Flex key={domain.domain}>
                            <DomainTag domain={domain.domain} />
                            <Flex mx='10px'>
                                <DomainVerificationStatus 
                                    status={domain.status}
                                    isRemovingDomain={isRemovingDomain}
                                    onRemoveDomain={onRemoveDomain} />
                            </Flex>
                            <RefreshBtn 
                                id={domain.domain}
                                onAction={() => console.log('refresh domain info for', domain.domain)} />
                        </Flex>
                    )}
                    <Button
                        variant='secondaryBlue600'
                        mt='5px'
                        minWidth='30px'
                        maxW='30px'
                        w='auto'
                        aria-labelledby="add-btn">
                            <span id="add-btn" hidden>Add</span>
                            <AddIcon fontSize='10px'
                                aria-hidden="true" 
                                focusable="false" />
                    </Button>   
                </Flex>
            </Flex>

            <Button
                variant='primaryBlue600'
                size='lg'
                mt='32px'
                minW='150px'
                maxW='200px'>
                    Save Edits
            </Button>
        </Flex>        
    )
}

export default DistrictSchoolSettingsForm