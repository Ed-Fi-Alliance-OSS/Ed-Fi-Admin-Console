import { Flex, Text } from "@chakra-ui/react"
import { CustomSelect, CustomSwitch } from "@edwire/edx-portal-shared"

const subscriptions = [
    'Data Sync',
    'Analytics',
    'Ed-Fi Admin',
    'RTI',
    'Validations'
]

const APIClientSubscriptionsForm = () => {
    return (
        <Flex 
            flexDir='column' 
            w='full'>
                {subscriptions.map((option, index) => 
                    <Flex 
                        key={index}
                        alignItems='center'
                        justifyContent='space-between'
                        borderRadius='4px'
                        border='1px'
                        borderColor='gray.300'
                        padding='12px 10px'
                        _notFirst={{ mt: '15px' }}
                        w='full'>
                            <Flex alignItems='center'>
                                <CustomSwitch 
                                    id="apiClient"
                                    isChecked={option === 'Data Sync'? true : false} />
                                <Text
                                    color='blue.600'
                                    fontFamily='Open sans'
                                    fontWeight='700'
                                    ml='15px'
                                    size='sm'>
                                        {option}
                                </Text>
                            </Flex>  
                            {option === 'Data Sync' && 
                                <Flex>
                                    <CustomSelect
                                        value='Data Sync.U...'
                                        options={[{ text: "Data Sync.U...", value: 'Data Sync.U...' }]}
                                        onChange={() => null} />
                                </Flex>}
                    </Flex>
                )}
        </Flex>
    )
}   

export default APIClientSubscriptionsForm