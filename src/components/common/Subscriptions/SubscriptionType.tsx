import { Text } from "@chakra-ui/react"
import { LicenseType as SType } from "../../../core/Subscription.types"

interface SubscriptionTypeProps {
    type: SType
}

const SubscriptionType = ({ type }: SubscriptionTypeProps) => {
    return (
        <Text
            color='gray.600'
            bg='gray.100'
            borderRadius='4px'
            textAlign='center'
            padding='6px 6px'
            fontFamily='Archivo Narrow'
            fontWeight='400'
            size='md'
            w='50px'>
                {`${type[0].toLocaleUpperCase()}${type.substring(1)}`}
        </Text>
    )
}

export default SubscriptionType