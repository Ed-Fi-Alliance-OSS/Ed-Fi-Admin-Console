import { Flex, Text } from "@chakra-ui/react"
import { SubscriptionStatus as SStatus } from "../../../core/Subscription.types"

interface SubscriptionStatusProps {
    status: SStatus
}

const selectBorderColor = (status: SStatus) => {
    if (status === 'Active')
        return 'green.400'
    
    return 'orange.400'
}

const selectTextColor = (status: SStatus) => {
    if (status === 'Active')
        return 'green.800'
    
    return 'orange.800'
}

const SubscriptionStatus = ({ status }: SubscriptionStatusProps) => {
    return (
        <Flex 
            alignItems='center'
            justifyContent='center'
            border='1px'
            borderRadius='4px'
            borderColor={selectBorderColor(status)}
            h='32px'
            w='64px'>
                <Text
                    color={selectTextColor(status)}
                    fontFamily='Archivo Narrow'
                    fontWeight='400'
                    size='md'>
                        {status}
                </Text>
        </Flex>
    )
}

export default SubscriptionStatus