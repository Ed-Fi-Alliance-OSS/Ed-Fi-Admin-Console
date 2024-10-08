import { Flex, Text } from "@chakra-ui/react"
import { CustomSwitch } from "@edfi/admin-console-shared-sdk"

const identityOptions = [
    'Acme Service Center',
    'Classlink',
    'Clever',
    'Microsoft',
    'Google'
]

const IdentityProvidersTab = () => {
    return (
        <Flex 
            flexDir='column' 
            w='424px'>
                {identityOptions.map((option, index) => 
                    <Flex 
                        key={index}
                        alignItems='center'
                        borderRadius='4px'
                        border='1px'
                        borderColor='gray.300'
                        padding='8px 10px'
                        _notFirst={{ mt: '15px' }}
                        w='full'>
                            <CustomSwitch
                                id="identityProvider"
                                isChecked />
                            <Text
                                color='blue.600'
                                fontFamily='Open sans'
                                fontWeight='700'
                                ml='15px'
                                size='sm'>
                                    {option}
                                </Text>
                    </Flex>
                )}
        </Flex>
    )
}

export default IdentityProvidersTab