import { Flex, Text } from "@chakra-ui/react"
import SelectSSOMethodTable from "../OnBoarding/SelectSSOMethodTable"
import TabHeading from "../TabHeading"

const SSOTabContent = () => {
    return (
        <Flex w='full'>
            <Flex flexDir='column'>
                <Flex flexDir='column' w='300px'>
                    <TabHeading text="Single Sign-On" />
                    <Text 
                        fontFamily='Open sans'
                        fontWeight='400'
                        mt='16px'
                        lineHeight='22px'
                        size='md'>
                            Select the methods you’d like to allow users within your District/Charter School to use to log in. Some configuration for the methods you select will need to be done outside of the Tech Console. Once those processes are complete, the “Consent Status” will update.
                    </Text>
                </Flex>
            </Flex>
            <Flex mt='62px' ml='32px' w='full'>
                <SelectSSOMethodTable 
                    showSelect={true} />
            </Flex>
        </Flex>
    )
}

export default SSOTabContent