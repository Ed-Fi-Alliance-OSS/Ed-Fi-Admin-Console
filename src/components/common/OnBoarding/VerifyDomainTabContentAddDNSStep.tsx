import { Flex, Text } from "@chakra-ui/react"
import VerifyDomainTable from "./VerifyDomainTable"

const VerifyDomainTabContentAddDNSStep = () => {
    return (
        <>
            <Flex flexDir='column' bg='gray.100' padding='8px 16px' w='750px'>
                <Text
                    display='flex'
                    flexDir='column'
                    borderRadius='4px'
                    fontFamily='Open sans'
                    fontSize='18px'
                    fontWeight='700'
                    size='md'>
                        Step 2: Copy the TXT Record Below and Add it to Your DNS
                </Text>
                <Text
                    fontFamily='Open sans'
                    fontWeight='400'
                    fontSize='16px'>   
                        (You may need to contact your ESC Admin for this.)
                </Text>
            </Flex>
            <Flex mt='8px'>
                <VerifyDomainTable />
            </Flex>
        </>
    )
}

export default VerifyDomainTabContentAddDNSStep